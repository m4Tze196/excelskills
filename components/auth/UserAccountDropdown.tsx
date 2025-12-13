'use client'

/**
 * User Account Dropdown
 *
 * Displays user info, credit balance, and logout button
 * Shown in header when user is authenticated
 */

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface UserProfile {
  id: string
  email: string
  credits_remaining: number
}

interface UserAccountDropdownProps {
  locale: string
}

export function UserAccountDropdown({ locale }: UserAccountDropdownProps) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch user and profile on mount
  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient()

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setUser(user)

        // Get profile with credit balance
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profile) {
          setProfile(profile)
        }
      }

      setLoading(false)
    }

    fetchUser()

    // Subscribe to auth changes
    const supabase = createClient()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user ?? null)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setProfile(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push(`/${locale}`)
    router.refresh()
  }

  if (loading) {
    return (
      <div className="h-10 w-10 animate-pulse rounded-full bg-muted"></div>
    )
  }

  if (!user || !profile) {
    // Show login/signup buttons
    return (
      <div className="flex items-center gap-3">
        <a
          href={`/${locale}/auth/login`}
          className="text-sm font-medium text-foreground hover:text-primary"
        >
          Log in
        </a>
        <a
          href={`/${locale}/auth/signup`}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Sign up
        </a>
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2 hover:bg-muted/50"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {user.email?.[0].toUpperCase()}
        </div>
        <div className="hidden text-left sm:block">
          <div className="text-xs text-muted-foreground">Balance</div>
          <div className="text-sm font-semibold text-foreground">
            {profile.credits_remaining.toFixed(2)} Credits
          </div>
        </div>
        <svg
          className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-72 rounded-lg border border-border bg-card shadow-xl">
          {/* User Info */}
          <div className="border-b border-border p-4">
            <div className="mb-1 text-sm font-medium text-foreground">
              {user.email}
            </div>
            <div className="text-xs text-muted-foreground">
              User since {new Date(user.created_at).toLocaleDateString()}
            </div>
          </div>

          {/* Credit Balance */}
          <div className="border-b border-border p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Available Credits
              </span>
              <span className="text-lg font-bold text-primary">
                {profile.credits_remaining.toFixed(2)}
              </span>
            </div>
            <a
              href={`/${locale}/payment`}
              className="block w-full rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Buy Credits
            </a>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <a
              href={`/${locale}/account/transactions`}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted"
            >
              <svg
                className="h-5 w-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Transaction History
            </a>
            <a
              href={`/${locale}/account/settings`}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted"
            >
              <svg
                className="h-5 w-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </a>
          </div>

          {/* Sign Out */}
          <div className="border-t border-border p-2">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
