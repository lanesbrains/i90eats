// server/api/verify-sub.post.ts
import { defineEventHandler, readBody } from 'h3';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);
  
  if (!email) {
    return { subscribed: false };
  }

  try {
    // Read local subscription data
    const subscriptionsPath = path.join(process.cwd(), 'server', 'subscriptions.json');
    const data = fs.readFileSync(subscriptionsPath, 'utf8');
    const subscriptions = JSON.parse(data);
    
    // Check if email exists and is verified
    const subscriber = subscriptions.subscribers[email.toLowerCase()];
    
    if (subscriber && subscriber.verified) {
      console.log(`✅ Verified subscription for: ${email}`);
      return { 
        subscribed: true, 
        locations: subscriber.locations,
        subscribedAt: subscriber.subscribedAt 
      };
    }
    
    console.log(`❌ No subscription found for: ${email}`);
    return { subscribed: false };
  } catch (error) {
    console.error('❌ Verification error:', error);
    // If file doesn't exist or can't be read, assume not subscribed
    return { subscribed: false };
  }
});