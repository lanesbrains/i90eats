import { defineEventHandler, readBody } from 'h3';
import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { stripeCustomerId, stripeSubscriptionId, invoiceId, amountDue, attemptCount, nextPaymentAttempt } = body;

  if (!stripeCustomerId || !invoiceId) {
    throw createError({ statusCode: 400, message: 'stripeCustomerId and invoiceId are required' });
  }

  try {
    const paymentFailuresPath = path.join(process.cwd(), 'data', 'payment-failures', `${stripeCustomerId}.json`);
    
    let failures = [];
    try {
      const fileContent = await fs.readFile(paymentFailuresPath, 'utf-8');
      failures = JSON.parse(fileContent);
    } catch (err) {
      console.log('No existing payment failures file, creating new one');
    }

    const failureRecord = {
      invoiceId,
      stripeSubscriptionId,
      amountDue,
      attemptCount,
      nextPaymentAttempt,
      recordedAt: new Date().toISOString()
    };

    failures.push(failureRecord);

    await fs.mkdir(path.dirname(paymentFailuresPath), { recursive: true });
    await fs.writeFile(paymentFailuresPath, JSON.stringify(failures, null, 2));

    const subscriptionFilePath = path.join(process.cwd(), 'data', 'subscriptions', `${stripeCustomerId}.json`);
    try {
      const subscriptionContent = await fs.readFile(subscriptionFilePath, 'utf-8');
      const subscriptionData = JSON.parse(subscriptionContent);
      subscriptionData.subscriptionStatus = 'past_due';
      subscriptionData.lastPaymentFailed = new Date().toISOString();
      await fs.writeFile(subscriptionFilePath, JSON.stringify(subscriptionData, null, 2));
    } catch (err) {
      console.log('Could not update subscription status');
    }

    console.log(`💳 Recorded payment failure for customer: ${stripeCustomerId}`);

    return { success: true, failureRecord };
  } catch (error: any) {
    console.error('Error recording payment failure:', error);
    throw createError({ statusCode: 500, message: error.message });
  }
});
