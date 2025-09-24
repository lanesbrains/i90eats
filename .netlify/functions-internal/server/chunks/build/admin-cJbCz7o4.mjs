import { d as defineNuxtRouteMiddleware, b as useNuxtApp, c as createError } from './server.mjs';
import 'vue';
import '../nitro/nitro.mjs';
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
import 'vue-router';
import 'vue/server-renderer';

const admin = defineNuxtRouteMiddleware((to, from) => {
  var _a;
  const { $auth } = useNuxtApp();
  if (!((_a = $auth == null ? void 0 : $auth.user) == null ? void 0 : _a.admin)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Admin access required"
    });
  }
});

export { admin as default };
//# sourceMappingURL=admin-cJbCz7o4.mjs.map
