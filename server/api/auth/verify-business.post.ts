// server/api/auth/verify-business.post.ts
import { defineEventHandler, readBody } from 'h3';
import jwt from 'jsonwebtoken';
import { promises as fs } from 'fs';
import { resolve } from 'path';

export default defineEventHandler(async (event) => {
  const { token, email } = await readBody(event);
  
  if (!token && !email) {
    return { isOwner: false };
  }

  try {
    let decoded;
    let restaurantSlug = null;
    
    if (token) {
      // Verify JWT token
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
        
        if (decoded.email !== email || decoded.type !== 'business') {
          return { isOwner: false };
        }
        
        restaurantSlug = decoded.restaurantSlug || null;
      } catch (tokenError) {
        // Token invalid or expired, but we can still try email lookup
        console.log('Token verification failed, trying email lookup:', tokenError.message);
      }
    }

    // If we have a slug from token, use it directly
    if (restaurantSlug) {
      const filePath = resolve('content/restaurants', `${restaurantSlug}.md`);
      
      try {
        const content = await fs.readFile(filePath, 'utf8');
        
        // Extract ownerEmail from frontmatter
        const ownerEmailMatch = content.match(/ownerEmail:\s*"([^"]+)"/);
        if (ownerEmailMatch && ownerEmailMatch[1].toLowerCase() === email.toLowerCase()) {
          // Parse restaurant data
          const titleMatch = content.match(/title:\s*"([^"]+)"/);
          const locationMatch = content.match(/location:\s*"([^"]+)"/);
          
          return {
            isOwner: true,
            restaurant: {
              slug: restaurantSlug,
              title: titleMatch ? titleMatch[1] : 'Unknown',
              location: locationMatch ? locationMatch[1] : 'Unknown',
              ownerEmail: ownerEmailMatch[1]
            }
          };
        }
      } catch (error) {
        console.error('Restaurant file not found:', filePath);
      }
    }
    
    // If no slug or slug lookup failed, search by email
    if (email) {
      try {
        const findResult = await $fetch('/api/business/find-by-email', {
          method: 'POST',
          body: { email }
        });
        
        if (findResult.found && findResult.restaurant) {
          return {
            isOwner: true,
            restaurant: findResult.restaurant
          };
        }
      } catch (error) {
        console.error('Email lookup failed:', error);
      }
    }
    
    return { isOwner: false };
  } catch (error) {
    console.error('Business token verification failed:', error);
    return { isOwner: false };
  }
});