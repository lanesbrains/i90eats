// server/api/subscribe.post.ts
import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const { beehiivApiKey, beehiivPublicationId } = useRuntimeConfig();
  const body = await readBody(event);
  const { email, locations } = body;

  console.log('🔍 DEBUG: Starting subscription request');
  console.log('📧 Email:', email);
  console.log('📍 Locations:', locations);
  console.log('🔑 API Key exists:', !!beehiivApiKey);
  console.log('📄 Publication ID:', beehiivPublicationId);

  // VALIDATION: Check required fields
  if (!email || !email.includes('@')) {
    console.log('❌ Email validation failed');
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'Valid email is required' 
    });
  }

  if (!locations || !Array.isArray(locations) || locations.length === 0) {
    console.log('❌ Locations validation failed');
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'At least one location is required' 
    });
  }

  try {
    console.log('🚀 Calling Beehiiv API...');
    
    const apiUrl = `https://api.beehiiv.com/v2/publications/${beehiivPublicationId}/subscriptions`;
    console.log('🌐 API URL:', apiUrl);
    
    const requestBody = {
      email,
      send_welcome_email: true,
      custom_fields: [{ name: 'locations', value: locations.join(',') }],
      reactivate_existing: true,
      utm_source: 'website_signup'
    };
    console.log('📤 Request body:', JSON.stringify(requestBody, null, 2));

    // Calls Beehiiv API to add subscriber
    const response = await $fetch(apiUrl, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${beehiivApiKey}`, 
        'Content-Type': 'application/json' 
      },
      body: requestBody
    });
  
    console.log('✅ Beehiiv API success:', response);
    return { ok: true, data: response };
  } catch (error) {
    console.error('❌ Beehiiv API error details:', {
      message: error.message,
      status: error.status,
      statusText: error.statusText,
      data: error.data,
      stack: error.stack
    });
    
    // Check for common issues
    if (error.status === 401) {
      console.error('🚫 AUTH ISSUE: Check your BEEHIIV_API_KEY');
    } else if (error.status === 404) {
      console.error('🚫 NOT FOUND: Check your BEEHIIV_PUBLICATION_ID');
    } else if (error.status === 422) {
      console.error('🚫 VALIDATION: Check request format');
    }
    
    throw createError({ 
      statusCode: 500, 
      statusMessage: `Newsletter subscription failed: ${error.message || 'Unknown error'}` 
    });
  }
});