import { _ as __nuxt_component_0 } from './nuxt-link-BkWIATs8.mjs';
import { ref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
import './server.mjs';
import 'vue-router';

const _sfc_main = {
  __name: "success",
  __ssrInlineRender: true,
  setup(__props) {
    const planName = ref("Premium");
    const planPrice = ref("19.99");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16"><div class="container-max text-center"><div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6"><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div><h1 class="text-4xl font-bold mb-4"> Welcome to I-90 Eats Business Directory! </h1><p class="text-xl text-green-100"> Your restaurant listing is now live and ready to attract customers </p></div></section><section class="py-16"><div class="container-max max-w-4xl mx-auto text-center"><div class="card p-8 mb-8"><h2 class="text-2xl font-bold text-gray-900 mb-4"> Your Restaurant is Now Listed! </h2><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"><div class="text-center"><div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div><h3 class="text-lg font-semibold text-gray-900 mb-2"> Directory Listing </h3><p class="text-gray-600"> Your restaurant is now visible in our searchable directory </p></div><div class="text-center"><div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path></svg></div><h3 class="text-lg font-semibold text-gray-900 mb-2"> Deal Management </h3><p class="text-gray-600"> Start creating deals and promotions to attract customers </p></div><div class="text-center"><div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"></path></svg></div><h3 class="text-lg font-semibold text-gray-900 mb-2"> Newsletter Inclusion </h3><p class="text-gray-600"> Your deals will be featured in our weekly newsletters </p></div></div><div class="flex flex-col sm:flex-row gap-4 justify-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/business/dashboard",
        class: "btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Go to Dashboard `);
          } else {
            return [
              createTextVNode(" Go to Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/directory",
        class: "btn-secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View Your Listing `);
          } else {
            return [
              createTextVNode(" View Your Listing ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 mb-8"><h3 class="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3><div class="text-left space-y-4"><div class="flex items-start"><div class="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5"> 1 </div><div><h4 class="font-medium text-gray-900">Check Your Email</h4><p class="text-sm text-gray-600"> We&#39;ve sent you a welcome email with important information </p></div></div><div class="flex items-start"><div class="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5"> 2 </div><div><h4 class="font-medium text-gray-900"> Create Your First Deal </h4><p class="text-sm text-gray-600"> Use our content management system to add promotions and specials </p></div></div><div class="flex items-start"><div class="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5"> 3 </div><div><h4 class="font-medium text-gray-900">Monitor Performance</h4><p class="text-sm text-gray-600"> Track how your listing performs and adjust your deals accordingly </p></div></div></div></div><div class="bg-gray-50 rounded-xl p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4"> Subscription Details </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left"><div><span class="text-sm text-gray-600">Plan:</span><div class="font-medium text-gray-900">${ssrInterpolate(planName.value)} Restaurant Listing </div></div><div><span class="text-sm text-gray-600">Price:</span><div class="font-medium text-gray-900"> $${ssrInterpolate(planPrice.value)}/month </div></div><div><span class="text-sm text-gray-600">Billing:</span><div class="font-medium text-gray-900"> Monthly (auto-renewal) </div></div><div><span class="text-sm text-gray-600">Status:</span><div class="font-medium text-green-600">Active</div></div></div><div class="mt-6 pt-6 border-t border-gray-200"><p class="text-sm text-gray-600 mb-2"><strong>Need help?</strong> Contact us at business@i90eats.com </p><p class="text-sm text-gray-600"> You can manage your subscription and listing anytime through our business portal. </p></div></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/business/success.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=success-9nwFuugp.mjs.map
