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

    // TODO: Activate listing in CMS, send confirmation email via Resend/Beehiiv
    console.log('Payment success! Activate listing:', listingData);
    // Example: await sendEmail(listingData.ownerEmail, 'Your I-90 Eats listing is live!');
  }

  return { statusCode: 200 };
});