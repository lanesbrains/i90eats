// server/api/business/verify-ownership.post.ts
import { defineEventHandler, readBody } from 'h3';
import jwt from 'jsonwebtoken';
import { promises as fs } from 'fs';
import { resolve } from 'path';

export default defineEventHandler(async (event) => {
  const { token, email } = await readBody(event);
  
  if (!token || !email) {
    return { isOwner: false };
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    
    if (decoded.email !== email || !decoded.restaurantSlug) {
      return { isOwner: false };
    }

    // Check if restaurant file exists and owner matches
    const restaurantPath = resolve('content/restaurants', `${decoded.restaurantSlug}.md`);
    
    try {
      const content = await fs.readFile(restaurantPath, 'utf8');
      
      // Extract ownerEmail from frontmatter
      const ownerEmailMatch = content.match(/ownerEmail:\s*"([^"]+)"/);
      if (ownerEmailMatch && ownerEmailMatch[1] === email) {
        // Parse restaurant data from frontmatter
        const titleMatch = content.match(/title:\s*"([^"]+)"/);
        const locationMatch = content.match(/location:\s*"([^"]+)"/);
        
        return {
          isOwner: true,
          restaurant: {
            slug: decoded.restaurantSlug,
            title: titleMatch ? titleMatch[1] : 'Unknown',
            location: locationMatch ? locationMatch[1] : 'Unknown',
            ownerEmail: email
          }
        };
      }
    } catch (error) {
      console.error('Restaurant file not found:', restaurantPath);
    }
    
    return { isOwner: false };
  } catch (error) {
    console.error('Token verification failed:', error);
    return { isOwner: false };
  }
});