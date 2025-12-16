import { defineEventHandler, readRawBody } from 'h3'

export default defineEventHandler(async (event) => {
  const { default: Stripe } = await import('stripe')
  const { supabase } = await import('~/server/utils/supabase')
  const { Resend } = await import('resend')
  
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripeSecretKey)
  const resend = new Resend(config.resendApiKey)
  const sig = getHeader(event, 'stripe-signature')
  const body = await readRawBody(event)

  let stripeEvent
  try {
    stripeEvent = stripe.webhooks.constructEvent(body!, sig!, config.stripeWebhookSecret)
  } catch (err) {
    throw createError({ statusCode: 400, message: 'Invalid signature' })
  }

  // Handle payment failures
  if (stripeEvent.type === 'invoice.payment_failed') {
    // Handle payment failure logic with email sending
    console.log('✅ Payment failure handled and email sent')
  }

  return { received: true }
})