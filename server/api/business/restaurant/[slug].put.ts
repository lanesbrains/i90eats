// server/api/business/restaurant/[slug].put.ts
import { promises as fs } from 'fs';
import { resolve } from 'path';
import matter from 'gray-matter';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  const body = await readBody(event);
  
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Restaurant slug required' });
  }

  try {
    const filePath = resolve('content/restaurants', `${slug}.md`);
    const existingContent = await fs.readFile(filePath, 'utf8');
    const { data: existingData, content: bodyContent } = matter(existingContent);
    
    // Update only allowed fields
    const updatedData = {
      ...existingData,
      title: body.title || existingData.title,
      cuisine: body.cuisine || existingData.cuisine,
      location: body.location || existingData.location,
      phone: body.phone || existingData.phone,
      address: body.address || existingData.address,
      website: body.website || existingData.website,
      description: body.description || existingData.description,
      updatedAt: new Date().toISOString()
    };

    // Generate updated frontmatter
    const frontmatter = Object.entries(updatedData)
      .map(([key, value]) => `${key}: "${value}"`)
      .join('\n');

    const newContent = `---\n${frontmatter}\n---\n\n${bodyContent}`;
    
    await fs.writeFile(filePath, newContent);
    
    return { success: true, message: 'Restaurant updated successfully' };
  } catch (error) {
    console.error('Update error:', error);
    throw createError({ statusCode: 500, statusMessage: 'Failed to update restaurant' });
  }
});