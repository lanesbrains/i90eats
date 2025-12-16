import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const { supabase } = await import('~/server/utils/supabase');
  const body = await readBody(event)
  const { email } = body

  if (!email) {
    throw createError({ statusCode: 400, message: 'Email required' })
  }

  try {
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .eq('user_type', 'subscriber')
      .single()

    if (!user) {
      return {
        isSubscribed: false,
        message: 'No subscriber found'
      }
    }

    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('tier', 'newsletter')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error || !subscription) {
      return {
        isSubscribed: false,
        message: 'No active newsletter subscription'
      }
    }

    return {
      isSubscribed: true,
      subscriptionId: subscription.stripe_subscription_id,
      subscriptionStatus: subscription.status,
      currentPeriodEnd: subscription.current_period_end
    }
  } catch (error: any) {
    console.error('Error verifying subscriber:', error)
    throw createError({ statusCode: 500, message: error.message })
  }
})
