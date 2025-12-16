import { createClient } from '@supabase/supabase-js'

let supabaseInstance: ReturnType<typeof createClient> | null = null

export const getSupabase = () => {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment variables')
    }
    
    supabaseInstance = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  }
  return supabaseInstance
}

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(target, prop) {
    return getSupabase()[prop as keyof ReturnType<typeof createClient>]
  }
})

export interface User {
  id: string
  email: string
  user_type: 'subscriber' | 'business' | 'admin'
  stripe_customer_id?: string
  created_at: string
  updated_at: string
}

export interface Restaurant {
  id: string
  slug: string
  owner_email: string
  name: string
  description?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  phone?: string
  website?: string
  logo_url?: string
  categories?: string[]
  locations?: string[]
  stripe_customer_id?: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  user_id?: string
  restaurant_id?: string
  stripe_customer_id: string
  stripe_subscription_id: string
  status: 'active' | 'cancelled' | 'past_due' | 'incomplete' | 'trialing'
  tier: 'basic' | 'premium' | 'newsletter'
  price_id: string
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  created_at: string
  updated_at: string
}

export interface Deal {
  id: string
  restaurant_id: string
  title: string
  description: string
  terms?: string
  start_date?: string
  end_date?: string
  active: boolean
  day_of_week?: string
  locations?: string[]
  created_at: string
  updated_at: string
}

export interface PaymentFailure {
  id: string
  subscription_id: string
  stripe_invoice_id: string
  amount: number
  currency: string
  failure_reason?: string
  attempt_count: number
  notified: boolean
  resolved: boolean
  created_at: string
}
