import { defineEventHandler, readBody } from 'h3';
import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { restaurantSlug, deal, action } = body;

  if (!restaurantSlug || !action) {
    throw createError({ statusCode: 400, message: 'restaurantSlug and action are required' });
  }

  try {
    const restaurantFile = path.join(process.cwd(), 'content', 'restaurants', `${restaurantSlug}.md`);
    
    let fileContent = await fs.readFile(restaurantFile, 'utf-8');
    
    const dealsMatch = fileContent.match(/deals:\s*\n([\s\S]*?)(?=\n\w+:|$)/);
    let deals = [];
    
    if (dealsMatch) {
      const dealsYaml = dealsMatch[1];
      const dealRegex = /- title: "(.*?)"\n\s+description: "(.*?)"\n\s+endDate: "(.*?)"\n\s+active: (true|false)/g;
      let match;
      while ((match = dealRegex.exec(dealsYaml)) !== null) {
        deals.push({
          title: match[1],
          description: match[2],
          endDate: match[3],
          active: match[4] === 'true'
        });
      }
    }

    switch (action) {
      case 'add':
        if (!deal) throw createError({ statusCode: 400, message: 'Deal data required for add action' });
        deals.push({
          title: deal.title,
          description: deal.description,
          endDate: deal.endDate,
          active: deal.active !== false
        });
        break;

      case 'update':
        if (!deal || deal.index === undefined) {
          throw createError({ statusCode: 400, message: 'Deal data with index required for update action' });
        }
        if (deal.index >= 0 && deal.index < deals.length) {
          deals[deal.index] = {
            title: deal.title,
            description: deal.description,
            endDate: deal.endDate,
            active: deal.active !== false
          };
        }
        break;

      case 'delete':
        if (deal?.index === undefined) {
          throw createError({ statusCode: 400, message: 'Deal index required for delete action' });
        }
        if (deal.index >= 0 && deal.index < deals.length) {
          deals.splice(deal.index, 1);
        }
        break;

      default:
        throw createError({ statusCode: 400, message: `Unknown action: ${action}` });
    }

    const dealsYaml = deals.length > 0
      ? deals.map(d => `  - title: "${d.title}"
    description: "${d.description}"
    endDate: "${d.endDate}"
    active: ${d.active}`).join('\n')
      : '';

    const dealsSection = dealsYaml ? `deals:\n${dealsYaml}` : 'deals: []';

    if (dealsMatch) {
      fileContent = fileContent.replace(/deals:\s*\n([\s\S]*?)(?=\n\w+:|$)/, dealsSection + '\n');
    } else {
      const frontmatterEnd = fileContent.indexOf('---', 3);
      if (frontmatterEnd !== -1) {
        fileContent = fileContent.slice(0, frontmatterEnd) + dealsSection + '\n' + fileContent.slice(frontmatterEnd);
      }
    }

    await fs.writeFile(restaurantFile, fileContent, 'utf-8');

    console.log(`✅ Deal ${action} successful for ${restaurantSlug}`);

    return { success: true, deals };
  } catch (error: any) {
    console.error('Error managing deals:', error);
    throw createError({ statusCode: 500, message: error.message });
  }
});
