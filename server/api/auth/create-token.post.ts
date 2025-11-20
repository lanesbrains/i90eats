// server/api/auth/create-token.post.ts
import { defineEventHandler, readBody } from 'h3';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const { email, type, locations, restaurantSlug } = await readBody(event);
  
  if (!email || !type) {
    throw createError({ statusCode: 400, statusMessage: 'Email and type required' });
  }

  try {
    const tokenPayload = {
      email,
      type,
      issuedAt: new Date().toISOString()
    };

    // Add type-specific data
    if (type === 'subscriber') {
      tokenPayload.locations = locations || [];
    } else if (type === 'business') {
      tokenPayload.restaurantSlug = restaurantSlug;
    }

    // Create JWT token
    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: type === 'business' ? '1y' : '1y' } // Both valid for 1 year
    );

    return { token };
  } catch (error) {
    console.error('Token creation error:', error);
    throw createError({ statusCode: 500, statusMessage: 'Failed to create authentication token' });
  }
});