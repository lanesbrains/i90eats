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

const restaurant_put = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    restaurantId,
    name,
    cuisine,
    location,
    address,
    phone,
    website,
    description
  } = body;
  try {
    console.log("Restaurant update:", {
      restaurantId,
      name,
      cuisine,
      location,
      address,
      phone,
      website,
      description
    });
    return {
      success: true,
      message: "Restaurant information updated successfully",
      data: {
        restaurantId,
        name,
        cuisine,
        location,
        address,
        phone,
        website,
        description,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  } catch (error) {
    console.error("Restaurant update error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update restaurant information"
    });
  }
});

export { restaurant_put as default };
//# sourceMappingURL=restaurant.put.mjs.map
