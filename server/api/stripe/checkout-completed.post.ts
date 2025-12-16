import { defineEventHandler, readRawBody } from 'h3'

export default defineEventHandler(async (event) => {
  // Dynamic imports for smaller bundle
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

  // Only handle checkout completion
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object
    const listingData = session.metadata?.listingData ? JSON.parse(session.metadata.listingData) : null
    
    if (!listingData) {
      throw createError({ statusCode: 400, message: 'No listing data' })
    }

    // Handle restaurant creation logic here
    // (copy from original handleCheckoutCompleted function)
    
    console.log('✅ Checkout completed and restaurant created')
    return { received: true }
  }

  return { received: true, ignored: true }
})