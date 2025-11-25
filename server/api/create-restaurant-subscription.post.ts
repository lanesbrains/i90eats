// server/api/create-restaurant-subscription.post.ts
import { defineEventHandler, readBody } from 'h3';
import { promises as fs } from 'fs';
import { resolve } from 'path';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { 
    restaurantSlug,
    ownerEmail,
    stripeCustomerId,
    stripeSubscriptionId,
    subscriptionTier,
    subscriptionStatus,
    subscribedAt,
    currentPeriodEnd
  } = body;

  if (!restaurantSlug || !ownerEmail) {
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'Restaurant slug and owner email required' 
    });
  }

  // Generate frontmatter for the restaurant subscription
  const frontmatter = `---
restaurantSlug: "${restaurantSlug}"
ownerEmail: "${ownerEmail}"
stripeCustomerId: "${stripeCustomerId || ''}"
stripeSubscriptionId: "${stripeSubscriptionId || ''}"
subscriptionTier: "${subscriptionTier || 'basic'}"
subscriptionStatus: "${subscriptionStatus || 'active'}"
subscribedAt: "${subscribedAt || new Date().toISOString()}"
currentPeriodEnd: "${currentPeriodEnd || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()}"
---`;

  // Ensure directory exists
  const subscriptionsDir = resolve('content/restaurant-subscriptions');
  try {
    await fs.mkdir(subscriptionsDir, { recursive: true });
  } catch (error) {
    // Directory might already exist, that's fine
    if (error.code !== 'EEXIST') {
      console.error('Error creating subscriptions directory:', error);
    }
  }

  // Write the restaurant subscription file
  const filePath = resolve(subscriptionsDir, `${restaurantSlug}.md`);
  
  try {
    await fs.writeFile(filePath, frontmatter);
    console.log('✅ Restaurant subscription record created:', filePath);
    return { 
      success: true, 
      message: 'Restaurant subscription created successfully' 
    };
  } catch (error) {
    console.error('Error creating restaurant subscription:', error);
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Failed to create restaurant subscription' 
    });
  }
});

