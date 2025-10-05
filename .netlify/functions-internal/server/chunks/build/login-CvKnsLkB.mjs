import { _ as __nuxt_component_0 } from './nuxt-link-WWwXaGM8.mjs';
import { ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
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
import './server.mjs';

const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const form = ref({
      email: "",
      password: ""
    });
    const loading = ref(false);
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4" }, _attrs))}><div class="max-w-md w-full space-y-8"><div class="text-center"><h2 class="text-3xl font-bold text-gray-900">Business Login</h2><p class="mt-2 text-sm text-gray-600">Access your restaurant dashboard</p></div><form class="mt-8 space-y-6"><div class="rounded-md shadow-sm -space-y-px"><div><label for="email" class="sr-only">Email address</label><input id="email"${ssrRenderAttr("value", form.value.email)} type="email" required class="input-field rounded-t-md" placeholder="Email address"></div><div><label for="password" class="sr-only">Password</label><input id="password"${ssrRenderAttr("value", form.value.password)} type="password" required class="input-field rounded-b-md" placeholder="Password"></div></div><div class="flex items-center justify-between"><div class="text-sm">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/business/signup",
        class: "font-medium text-primary-600 hover:text-primary-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Don&#39;t have an account? Sign up `);
          } else {
            return [
              createTextVNode(" Don't have an account? Sign up ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="text-sm"><a href="#" class="font-medium text-primary-600 hover:text-primary-500">Forgot password?</a></div></div><div><button type="submit" class="btn-primary w-full"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}>${ssrInterpolate(loading.value ? "Logging in..." : "Log in")}</button></div></form>`);
      if (error.value) {
        _push(`<div class="text-red-600 text-sm text-center mt-4">${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/business/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-CvKnsLkB.mjs.map
