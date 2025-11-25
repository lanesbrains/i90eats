// server/api/business/find-by-email.post.ts
import { defineEventHandler, readBody } from 'h3';
import { promises as fs } from 'fs';
import { resolve } from 'path';

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);
  
  if (!email) {
    return { found: false };
  }

  try {
    // Search all restaurant files for matching ownerEmail
    const restaurantsDir = resolve('content/restaurants');
    const files = await fs.readdir(restaurantsDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));
    
    for (const file of mdFiles) {
      const filePath = resolve(restaurantsDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      
      // Extract ownerEmail from frontmatter
      const ownerEmailMatch = content.match(/ownerEmail:\s*"([^"]+)"/);
      if (ownerEmailMatch && ownerEmailMatch[1].toLowerCase() === email.toLowerCase()) {
        // Parse restaurant data from frontmatter
        const titleMatch = content.match(/title:\s*"([^"]+)"/);
        const locationMatch = content.match(/location:\s*"([^"]+)"/);
        const slug = file.replace('.md', '');
        
        return {
          found: true,
          restaurant: {
            slug,
            title: titleMatch ? titleMatch[1] : 'Unknown',
            location: locationMatch ? locationMatch[1] : 'Unknown',
            ownerEmail: ownerEmailMatch[1]
          }
        };
      }
    }
    
    return { found: false };
  } catch (error) {
    console.error('Error finding restaurant by email:', error);
    return { found: false };
  }
});

