// server/api/auth0/add-restaurant-owner.post.ts
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const { email, restaurantSlug, restaurantName } = await readBody(event);
  
  if (!email || !restaurantSlug) {
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'Email and restaurant slug required' 
    });
  }

  const { auth0Domain, auth0ClientId, auth0ClientSecret } = useRuntimeConfig();
  
  try {
    // Get Auth0 management token
    const tokenResponse = await $fetch(`https://${auth0Domain}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: auth0ClientId,
        client_secret: auth0ClientSecret,
        audience: `https://${auth0Domain}/api/v2/`
      })
    });

    const { access_token } = tokenResponse;

    // Find or create user in Auth0
    const usersResponse = await $fetch(`https://${auth0Domain}/api/v2/users-by-email?email=${encodeURIComponent(email)}`, {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    let userId;
    if (usersResponse.length > 0) {
      // User exists, update metadata
      userId = usersResponse[0].user_id;
      await $fetch(`https://${auth0Domain}/api/v2/users/${userId}`, {
        method: 'PATCH',
        headers: { 
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_metadata: {
            role: 'restaurant-owner',
            restaurant_slug: restaurantSlug,
            restaurant_title: restaurantName
          }
        })
      });
    } else {
      // Create new user (they'll need to set password later)
      const newUserResponse = await $fetch(`https://${auth0Domain}/api/v2/users`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          email_verified: true,
          user_metadata: {
            role: 'restaurant-owner',
            restaurant_slug: restaurantSlug,
            restaurant_title: restaurantName
          },
          connection: 'Username-Password-Authentication' // or your default connection
        })
      });
      userId = newUserResponse.user_id;
    }

    return { success: true, userId };
  } catch (error) {
    console.error('Auth0 API error:', error);
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Failed to add restaurant owner to Auth0' 
    });
  }
});