// server/api/auth/verify-subscriber.post.ts
import { defineEventHandler, readBody } from 'h3';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const { token, email } = await readBody(event);
  
  if (!token || !email) {
    return { valid: false };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    
    if (decoded.email === email && decoded.type === 'subscriber') {
      return { valid: true, locations: decoded.locations };
    }
    
    return { valid: false };
  } catch (error) {
    console.error('Subscriber token verification failed:', error);
    return { valid: false };
  }
});