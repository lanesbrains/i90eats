// server/api/business/create-token.post.ts
import { defineEventHandler, readBody } from 'h3';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const { email, restaurantSlug } = await readBody(event);
  
  if (!email || !restaurantSlug) {
    throw createError({ statusCode: 400, statusMessage: 'Email and restaurant slug required' });
  }

  try {
    // Create JWT token for business authentication
    const token = jwt.sign(
      {
        email,
        restaurantSlug,
        type: 'business_owner',
        issuedAt: new Date().toISOString()
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '1y' }
    );

    return { token };
  } catch (error) {
    console.error('Token creation error:', error);
    throw createError({ statusCode: 500, statusMessage: 'Failed to create authentication token' });
  }
});