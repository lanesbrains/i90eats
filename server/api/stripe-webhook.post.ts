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

  console.log('📨 Received Stripe webhook:', stripeEvent.type);

  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(stripeEvent.data.object);
        break;
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(stripeEvent.data.object);
        break;
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(stripeEvent.data.object);
        break;
      
      case 'invoice.payment_failed':
        await handlePaymentFailed(stripeEvent.data.object);
        break;
      
      default:
        console.log('Unhandled event type:', stripeEvent.type);
    }
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
  }

  return { statusCode: 200 };
});

async function handleCheckoutCompleted(session: any) {
  const listingData = session.metadata?.listingData ? JSON.parse(session.metadata.listingData) : null;

  if (listingData) {
    try {
      const restaurantResult = await $fetch('/api/create-restaurant-simple', {
        method: 'POST',
        body: {
          ...listingData,
          plan: session.metadata.plan
        }
      });

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
      }
      
      console.log('✅ Restaurant created and subscription activated!');
    } catch (error) {
      console.error('❌ Error creating restaurant or subscription:', error);
    }
  }
}

async function handleSubscriptionUpdated(subscription: any) {
  console.log('🔄 Subscription updated:', subscription.id);
  
  try {
    await $fetch('/api/business/restaurant/update-subscription', {
      method: 'POST',
      body: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer,
        subscriptionStatus: subscription.status,
        subscriptionTier: subscription.items.data[0]?.price.lookup_key || 'basic',
        currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString()
      }
    });
    console.log('✅ Subscription updated in database');
  } catch (error) {
    console.error('❌ Error updating subscription:', error);
  }
}

async function handleSubscriptionDeleted(subscription: any) {
  console.log('❌ Subscription cancelled:', subscription.id);
  
  try {
    await $fetch('/api/business/restaurant/update-subscription', {
      method: 'POST',
      body: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer,
        subscriptionStatus: 'cancelled',
        cancelledAt: new Date().toISOString()
      }
    });
    console.log('✅ Subscription marked as cancelled');
  } catch (error) {
    console.error('❌ Error cancelling subscription:', error);
  }
}

async function handlePaymentFailed(invoice: any) {
  console.log('💳 Payment failed for invoice:', invoice.id);
  
  try {
    await $fetch('/api/business/restaurant/payment-failed', {
      method: 'POST',
      body: {
        stripeCustomerId: invoice.customer,
        stripeSubscriptionId: invoice.subscription,
        invoiceId: invoice.id,
        amountDue: invoice.amount_due,
        attemptCount: invoice.attempt_count,
        nextPaymentAttempt: invoice.next_payment_attempt ? new Date(invoice.next_payment_attempt * 1000).toISOString() : null
      }
    });
    console.log('✅ Payment failure recorded');
  } catch (error) {
    console.error('❌ Error recording payment failure:', error);
  }
}