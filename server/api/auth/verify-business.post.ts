// server/api/auth/verify-business.post.ts
import { defineEventHandler, readBody } from 'h3';
import Stripe from 'stripe';
import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, stripeCustomerId, restaurantSlug } = body;

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
        isVerified: false, 
        message: 'No customer found' 
      };
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 10
    });

    if (subscriptions.data.length === 0) {
      return { 
        isVerified: false,
        customerId: customer.id,
        message: 'No active business subscription' 
      };
    }

    const businessSubscription = subscriptions.data[0];

    let restaurantData = null;
    if (restaurantSlug) {
      try {
        const subscriptionFilePath = path.join(process.cwd(), 'data', 'subscriptions', `${customer.id}.json`);
        const fileContent = await fs.readFile(subscriptionFilePath, 'utf-8');
        restaurantData = JSON.parse(fileContent);
      } catch (err) {
        console.log('No restaurant data found for slug:', restaurantSlug);
      }
    }

    return {
      isVerified: true,
      customerId: customer.id,
      subscriptionId: businessSubscription.id,
      subscriptionStatus: businessSubscription.status,
      subscriptionTier: businessSubscription.items.data[0]?.price.lookup_key || 'basic',
      currentPeriodEnd: new Date(businessSubscription.current_period_end * 1000),
      restaurant: restaurantData
    };
  } catch (error: any) {
    console.error('Error verifying business:', error);
    throw createError({ statusCode: 500, message: error.message });
  }
});