import { defineEventHandler, readBody } from 'h3';
import { promises as fs } from 'fs';
import { resolve } from 'path';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { 
    restaurantName, 
    ownerEmail, 
    location, 
    address, 
    phone, 
    cuisine, 
    website, 
    description, 
    plan 
  } = body;

  // Create slug from restaurant name
  const slug = restaurantName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Generate frontmatter for the restaurant
  const frontmatter = `---
title: "${restaurantName}"
slug: "${slug}"
location: "${location}"
address: "${address}"
phone: "${phone}"
cuisine: "${cuisine}"
website: "${website || ''}"
description: "${description}"
premium: ${plan === 'premium'}
createdAt: "${new Date().toISOString()}"
updatedAt: "${new Date().toISOString()}"
ownerEmail: "${ownerEmail}"
deals: |
  ## 🎉 Exclusive I-90 Eats Deals

  Add your restaurant deals and specials here. This content will be visible to subscribers.

  ### Example Deal Format

  Use markdown to format your deals:

  - **Special Offer**: Description of your deal
  - **Valid**: Days and times
  - **Terms**: Any restrictions or requirements

subscribed: true
---`;

  // Add body content
  const bodyContent = `# ${restaurantName}

${description}

## About Us

Add more information about your restaurant here. This content will appear on your restaurant page.

## Contact Information

- **Location**: ${location}
- **Address**: ${address}
- **Phone**: ${phone}
${website ? `- **Website**: [${website}](${website})` : ''}

## Hours

Update your restaurant hours here.

## Specialties

Add information about your specialties, signature dishes, or what makes your restaurant unique.
`;

  // Write the restaurant file with both frontmatter and body
  const filePath = resolve('content/restaurants', `${slug}.md`);
  const fullContent = `${frontmatter}\n\n${bodyContent}`;
  
  try {
    await fs.writeFile(filePath, fullContent);
    console.log('✅ Restaurant file created:', filePath);
    return { 
      success: true, 
      slug, 
      message: 'Restaurant created successfully' 
    };
  } catch (error) {
    console.error('Error creating restaurant:', error);
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Failed to create restaurant' 
    });
  }
});
