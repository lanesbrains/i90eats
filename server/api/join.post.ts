// server/api/join.post.ts
import { defineEventHandler, readBody, createError } from 'h3';  // ← Add createError import
import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  const { stripeSecretKey } = useRuntimeConfig();
  const stripe = new Stripe(stripeSecretKey);
  const body = await readBody(event);
  const { plan, priceId, ...listingData } = body;

  console.log('🏪 Business signup attempt:', { plan, priceId });

  if (plan === 'basic' || plan === 'premium') {
    try {
      console.log('💳 Creating Stripe checkout session...');
      
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com'}/business/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com'}/business/signup?canceled=1`,
        metadata: { 
          listingData: JSON.stringify(listingData),
          plan: plan
        }
      });

      console.log('✅ Checkout session created:', session.id);
      return { checkout_url: session.url };
    } catch (error) {
      console.error('❌ Stripe error:', error);
      throw createError({ 
        statusCode: 500, 
        statusMessage: 'Payment processing failed' 
      });
    }
  }

  console.log('❌ Invalid plan:', plan);
  throw createError({ statusCode: 400, statusMessage: 'Invalid plan' });
});