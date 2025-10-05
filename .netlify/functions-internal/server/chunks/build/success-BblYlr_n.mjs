import { _ as __nuxt_component_0 } from './nuxt-link-WWwXaGM8.mjs';
import { withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useSubscription } from './useSubscription-Bak8OegO.mjs';
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
import 'vue-router';

const _sfc_main = {
  __name: "success",
  __ssrInlineRender: true,
  setup(__props) {
    useSubscription();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16"><div class="container-max text-center"><div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6"><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div><h1 class="text-4xl font-bold mb-4"> Welcome to I-90 Restaurant Deals! </h1><p class="text-xl text-green-100"> Your subscription is now active. Start exploring exclusive deals! </p></div></section><section class="py-16"><div class="container-max max-w-2xl mx-auto text-center"><div class="card p-8"><div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div><h1 class="text-3xl font-bold text-gray-900 mb-4">Welcome to I-90 Restaurant Deals!</h1><p class="text-gray-600 mb-8"> Your subscription has been activated. You now have access to exclusive restaurant deals along your selected I-90 routes. </p><div class="space-y-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/directory",
        class: "btn-primary block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Browse Restaurant Deals `);
          } else {
            return [
              createTextVNode(" Browse Restaurant Deals ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-sm text-gray-500"> Your first newsletter will arrive this Friday with the latest deals. </p></div></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/subscription/success.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=success-BblYlr_n.mjs.map
