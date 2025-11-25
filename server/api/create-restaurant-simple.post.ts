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
location: "${location}"
address: "${address}"
phone: "${phone}"
cuisine: "${cuisine}"
website: "${website || ''}"
description: "${description}"
premium: ${plan === 'premium'}
createdAt: "${new Date().toISOString()}"
ownerEmail: "${ownerEmail}"
deals: []
subscribed: true
---`;

  // Write the restaurant file
  const filePath = resolve('content/restaurants', `${slug}.md`);
  
  try {
    await fs.writeFile(filePath, frontmatter);
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
