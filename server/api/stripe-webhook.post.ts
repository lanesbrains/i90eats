// server/api/stripe-webhook.post.ts
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
      try {
        // Actually create the restaurant
        const restaurantResult = await $fetch('/api/create-restaurant-simple', {
          method: 'POST',
          body: {
            ...listingData,
            plan: session.metadata.plan
          }
        });

        // Create restaurant subscription record
        if (restaurantResult.success) {
          await $fetch('/api/create-restaurant-subscription', {
            method: 'POST',
            body: {
              restaurantSlug: restaurantResult.slug,
              ownerEmail: listingData.ownerEmail || listingData.email,
              stripeCustomerId: session.customer,
              stripeSubscriptionId: session.subscription,
              subscriptionTier: session.metadata.plan,
              subscriptionStatus: 'active',
              subscribedAt: new Date().toISOString(),
              currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            }
          });

          // 🔑 ADD USER TO AUTH0 WITH RESTAURANT ACCESS
          try {
            await $fetch('/api/auth0/add-restaurant-owner', {
              method: 'POST',
              body: {
                email: listingData.ownerEmail || listingData.email,
                restaurantSlug: restaurantResult.slug,
                restaurantName: listingData.restaurantName
              }
            });
          } catch (auth0Error) {
            console.error('Failed to add user to Auth0:', auth0Error);
            // Don't fail the webhook - restaurant is still created
          }
        }
        
        console.log('✅ Restaurant created and owner access granted!');
      } catch (error) {
        console.error('❌ Error creating restaurant or subscription:', error);
        // Don't throw - webhook should still return 200
      }
    }
  }

  return { statusCode: 200 };
});