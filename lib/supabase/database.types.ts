/**
 * TypeScript Database Types
 *
 * Auto-generated types will be placed here after running:
 * npx supabase gen types typescript --project-id vzsxnjdhlzlokqnxvsky > lib/supabase/database.types.ts
 *
 * For now, we define minimal types manually
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          credits_total: number
          credits_used: number
          credits_remaining: number
          created_at: string
          updated_at: string
          metadata: Json | null
        }
        Insert: {
          id: string
          email: string
          credits_total?: number
          credits_used?: number
          credits_remaining?: number
          created_at?: string
          updated_at?: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          email?: string
          credits_total?: number
          credits_used?: number
          credits_remaining?: number
          created_at?: string
          updated_at?: string
          metadata?: Json | null
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          type: 'purchase' | 'usage' | 'refund' | 'bonus'
          amount_euro: number
          credits_amount: number
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_provider: string
          payment_id: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'purchase' | 'usage' | 'refund' | 'bonus'
          amount_euro?: number
          credits_amount: number
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_provider?: string
          payment_id?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'purchase' | 'usage' | 'refund' | 'bonus'
          amount_euro?: number
          credits_amount?: number
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_provider?: string
          payment_id?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      pending_payments: {
        Row: {
          id: string
          user_id: string
          paypal_order_id: string
          amount_euro: number
          credits_amount: number
          status: 'created' | 'pending' | 'completed' | 'failed' | 'cancelled'
          created_at: string
          updated_at: string
          expires_at: string
        }
        Insert: {
          id?: string
          user_id: string
          paypal_order_id: string
          amount_euro: number
          credits_amount: number
          status?: 'created' | 'pending' | 'completed' | 'failed' | 'cancelled'
          created_at?: string
          updated_at?: string
          expires_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          paypal_order_id?: string
          amount_euro?: number
          credits_amount?: number
          status?: 'created' | 'pending' | 'completed' | 'failed' | 'cancelled'
          created_at?: string
          updated_at?: string
          expires_at?: string
        }
      }
      payment_audit_log: {
        Row: {
          id: string
          user_id: string | null
          action: string
          details: Json
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          details?: Json
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          details?: Json
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
