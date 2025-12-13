/**
 * Supabase Authentication Helpers
 *
 * Utility functions for user authentication and session management
 */

import { createClient } from './server'

/**
 * Get the current authenticated user
 * @returns User object or null if not authenticated
 */
export async function getCurrentUser() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}

/**
 * Get the current user's profile with credit balance
 * @returns User profile or null if not authenticated
 */
export async function getCurrentUserProfile() {
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return null
  }

  const { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError) {
    console.error('Error fetching user profile:', profileError)
    return null
  }

  return profile
}

/**
 * Check if user has sufficient credits
 * @param requiredCredits - Amount of credits needed
 * @returns true if user has enough credits, false otherwise
 */
export async function hasEnoughCredits(requiredCredits: number): Promise<boolean> {
  const profile = await getCurrentUserProfile()
  if (!profile) return false

  return profile.credits_remaining >= requiredCredits
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
}
