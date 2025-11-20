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
    
    if (token) {
      // Verify JWT token
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
      
      if (decoded.email !== email || decoded.type !== 'business') {
        return { isOwner: false };
      }
    }

    // Check if restaurant file exists and owner matches
    const restaurantSlug = token ? decoded.restaurantSlug : null;
    
    if (!restaurantSlug) {
      // For token-less verification, we'd need to search all restaurants
      // This is a simplified version
      return { isOwner: false };
    }

    const filePath = resolve('content/restaurants', `${restaurantSlug}.md`);
    
    try {
      const content = await fs.readFile(filePath, 'utf8');
      
      // Extract ownerEmail from frontmatter
      const ownerEmailMatch = content.match(/ownerEmail:\s*"([^"]+)"/);
      if (ownerEmailMatch && ownerEmailMatch[1] === email) {
        // Parse restaurant data
        const titleMatch = content.match(/title:\s*"([^"]+)"/);
        const locationMatch = content.match(/location:\s*"([^"]+)"/);
        
        return {
          isOwner: true,
          restaurant: {
            slug: restaurantSlug,
            title: titleMatch ? titleMatch[1] : 'Unknown',
            location: locationMatch ? locationMatch[1] : 'Unknown',
            ownerEmail: email
          }
        };
      }
    } catch (error) {
      console.error('Restaurant file not found:', filePath);
    }
    
    return { isOwner: false };
  } catch (error) {
    console.error('Business token verification failed:', error);
    return { isOwner: false };
  }
});