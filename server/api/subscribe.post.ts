// server/api/subscribe.post.ts
import { defineEventHandler, readBody, createError } from 'h3';
import jwt from 'jsonwebtoken';

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

    // 🔐 CREATE SECURE SUBSCRIPTION TOKEN
    const subscriptionToken = jwt.sign(
      {
        email: email.toLowerCase(),
        locations,
        subscribedAt: new Date().toISOString(),
        verified: true
      },
      process.env.JWT_SECRET || 'fallback-secret', // Use your JWT_SECRET from env
      { expiresIn: '1y' } // Valid for 1 year
    );

    return { 
      ok: true, 
      subscriptionToken,
      message: 'Successfully subscribed!' 
    };
  } catch (error) {
    console.error('❌ Subscription error:', error);
    throw createError({ 
      statusCode: 500, 
      statusMessage: `Subscription failed: ${error.message || 'Unknown error'}` 
    });
  }
});