import { _ as __nuxt_component_0 } from './nuxt-link-WWwXaGM8.mjs';
import { ref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const showCMSModal = ref(false);
    const stats = ref({
      totalRestaurants: 15,
      premiumRestaurants: 8,
      totalSubscribers: 342,
      newslettersSent: 24
    });
    const recentActivity = ref([
      {
        id: 1,
        title: "New Restaurant Added",
        description: "The Chicago Deep Dish Delight was added to the directory",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1e3)
        // 2 hours ago
      },
      {
        id: 2,
        title: "Newsletter Sent",
        description: "Weekly newsletter sent to 342 subscribers",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1e3)
        // 1 day ago
      },
      {
        id: 3,
        title: "Deals Updated",
        description: "Updated deals for Seattle Seafood Co.",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1e3)
        // 3 days ago
      },
      {
        id: 4,
        title: "New Subscriber",
        description: "John Doe subscribed to Seattle and Spokane locations",
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1e3)
        // 5 days ago
      }
    ]);
    const formatDate = (date) => {
      const now = /* @__PURE__ */ new Date();
      const diff = now.getTime() - date.getTime();
      const hours = Math.floor(diff / (1e3 * 60 * 60));
      const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
      if (hours < 24) {
        return `${hours} hours ago`;
      } else if (days < 7) {
        return `${days} days ago`;
      } else {
        return date.toLocaleDateString();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16"><div class="container-max text-center"><h1 class="text-4xl font-bold mb-4">Content Management</h1><p class="text-xl text-primary-100"> Manage restaurants, newsletters, and subscriber data </p></div></section><section class="py-16"><div class="container-max max-w-6xl mx-auto"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"><div class="card p-6 text-center"><div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></div><h3 class="text-lg font-semibold text-gray-900 mb-2"> Content Management </h3><p class="text-gray-600 mb-4"> Add and edit restaurants, deals, and newsletters </p><button class="btn-primary w-full"> Open CMS </button></div><div class="card p-6 text-center"><div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div><h3 class="text-lg font-semibold text-gray-900 mb-2"> Restaurants </h3><p class="text-gray-600 mb-4"> Manage restaurant listings and deals </p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/directory",
        class: "btn-secondary w-full inline-block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View Directory `);
          } else {
            return [
              createTextVNode(" View Directory ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="card p-6 text-center"><div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div><h3 class="text-lg font-semibold text-gray-900 mb-2"> Newsletters </h3><p class="text-gray-600 mb-4"> Create and manage weekly newsletters </p><button class="btn-accent w-full"> Create Newsletter </button></div></div><div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"><div class="card p-6 text-center"><div class="text-3xl font-bold text-primary-600 mb-2">${ssrInterpolate(stats.value.totalRestaurants)}</div><div class="text-gray-600">Total Restaurants</div></div><div class="card p-6 text-center"><div class="text-3xl font-bold text-accent-600 mb-2">${ssrInterpolate(stats.value.premiumRestaurants)}</div><div class="text-gray-600">Premium Listings</div></div><div class="card p-6 text-center"><div class="text-3xl font-bold text-secondary-600 mb-2">${ssrInterpolate(stats.value.totalSubscribers)}</div><div class="text-gray-600">Active Subscribers</div></div><div class="card p-6 text-center"><div class="text-3xl font-bold text-green-600 mb-2">${ssrInterpolate(stats.value.newslettersSent)}</div><div class="text-gray-600">Newsletters Sent</div></div></div><div class="card p-6"><h3 class="text-xl font-semibold text-gray-900 mb-6"> Recent Activity </h3><div class="space-y-4"><!--[-->`);
      ssrRenderList(recentActivity.value, (activity) => {
        _push(`<div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"><div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0"><svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></div><div class="flex-1"><p class="text-gray-900 font-medium">${ssrInterpolate(activity.title)}</p><p class="text-sm text-gray-600">${ssrInterpolate(activity.description)}</p></div><div class="text-sm text-gray-500">${ssrInterpolate(formatDate(activity.timestamp))}</div></div>`);
      });
      _push(`<!--]--></div></div></div></section>`);
      if (showCMSModal.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"><div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"><div class="flex items-center justify-between p-6 border-b border-gray-200"><h3 class="text-xl font-semibold text-gray-900"> Content Management System </h3><button class="text-gray-400 hover:text-gray-600"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="p-6"><p class="text-gray-600 mb-6"> The CMS will open in a new tab. You can manage restaurants, newsletters, and subscriber data there. </p><div class="flex gap-4"><button class="btn-primary"> Open CMS in New Tab </button><button class="btn-secondary">Close</button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=admin-BLvWh7R8.mjs.map
