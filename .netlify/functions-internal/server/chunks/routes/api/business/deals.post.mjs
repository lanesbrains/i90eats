import { d as defineEventHandler, r as readBody, c as createError } from '../../../nitro/nitro.mjs';
import 'unified';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'detab';
import 'micromark-util-sanitize-uri';
import 'hast-util-to-string';
import 'github-slugger';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'ipx';

const deals_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    restaurantId,
    title,
    description,
    startDate,
    endDate,
    active
  } = body;
  try {
    const dealId = Date.now().toString();
    console.log("Deal creation:", {
      dealId,
      restaurantId,
      title,
      description,
      startDate,
      endDate,
      active
    });
    return {
      success: true,
      message: "Deal created successfully",
      data: {
        id: dealId,
        restaurantId,
        title,
        description,
        startDate,
        endDate,
        active,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  } catch (error) {
    console.error("Deal creation error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create deal"
    });
  }
});

export { deals_post as default };
//# sourceMappingURL=deals.post.mjs.map
