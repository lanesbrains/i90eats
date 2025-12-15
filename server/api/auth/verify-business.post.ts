import { defineEventHandler, readBody } from 'h3'
import { supabase } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, restaurantSlug } = body

  if (!email) {
    throw createError({ statusCode: 400, message: 'Email required' })
  }

  try {
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select(`
        *,
        restaurants (
          id,
          slug,
          name,
          description,
          address,
          city,
          state,
          zip,
          phone,
          website,
          logo_url,
          categories,
          locations,
          active
        )
      `)
      .eq('restaurants.owner_email', email)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error || !subscription) {
      return {
        isVerified: false,
        message: 'No active business subscription found'
      }
    }

    return {
      isVerified: true,
      subscriptionId: subscription.stripe_subscription_id,
      subscriptionStatus: subscription.status,
      subscriptionTier: subscription.tier,
      currentPeriodEnd: subscription.current_period_end,
      restaurant: subscription.restaurants
    }
  } catch (error: any) {
    console.error('Error verifying business:', error)
    throw createError({ statusCode: 500, message: error.message })
  }
})
