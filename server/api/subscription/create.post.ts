import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, locations, priceId } = body

  console.log('Subscription API called with:', { email, locations: locations?.length, priceId })

  // Validate input
  if (!email || !locations || !Array.isArray(locations) || locations.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid input data'
    })
  }

  // For testing, return a mock success response
  // TODO: Uncomment Stripe integration when ready
  
  /*
  const config = useRuntimeConfig()
  
  if (!config.stripe.secretKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Stripe configuration missing'
    })
  }
  
  const stripe = new Stripe(config.stripe.secretKey)
  
  try {
    // Create or retrieve customer
    let customer
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1
    })

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0]
    } else {
      customer = await stripe.customers.create({
        email: email,
        metadata: {
          locations: JSON.stringify(locations)
        }
      })
    }

    // Create checkout session
    const siteUrl = (config.public.siteUrl || 'https://i90eats.com').replace(/\/$/, '')
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        { price: priceId, quantity: 1 }
      ],
      mode: 'subscription',
      success_url: `${siteUrl}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/subscribe`,
      metadata: { locations: JSON.stringify(locations) }
    })

    return {
      success: true,
      data: {
        checkout_url: session.url,
        session_id: session.id
      }
    }
  } catch (error) {
    console.error('Stripe error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create subscription'
    })
  }
  */

  // Mock response for testing
  return {
    success: true,
    data: {
      checkout_url: 'https://checkout.stripe.com/test-session',
      session_id: 'test_session_123'
    },
    message: 'Mock subscription created successfully'
  }
})