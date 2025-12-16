import { defineEventHandler, readRawBody } from 'h3'

export default defineEventHandler(async (event) => {
  const { default: Stripe } = await import('stripe')
  const { supabase } = await import('~/server/utils/supabase')
  
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripeSecretKey)
  const sig = getHeader(event, 'stripe-signature')
  const body = await readRawBody(event)

  let stripeEvent
  try {
    stripeEvent = stripe.webhooks.constructEvent(body!, sig!, config.stripeWebhookSecret)
  } catch (err) {
    throw createError({ statusCode: 400, message: 'Invalid signature' })
  }

  // Handle subscription events
  if (stripeEvent.type === 'customer.subscription.updated') {
    // Handle subscription updates
    console.log('✅ Subscription updated')
  } else if (stripeEvent.type === 'customer.subscription.deleted') {
    // Handle subscription cancellations  
    console.log('✅ Subscription cancelled')
  }

  return { received: true }
})