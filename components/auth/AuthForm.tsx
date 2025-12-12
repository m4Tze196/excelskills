'use client'

/**
 * Authentication Form Component
 *
 * Reusable form for both login and signup
 * Handles email/password authentication with Supabase
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface AuthFormProps {
  mode: 'login' | 'signup'
  locale: string
}

export function AuthForm({ mode, locale }: AuthFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()

      if (mode === 'signup') {
        // Validate passwords match
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          setLoading(false)
          return
        }

        // Validate password strength
        if (password.length < 8) {
          setError('Password must be at least 8 characters long')
          setLoading(false)
          return
        }

        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/${locale}/auth/callback`,
          },
        })

        if (error) {
          setError(error.message)
        } else {
          setSuccess(true)
          // Show success message (user needs to confirm email)
        }
      } else {
        // Log in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          setError(error.message)
        } else {
          // Redirect to chat page
          router.push(`/${locale}/chat`)
          router.refresh()
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Auth error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (success && mode === 'signup') {
    return (
      <div className="rounded-lg border border-primary bg-primary/5 p-6 text-center">
        <div className="mb-4 text-5xl">✉️</div>
        <h3 className="mb-2 text-xl font-semibold text-primary">
          Check your email
        </h3>
        <p className="text-muted-foreground">
          We've sent you a confirmation link to <strong>{email}</strong>.
          <br />
          Click the link to activate your account and get 10 free credits!
        </p>
        <button
          onClick={() => router.push(`/${locale}/auth/login`)}
          className="mt-6 text-sm text-primary hover:underline"
        >
          Back to login
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-500 bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder={mode === 'signup' ? 'Min. 8 characters' : '••••••••'}
        />
      </div>

      {mode === 'signup' && (
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="••••••••"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? 'Loading...'
          : mode === 'signup'
            ? 'Create Account'
            : 'Sign In'}
      </button>

      <div className="text-center text-sm text-muted-foreground">
        {mode === 'login' ? (
          <>
            Don't have an account?{' '}
            <a
              href={`/${locale}/auth/signup`}
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </a>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <a
              href={`/${locale}/auth/login`}
              className="font-medium text-primary hover:underline"
            >
              Log in
            </a>
          </>
        )}
      </div>

      {mode === 'signup' && (
        <p className="text-center text-xs text-muted-foreground">
          By signing up, you agree to our{' '}
          <a href={`/${locale}/legal/terms`} className="text-primary hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href={`/${locale}/legal/privacy`} className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      )}
    </form>
  )
}
