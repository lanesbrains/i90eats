import { defineEventHandler, readBody } from 'h3';
import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  const { stripeSecretKey } = useRuntimeConfig();
  const stripe = new Stripe(stripeSecretKey);
  const body = await readBody(event);
  const { plan, priceId, ...listingData } = body;

  // Log for now; integrate with CMS/email later
  console.log('New business listing:', { plan, ...listingData });

  if (plan === 'basic' || plan === 'premium') {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com'}/join-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com'}/join?canceled=1`,
      metadata: { listingData: JSON.stringify(listingData) }
    });
    return { checkout_url: session.url };
  }

  return { statusCode: 400, body: { error: 'Invalid plan' } };
});