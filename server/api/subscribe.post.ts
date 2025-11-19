// server/api/subscribe.post.ts
import { defineEventHandler, readBody, createError } from 'h3';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const { beehiivApiKey, beehiivPublicationId } = useRuntimeConfig();
  const body = await readBody(event);
  const { email, locations } = body;

  // VALIDATION
  if (!email || !email.includes('@')) {
    throw createError({ statusCode: 400, statusMessage: 'Valid email required' });
  }
  if (!locations || !Array.isArray(locations) || locations.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Select at least one location' });
  }

  try {
    console.log('🚀 Subscribing to Beehiiv...');
    
    // Call Beehiiv API
    const beehiivResponse = await $fetch(`https://api.beehiiv.com/v2/publications/${beehiivPublicationId}/subscriptions`, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${beehiivApiKey}`, 
        'Content-Type': 'application/json' 
      },
      body: {
        email,
        send_welcome_email: true,
        custom_fields: [{ name: 'locations', value: locations.join(',') }],
        reactivate_existing: true,
        utm_source: 'website_signup'
      }
    });

    console.log('✅ Beehiiv subscription successful');

    // 📝 STORE LOCALLY (for verification)
    const subscriptionsPath = path.join(process.cwd(), 'server', 'subscriptions.json');
    
    // Read existing subscriptions
    let subscriptions = { subscribers: {} };
    try {
      const data = fs.readFileSync(subscriptionsPath, 'utf8');
      subscriptions = JSON.parse(data);
    } catch (err) {
      // File doesn't exist yet, use default
    }

    // Add/update subscriber
    subscriptions.subscribers[email.toLowerCase()] = {
      subscribedAt: new Date().toISOString(),
      locations: locations,
      verified: true,
      beehiivId: beehiivResponse?.id || null
    };

    // Save back to file
    fs.writeFileSync(subscriptionsPath, JSON.stringify(subscriptions, null, 2));
    console.log('💾 Local subscription recorded');

    return { ok: true, data: beehiivResponse };
  } catch (error) {
    console.error('❌ Subscription error:', error);
    throw createError({ 
      statusCode: 500, 
      statusMessage: `Subscription failed: ${error.message || 'Unknown error'}` 
    });
  }
});