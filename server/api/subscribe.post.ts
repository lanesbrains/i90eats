// server/api/subscribe.post.ts
import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const { beehiivApiKey, beehiivPublicationId } = useRuntimeConfig();
  const body = await readBody(event);
  const { email, locations } = body;

  // VALIDATION: Check required fields
  if (!email || !email.includes('@')) {
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'Valid email is required' 
    });
  }

  if (!locations || !Array.isArray(locations) || locations.length === 0) {
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'At least one location is required' 
    });
  }

  try {
    // Calls Beehiiv API to add subscriber
    const response = await $fetch(`https://api.beehiiv.com/v2/publications/${beehiivPublicationId}/subscriptions`, {
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
  
    return { ok: true, data: response };
  } catch (error) {
    console.error('Beehiiv API error:', error);
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Failed to subscribe to newsletter' 
    });
  }
});