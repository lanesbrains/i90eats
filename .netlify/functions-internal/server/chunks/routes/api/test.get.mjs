import { d as defineEventHandler } from '../../nitro/nitro.mjs';
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

const test_get = defineEventHandler(async (event) => {
  return {
    success: true,
    message: "API is working!",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    environment: "production"
  };
});

export { test_get as default };
//# sourceMappingURL=test.get.mjs.map
