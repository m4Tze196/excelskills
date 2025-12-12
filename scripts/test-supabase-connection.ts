/**
 * Supabase Connection Test
 *
 * Run this script to verify Supabase connection and schema
 * Usage: npx tsx scripts/test-supabase-connection.ts
 */

// Load environment variables from .env.local
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(__dirname, '../.env.local') })

import { createAdminClient } from '../lib/supabase/server'

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n')

  try {
    const supabase = createAdminClient()

    // Test 1: Check connection
    console.log('✅ Step 1: Admin client created successfully')

    // Test 2: Check if tables exist
    console.log('\n🔍 Step 2: Checking database tables...')

    const tables = [
      'user_profiles',
      'transactions',
      'pending_payments',
      'payment_audit_log',
      'rate_limits'
    ]

    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1)

      if (error) {
        console.log(`❌ Table '${table}' not found or error: ${error.message}`)
        console.log(`   → You need to run the SQL migration first!`)
      } else {
        console.log(`✅ Table '${table}' exists`)
      }
    }

    console.log('\n✅ Connection test completed!')
    console.log('\nNext steps:')
    console.log('1. If tables are missing, run the SQL migration:')
    console.log('   → Open: https://supabase.com/dashboard/project/vzsxnjdhlzlokqnxvsky/sql/new')
    console.log('   → Copy content from: supabase/migrations/001_initial_schema.sql')
    console.log('   → Run the SQL')
    console.log('2. Run this test again to verify')

  } catch (error) {
    console.error('❌ Connection failed:', error)
    console.log('\nPlease check:')
    console.log('1. NEXT_PUBLIC_SUPABASE_URL is correct in .env.local')
    console.log('2. SUPABASE_SERVICE_ROLE_KEY is correct in .env.local')
  }
}

testConnection()
