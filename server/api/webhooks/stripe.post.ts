import Stripe from 'stripe'
import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripe.secretKey)
  const resend = new Resend(config.resend.apiKey)
  
  const body = await readRawBody(event)
  const sig = getHeader(event, 'stripe-signature')

  let stripeEvent

  try {
    stripeEvent = stripe.webhooks.constructEvent(body, sig!, config.stripe.webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    throw createError({
      statusCode: 400,
      statusMessage: 'Webhook signature verification failed'
    })
  }

  // Handle the event
  switch (stripeEvent.type) {
    case 'checkout.session.completed':
      const session = stripeEvent.data.object as Stripe.Checkout.Session
      
      if (session.metadata?.type === 'business_signup') {
        // Handle business signup
        await handleBusinessSignup(session)
      } else {
        // Handle newsletter subscription
        await handleNewsletterSubscription(session)
      }
      break

    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      const subscription = stripeEvent.data.object as Stripe.Subscription
      await handleSubscriptionChange(subscription)
      break

    default:
      console.log(`Unhandled event type ${stripeEvent.type}`)
  }

  return { received: true }
})

async function handleBusinessSignup(session: Stripe.Checkout.Session) {
  const metadata = session.metadata!
  
  // Create restaurant file for CMS
  const restaurantSlug = metadata.restaurant_name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const restaurantContent = `---
title: "${metadata.restaurant_name}"
slug: "${restaurantSlug}"
location: "${metadata.location}"
cuisine: "${metadata.cuisine}"
address: "${metadata.address}"
phone: "${metadata.phone}"
website: "${metadata.website}"
description: "${metadata.description}"
premium: ${metadata.plan === 'premium'}
createdAt: "${new Date().toISOString().split('T')[0]}"
updatedAt: "${new Date().toISOString().split('T')[0]}"
---

# ${metadata.restaurant_name}

${metadata.description}

## Contact Information

- **Address**: ${metadata.address}
- **Phone**: ${metadata.phone}
${metadata.website ? `- **Website**: ${metadata.website}` : ''}

## Hours

Please contact the restaurant for current hours of operation.
`

  // In a real app, you'd save this to your CMS or database
  // For now, we'll log it and send an email to admin
  console.log('New restaurant signup:', restaurantContent)

  // Send welcome email to business owner
  try {
    await resend.emails.send({
      from: 'I-90 Eats <noreply@i90eats.com>',
      to: metadata.owner_email,
      subject: 'Welcome to I-90 Eats Business Directory!',
      html: `
        <h1>Welcome to I-90 Eats!</h1>
        <p>Thank you for joining our business directory. Your restaurant "${metadata.restaurant_name}" has been successfully added to our platform.</p>
        <p><strong>Plan:</strong> ${metadata.plan === 'premium' ? 'Premium' : 'Basic'} Listing</p>
        <p>You can manage your listing and deals through our business portal.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>The I-90 Eats Team</p>
      `
    })
  } catch (error) {
    console.error('Failed to send welcome email:', error)
  }
}

async function handleNewsletterSubscription(session: Stripe.Checkout.Session) {
  // Handle newsletter subscription completion
  console.log('Newsletter subscription completed:', session.customer_email)
  
  // Send welcome email
  const config = useRuntimeConfig()
  const resend = new Resend(config.resend.apiKey)
  
  try {
    await resend.emails.send({
      from: 'I-90 Eats <noreply@i90eats.com>',
      to: session.customer_email!,
      subject: 'Welcome to I-90 Restaurant Deals!',
      html: `
        <h1>Welcome to I-90 Restaurant Deals!</h1>
        <p>Thank you for subscribing to our weekly newsletter. You'll now receive exclusive restaurant deals along your I-90 route.</p>
        <p>Your first newsletter will arrive this Friday with the latest deals and specials.</p>
        <p>Happy eating!<br>The I-90 Eats Team</p>
      `
    })
  } catch (error) {
    console.error('Failed to send welcome email:', error)
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  // Handle subscription updates/cancellations
  console.log('Subscription changed:', subscription.id, subscription.status)
}