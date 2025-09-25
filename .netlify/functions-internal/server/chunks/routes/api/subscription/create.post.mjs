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

const create_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, locations, priceId } = body;
  console.log("Subscription API called with:", { email, locations: locations == null ? void 0 : locations.length, priceId });
  if (!email || !locations || !Array.isArray(locations) || locations.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid input data"
    });
  }
  return {
    success: true,
    data: {
      checkout_url: "https://checkout.stripe.com/test-session",
      session_id: "test_session_123"
    },
    message: "Mock subscription created successfully"
  };
});

export { create_post as default };
//# sourceMappingURL=create.post.mjs.map
