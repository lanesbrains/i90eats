import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripe.secretKey)
  
  const body = await readBody(event)
  const { 
    restaurantName, 
    ownerEmail, 
    location, 
    address, 
    phone, 
    cuisine, 
    website, 
    description, 
    plan, 
    priceId 
  } = body

  try {
    // Create or retrieve customer
    let customer
    const existingCustomers = await stripe.customers.list({
      email: ownerEmail,
      limit: 1
    })

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0]
    } else {
      customer = await stripe.customers.create({
        email: ownerEmail,
        name: restaurantName,
        metadata: {
          type: 'business',
          restaurant_name: restaurantName,
          location: location,
          plan: plan
        }
      })
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${getHeader(event, 'origin')}/business/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getHeader(event, 'origin')}/business/signup`,
      metadata: {
        type: 'business_signup',
        restaurant_name: restaurantName,
        owner_email: ownerEmail,
        location: location,
        address: address,
        phone: phone,
        cuisine: cuisine,
        website: website || '',
        description: description,
        plan: plan
      }
    })

    return {
      success: true,
      data: {
        checkout_url: session.url,
        session_id: session.id
      }
    }
  } catch (error) {
    console.error('Business signup error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create business subscription'
    })
  }
})