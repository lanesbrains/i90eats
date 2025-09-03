import { d as defineNuxtRouteMiddleware, a as useNuxtApp, c as createError } from './server.mjs';
import 'vue';
import '../nitro/nitro.mjs';
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
//# sourceMappingURL=admin-TWQ42f_U.mjs.map
