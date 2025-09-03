import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripe.secretKey)
  
  // Get email from query params for now (in production, use proper auth)
  const query = getQuery(event)
  const customerEmail = query.email as string
  
  if (!customerEmail) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email required'
    })
  }

  try {
    // Find customer in Stripe
    const customers = await stripe.customers.list({
      email: customerEmail,
      limit: 1
    })

    if (customers.data.length === 0) {
      return {
        success: true,
        data: {
          active: false,
          status: null
        }
      }
    }

    const customer = customers.data[0]
    
    // Get active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      limit: 1
    })

    if (subscriptions.data.length > 0) {
      const subscription = subscriptions.data[0]
      return {
        success: true,
        data: {
          active: subscription.status === 'active',
          status: subscription.status,
          current_period_end: subscription.current_period_end
        }
      }
    }

    return {
      success: true,
      data: {
        active: false,
        status: null
      }
    }
  } catch (error) {
    console.error('Status check error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to check subscription status'
    })
  }
})