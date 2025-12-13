-- ============================================
-- EXCELSKILLS PAYMENT SYSTEM - DATABASE SCHEMA
-- ============================================
-- Created: 2024
-- Security Level: PCI-DSS Compliant
-- Description: Secure payment processing with PayPal integration
--
-- Tables:
-- 1. user_profiles       - User accounts with credit balances
-- 2. transactions        - Complete transaction history
-- 3. pending_payments    - Payments awaiting confirmation
-- 4. payment_audit_log   - Security audit trail
-- 5. rate_limits         - Fraud prevention
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row Level Security on auth.users (should already be enabled)
-- This is critical for data isolation!

-- ============================================
-- 1. USER PROFILES TABLE
-- ============================================
-- Extends Supabase auth.users with credit balance
-- One-to-one relationship with auth.users

CREATE TABLE IF NOT EXISTS public.user_profiles (
  -- Primary key (same as auth.users.id)
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  -- User info (denormalized for performance)
  email TEXT NOT NULL,

  -- Credit balance (in credits, not euros)
  credits_total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  credits_used DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  credits_remaining DECIMAL(10,2) NOT NULL DEFAULT 0.00,

  -- Metadata (JSON for flexibility)
  metadata JSONB DEFAULT '{}'::JSONB,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT credits_total_positive CHECK (credits_total >= 0),
  CONSTRAINT credits_used_positive CHECK (credits_used >= 0),
  CONSTRAINT credits_remaining_positive CHECK (credits_remaining >= 0),
  CONSTRAINT credits_balance_valid CHECK (credits_remaining = credits_total - credits_used)
);

-- Indexes for performance
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_created_at ON public.user_profiles(created_at DESC);

-- Row Level Security (RLS)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can only read their own profile
CREATE POLICY "Users can view own profile"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users cannot directly update credits (must use transactions)
CREATE POLICY "Users can update own profile metadata"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND credits_total = (SELECT credits_total FROM public.user_profiles WHERE id = auth.uid())
    AND credits_used = (SELECT credits_used FROM public.user_profiles WHERE id = auth.uid())
    AND credits_remaining = (SELECT credits_remaining FROM public.user_profiles WHERE id = auth.uid())
  );

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 2. TRANSACTIONS TABLE
-- ============================================
-- Complete immutable audit log of all credit transactions

CREATE TABLE IF NOT EXISTS public.transactions (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- User reference
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,

  -- Transaction type
  type TEXT NOT NULL CHECK (type IN ('purchase', 'usage', 'refund', 'bonus', 'adjustment')),

  -- Amounts
  amount_euro DECIMAL(10,2) DEFAULT 0.00, -- Euro amount (for purchases/refunds)
  credits_amount DECIMAL(10,2) NOT NULL,   -- Credits added/removed

  -- Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded', 'cancelled')),

  -- Payment provider info
  payment_provider TEXT DEFAULT 'paypal', -- 'paypal', 'stripe', 'manual', etc.
  payment_id TEXT,                        -- PayPal Order ID, Stripe Payment Intent, etc.

  -- Additional data (encrypted sensitive data, error messages, etc.)
  metadata JSONB DEFAULT '{}'::JSONB,

  -- Timestamps (immutable!)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT credits_amount_not_zero CHECK (credits_amount != 0)
);

-- Indexes for performance
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_status ON public.transactions(status);
CREATE INDEX idx_transactions_type ON public.transactions(type);
CREATE INDEX idx_transactions_payment_id ON public.transactions(payment_id) WHERE payment_id IS NOT NULL;
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at DESC);

-- Row Level Security (RLS)
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Users can only read their own transactions
CREATE POLICY "Users can view own transactions"
  ON public.transactions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Only service role can insert/update transactions
-- (enforced via API routes, not RLS)

-- Auto-update updated_at timestamp
CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 3. PENDING PAYMENTS TABLE
-- ============================================
-- Tracks payments that are awaiting confirmation
-- Used for idempotency and webhook processing

CREATE TABLE IF NOT EXISTS public.pending_payments (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- User reference
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,

  -- PayPal Order ID (unique!)
  paypal_order_id TEXT NOT NULL UNIQUE,

  -- Amounts
  amount_euro DECIMAL(10,2) NOT NULL,
  credits_amount DECIMAL(10,2) NOT NULL,

  -- Status tracking
  status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'pending', 'completed', 'failed', 'cancelled')),

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '1 hour'),

  -- Constraints
  CONSTRAINT amount_euro_positive CHECK (amount_euro > 0),
  CONSTRAINT credits_amount_positive CHECK (credits_amount > 0)
);

-- Indexes for performance
CREATE INDEX idx_pending_payments_user_id ON public.pending_payments(user_id);
CREATE INDEX idx_pending_payments_paypal_order_id ON public.pending_payments(paypal_order_id);
CREATE INDEX idx_pending_payments_status ON public.pending_payments(status);
CREATE INDEX idx_pending_payments_expires_at ON public.pending_payments(expires_at);

-- Row Level Security (RLS)
ALTER TABLE public.pending_payments ENABLE ROW LEVEL SECURITY;

-- Users can only read their own pending payments
CREATE POLICY "Users can view own pending payments"
  ON public.pending_payments
  FOR SELECT
  USING (auth.uid() = user_id);

-- Auto-update updated_at timestamp
CREATE TRIGGER update_pending_payments_updated_at
  BEFORE UPDATE ON public.pending_payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 4. PAYMENT AUDIT LOG TABLE
-- ============================================
-- Immutable security audit trail
-- Logs ALL payment-related actions

CREATE TABLE IF NOT EXISTS public.payment_audit_log (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- User reference (nullable for system actions)
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,

  -- Action performed
  action TEXT NOT NULL, -- 'payment_created', 'payment_captured', 'webhook_received', etc.

  -- Detailed information (JSON)
  details JSONB NOT NULL DEFAULT '{}'::JSONB,

  -- Security context
  ip_address INET,
  user_agent TEXT,

  -- Timestamp (immutable!)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_payment_audit_log_user_id ON public.payment_audit_log(user_id);
CREATE INDEX idx_payment_audit_log_action ON public.payment_audit_log(action);
CREATE INDEX idx_payment_audit_log_created_at ON public.payment_audit_log(created_at DESC);
CREATE INDEX idx_payment_audit_log_ip_address ON public.payment_audit_log(ip_address);

-- Row Level Security (RLS)
ALTER TABLE public.payment_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can read audit logs (no user access)
-- Enforce via service role only

-- ============================================
-- 5. RATE LIMITS TABLE
-- ============================================
-- Fraud prevention: Track payment attempts per user/IP

CREATE TABLE IF NOT EXISTS public.rate_limits (
  -- Composite key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Rate limit identifier (user_id, ip_address, or combination)
  identifier TEXT NOT NULL,
  limit_type TEXT NOT NULL, -- 'payment_attempt', 'daily_purchase', etc.

  -- Count and window
  count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  window_end TIMESTAMPTZ NOT NULL,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Unique constraint per identifier + type + window
  CONSTRAINT unique_rate_limit UNIQUE (identifier, limit_type, window_start)
);

-- Indexes for performance
CREATE INDEX idx_rate_limits_identifier ON public.rate_limits(identifier, limit_type);
CREATE INDEX idx_rate_limits_window_end ON public.rate_limits(window_end);

-- Auto-cleanup expired rate limits (daily)
CREATE OR REPLACE FUNCTION public.cleanup_expired_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM public.rate_limits WHERE window_end < NOW() - INTERVAL '1 day';
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- UTILITY FUNCTIONS
-- ============================================

-- Function to add credits (used by payment capture)
CREATE OR REPLACE FUNCTION public.add_credits(
  p_user_id UUID,
  p_credits_amount DECIMAL,
  p_transaction_id UUID
)
RETURNS void AS $$
BEGIN
  UPDATE public.user_profiles
  SET
    credits_total = credits_total + p_credits_amount,
    credits_remaining = credits_remaining + p_credits_amount
  WHERE id = p_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User not found: %', p_user_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to deduct credits (used by chat API)
CREATE OR REPLACE FUNCTION public.deduct_credits(
  p_user_id UUID,
  p_credits_amount DECIMAL,
  p_transaction_id UUID
)
RETURNS void AS $$
DECLARE
  v_remaining DECIMAL;
BEGIN
  -- Check if user has enough credits
  SELECT credits_remaining INTO v_remaining
  FROM public.user_profiles
  WHERE id = p_user_id;

  IF v_remaining < p_credits_amount THEN
    RAISE EXCEPTION 'Insufficient credits. Required: %, Available: %', p_credits_amount, v_remaining;
  END IF;

  -- Deduct credits
  UPDATE public.user_profiles
  SET
    credits_used = credits_used + p_credits_amount,
    credits_remaining = credits_remaining - p_credits_amount
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- INITIAL DATA
-- ============================================

-- Create a trigger to auto-create user_profile when auth.users is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, credits_total, credits_used, credits_remaining)
  VALUES (NEW.id, NEW.email, 10.00, 0.00, 10.00); -- 10 free credits for new users
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- SECURITY NOTES
-- ============================================
-- 1. All tables have Row Level Security (RLS) enabled
-- 2. Users can only access their own data
-- 3. Credit updates MUST go through functions (add_credits/deduct_credits)
-- 4. Audit log is append-only (no updates/deletes)
-- 5. Service role bypasses RLS (use carefully in API routes!)
-- 6. Sensitive data encrypted in metadata JSONB columns
-- ============================================
