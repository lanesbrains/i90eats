import { d as defineEventHandler, g as getRouterParam, r as readBody, c as createError } from '../../../../nitro/nitro.mjs';
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

const _id__put = defineEventHandler(async (event) => {
  const dealId = getRouterParam(event, "id");
  const body = await readBody(event);
  const {
    title,
    description,
    startDate,
    endDate,
    active
  } = body;
  try {
    console.log("Deal update:", {
      dealId,
      title,
      description,
      startDate,
      endDate,
      active
    });
    return {
      success: true,
      message: "Deal updated successfully",
      data: {
        id: dealId,
        title,
        description,
        startDate,
        endDate,
        active,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  } catch (error) {
    console.error("Deal update error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update deal"
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
