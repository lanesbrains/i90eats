// server/api/verify-sub.post.ts
import { defineEventHandler, readBody } from 'h3';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);
  
  if (!token) {
    console.log('❌ No subscription token provided');
    return { subscribed: false };
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    
    if (decoded.verified && decoded.email) {
      console.log(`✅ Valid subscription token for: ${decoded.email}`);
      return { 
        subscribed: true, 
        email: decoded.email,
        locations: decoded.locations,
        subscribedAt: decoded.subscribedAt 
      };
    }
    
    console.log('❌ Invalid subscription token');
    return { subscribed: false };
  } catch (error) {
    console.error('❌ Token verification failed:', error.message);
    return { subscribed: false };
  }
});