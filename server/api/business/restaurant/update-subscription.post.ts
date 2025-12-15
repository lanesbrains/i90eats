import { defineEventHandler, readBody } from 'h3';
import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { stripeSubscriptionId, stripeCustomerId, subscriptionStatus, subscriptionTier, currentPeriodEnd, cancelledAt } = body;

  if (!stripeSubscriptionId) {
    throw createError({ statusCode: 400, message: 'stripeSubscriptionId is required' });
  }

  try {
    const subscriptionFilePath = path.join(process.cwd(), 'data', 'subscriptions', `${stripeCustomerId}.json`);
    
    let existingData = {};
    try {
      const fileContent = await fs.readFile(subscriptionFilePath, 'utf-8');
      existingData = JSON.parse(fileContent);
    } catch (err) {
      console.log('No existing subscription file, creating new one');
    }

    const updatedData = {
      ...existingData,
      stripeSubscriptionId,
      stripeCustomerId,
      subscriptionStatus,
      ...(subscriptionTier && { subscriptionTier }),
      ...(currentPeriodEnd && { currentPeriodEnd }),
      ...(cancelledAt && { cancelledAt }),
      updatedAt: new Date().toISOString()
    };

    await fs.mkdir(path.dirname(subscriptionFilePath), { recursive: true });
    await fs.writeFile(subscriptionFilePath, JSON.stringify(updatedData, null, 2));

    console.log(`✅ Updated subscription: ${stripeSubscriptionId}`);

    return { success: true, data: updatedData };
  } catch (error: any) {
    console.error('Error updating subscription:', error);
    throw createError({ statusCode: 500, message: error.message });
  }
});
