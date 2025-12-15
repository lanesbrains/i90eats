// server/api/auth/verify-subscriber.post.ts
import { defineEventHandler, readBody } from 'h3';
import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, stripeCustomerId } = body;

  if (!email && !stripeCustomerId) {
    throw createError({ statusCode: 400, message: 'Email or stripeCustomerId required' });
  }

  const { stripeSecretKey } = useRuntimeConfig();
  const stripe = new Stripe(stripeSecretKey);

  try {
    let customer = null;

    if (stripeCustomerId) {
      customer = await stripe.customers.retrieve(stripeCustomerId);
    } else {
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data.length > 0) {
        customer = customers.data[0];
      }
    }

    if (!customer) {
      return { 
        isSubscribed: false, 
        message: 'No customer found' 
      };
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1
    });

    if (subscriptions.data.length === 0) {
      return { 
        isSubscribed: false,
        customerId: customer.id,
        message: 'No active subscription' 
      };
    }

    const subscription = subscriptions.data[0];

    return {
      isSubscribed: true,
      customerId: customer.id,
      subscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      plan: subscription.items.data[0]?.price.lookup_key || 'basic'
    };
  } catch (error: any) {
    console.error('Error verifying subscriber:', error);
    throw createError({ statusCode: 500, message: error.message });
  }
});