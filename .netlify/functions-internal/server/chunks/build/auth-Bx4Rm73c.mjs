import { d as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
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

const auth = defineNuxtRouteMiddleware((to, from) => {
  const isPrerender = process.env.NUXT_PRERENDER === "true";
  if (isPrerender) {
    return;
  }
  {
    return navigateTo("/business/login");
  }
});

export { auth as default };
//# sourceMappingURL=auth-Bx4Rm73c.mjs.map
