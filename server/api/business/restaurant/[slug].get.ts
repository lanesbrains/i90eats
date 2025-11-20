// server/api/business/restaurant/[slug].get.ts
import { promises as fs } from 'fs';
import { resolve } from 'path';
import matter from 'gray-matter';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Restaurant slug required' });
  }

  try {
    const filePath = resolve('content/restaurants', `${slug}.md`);
    const content = await fs.readFile(filePath, 'utf8');
    const { data, content: bodyContent } = matter(content);
    
    // Parse deals from frontmatter or body
    let deals = data.deals || [];
    if (typeof deals === 'string') {
      // If deals is a markdown string, parse it
      deals = parseDealsFromMarkdown(deals);
    }
    
    return {
      ...data,
      slug,
      deals,
      body: bodyContent
    };
  } catch (error) {
    throw createError({ statusCode: 404, statusMessage: 'Restaurant not found' });
  }
});

function parseDealsFromMarkdown(dealsMarkdown) {
  // Simple parsing of ### headers as deal titles
  const deals = [];
  const sections = dealsMarkdown.split('###').slice(1);
  
  sections.forEach(section => {
    const lines = section.trim().split('\n');
    const title = lines[0].trim();
    const description = lines.slice(1).join('\n').trim();
    
    if (title && description) {
      deals.push({
        title,
        description,
        active: true,
        endDate: null // Could parse from content
      });
    }
  });
  
  return deals;
}