import { d as defineEventHandler, g as getRouterParam, c as createError } from '../../../../nitro/nitro.mjs';
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

const _id__delete = defineEventHandler(async (event) => {
  const dealId = getRouterParam(event, "id");
  try {
    console.log("Deal deletion:", { dealId });
    return {
      success: true,
      message: "Deal deleted successfully"
    };
  } catch (error) {
    console.error("Deal deletion error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete deal"
    });
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
