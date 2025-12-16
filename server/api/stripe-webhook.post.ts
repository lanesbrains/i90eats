// NEW - Dynamic imports (smaller initial bundle)
import { defineEventHandler, readRawBody } from 'h3'

export default defineEventHandler(async (event) => {
// Dynamic imports to reduce bundle size
const { default: Stripe } = await import('stripe')
const { supabase } = await import('~/server/utils/supabase')
const { Resend } = await import('resend')

// Rest of your existing code stays the same...
const config = useRuntimeConfig()
const stripe = new Stripe(config.stripeSecretKey)
const resend = new Resend(config.resendApiKey)


export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripeSecretKey)
  const resend = new Resend(config.resendApiKey)
  
  const sig = getHeader(event, 'stripe-signature')
  const body = await readRawBody(event)

  let stripeEvent
  try {
    stripeEvent = stripe.webhooks.constructEvent(body!, sig!, config.stripeWebhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    throw createError({ statusCode: 400, message: 'Invalid signature' })
  }

  console.log('📨 Received Stripe webhook:', stripeEvent.type)

  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(stripeEvent.data.object, stripe)
        break
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(stripeEvent.data.object)
        break
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(stripeEvent.data.object)
        break
      
      case 'invoice.payment_failed':
        await handlePaymentFailed(stripeEvent.data.object, resend)
        break
      
      default:
        console.log('Unhandled event type:', stripeEvent.type)
    }
  } catch (error) {
    console.error('❌ Error processing webhook:', error)
    throw createError({ statusCode: 500, message: 'Webhook processing failed' })
  }

  return { received: true }
})

async function handleCheckoutCompleted(session: any, stripe: Stripe) {
  const listingData = session.metadata?.listingData ? JSON.parse(session.metadata.listingData) : null
  const plan = session.metadata?.plan || 'basic'

  if (!listingData) {
    console.error('No listing data in session metadata')
    return
  }

  try {
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
    const customerEmail = listingData.ownerEmail || listingData.email

    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', customerEmail)
      .single()

    let userId = existingUser?.id

    if (!userId) {
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert({
          email: customerEmail,
          user_type: 'business',
          stripe_customer_id: session.customer
        })
        .select('id')
        .single()

      if (userError) throw userError
      userId = newUser.id
    }

    const slug = listingData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .insert({
        slug,
        owner_email: customerEmail,
        name: listingData.name,
        description: listingData.description,
        address: listingData.address,
        city: listingData.city,
        state: listingData.state,
        zip: listingData.zip,
        phone: listingData.phone,
        website: listingData.website,
        categories: listingData.categories || [],
        locations: listingData.locations || [],
        stripe_customer_id: session.customer,
        active: true
      })
      .select('id')
      .single()

    if (restaurantError) throw restaurantError

    const { error: subscriptionError } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        restaurant_id: restaurant.id,
        stripe_customer_id: session.customer,
        stripe_subscription_id: session.subscription,
        status: subscription.status,
        tier: plan,
        price_id: subscription.items.data[0].price.id,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end
      })

    if (subscriptionError) throw subscriptionError

    console.log('✅ Restaurant and subscription created successfully')
  } catch (error) {
    console.error('❌ Error in handleCheckoutCompleted:', error)
    throw error
  }
}

async function handleSubscriptionUpdated(subscription: any) {
  console.log('🔄 Subscription updated:', subscription.id)
  
  try {
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
        updated_at: new Date().toISOString()
      })
      .eq('stripe_subscription_id', subscription.id)

    if (error) throw error
    console.log('✅ Subscription updated in database')
  } catch (error) {
    console.error('❌ Error updating subscription:', error)
    throw error
  }
}

async function handleSubscriptionDeleted(subscription: any) {
  console.log('❌ Subscription cancelled:', subscription.id)
  
  try {
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'cancelled',
        cancel_at_period_end: false,
        updated_at: new Date().toISOString()
      })
      .eq('stripe_subscription_id', subscription.id)

    if (error) throw error
    console.log('✅ Subscription marked as cancelled')
  } catch (error) {
    console.error('❌ Error cancelling subscription:', error)
    throw error
  }
}

async function handlePaymentFailed(invoice: any, resend: Resend) {
  console.log('💳 Payment failed for invoice:', invoice.id)
  
  try {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('id, user_id, restaurant_id, restaurants(name, owner_email)')
      .eq('stripe_subscription_id', invoice.subscription)
      .single()

    if (!subscription) {
      console.error('Subscription not found for invoice:', invoice.id)
      return
    }

    const { data: existingFailure } = await supabase
      .from('payment_failures')
      .select('id, attempt_count')
      .eq('stripe_invoice_id', invoice.id)
      .single()

    if (existingFailure) {
      await supabase
        .from('payment_failures')
        .update({
          attempt_count: invoice.attempt_count,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingFailure.id)
    } else {
      await supabase
        .from('payment_failures')
        .insert({
          subscription_id: subscription.id,
          stripe_invoice_id: invoice.id,
          amount: invoice.amount_due,
          currency: invoice.currency,
          failure_reason: invoice.last_finalization_error?.message,
          attempt_count: invoice.attempt_count,
          notified: false
        })
    }

    await supabase
      .from('subscriptions')
      .update({
        status: 'past_due',
        updated_at: new Date().toISOString()
      })
      .eq('id', subscription.id)

    const restaurant = subscription.restaurants as any
    const ownerEmail = restaurant.owner_email

    await resend.emails.send({
      from: 'I-90 Eats <noreply@i90eats.com>',
      to: ownerEmail,
      subject: 'Payment Failed - Action Required',
      html: `
        <h2>Payment Failed for ${restaurant.name}</h2>
        <p>We were unable to process your recent payment for your I-90 Eats subscription.</p>
        <p><strong>Amount Due:</strong> $${(invoice.amount_due / 100).toFixed(2)}</p>
        <p><strong>Attempt:</strong> ${invoice.attempt_count}</p>
        <p>Please update your payment method to avoid service interruption.</p>
        <p><a href="https://i90eats.com/business/dashboard">Update Payment Method</a></p>
        <p>If you have questions, please contact support.</p>
      `
    })

    await supabase
      .from('payment_failures')
      .update({ notified: true })
      .eq('stripe_invoice_id', invoice.id)

    console.log('✅ Payment failure recorded and email sent')
  } catch (error) {
    console.error('❌ Error handling payment failure:', error)
    throw error
  }
}
