import { defineEventHandler, readRawBody } from 'h3';
import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  const { stripeSecretKey, stripeWebhookSecret } = useRuntimeConfig();
  const stripe = new Stripe(stripeSecretKey);
  const sig = getHeader(event, 'stripe-signature');
  const body = await readRawBody(event);

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(body, sig, stripeWebhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return { statusCode: 400 };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const listingData = session.metadata?.listingData ? JSON.parse(session.metadata.listingData) : null;
  
    if (listingData) {
      // Actually create the restaurant
      await $fetch('/api/create-restaurant-simple', {
        method: 'POST',
        body: {
          ...listingData,
          plan: session.metadata.plan
        }
      });
      
      // Send confirmation email
      console.log('Restaurant created and activated!');
    }
  }

  return { statusCode: 200 };
});