import { _ as __nuxt_component_0 } from './nuxt-link-Y_eMj_Wd.mjs';
import { ref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
import './server.mjs';
import 'vue-router';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const featuredRestaurants = ref([
      {
        title: "The Seattle Seafood Co.",
        slug: "seattle-seafood-co",
        location: "Seattle, WA",
        cuisine: "Seafood"
      },
      {
        title: "Chicago Deep Dish Delight",
        slug: "chicago-deep-dish-delight",
        location: "Chicago, IL",
        cuisine: "Pizza"
      },
      {
        title: "Boston Bistro",
        slug: "boston-bistro",
        location: "Boston, MA",
        cuisine: "American"
      }
    ]);
    const latestPosts = ref([
      {
        title: "The Ultimate Guide to Seattle's Best Seafood Spots",
        slug: "ultimate-guide-seattle-seafood",
        publishDate: /* @__PURE__ */ new Date("2024-01-15"),
        excerpt: "Discover the freshest seafood restaurants along Seattle's waterfront, from casual oyster bars to upscale dining experiences."
      },
      {
        title: "Chicago Deep Dish vs. New York Style: The Great Pizza Debate",
        slug: "chicago-deep-dish-vs-ny-style",
        publishDate: /* @__PURE__ */ new Date("2024-01-10"),
        excerpt: "We settle the age-old question: which pizza style reigns supreme? Join us as we explore both cities' iconic pizza traditions."
      }
    ]);
    const formatDate = (date) => {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(date);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-20"><div class="container-max text-center"><h1 class="text-5xl font-bold mb-6">I-90 Restaurant Deals</h1><p class="text-xl text-primary-100 mb-8 max-w-3xl mx-auto"> Discover exclusive restaurant deals along Interstate 90 from Seattle to Boston. Get weekly newsletters with local dining specials and save money on great food. </p><div class="flex flex-col sm:flex-row gap-4 justify-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/subscribe",
        class: "btn-accent text-lg px-8 py-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Subscribe Now - $2.99/month `);
          } else {
            return [
              createTextVNode(" Subscribe Now - $2.99/month ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/directory",
        class: "btn-secondary text-lg px-8 py-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Browse Restaurants `);
          } else {
            return [
              createTextVNode(" Browse Restaurants ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section class="py-16 bg-white"><div class="container-max"><div class="text-center mb-12"><h2 class="text-3xl font-bold text-gray-900 mb-4"> Why Choose I-90 Restaurant Deals? </h2><p class="text-xl text-gray-600 max-w-2xl mx-auto"> We curate the best restaurant deals along the entire I-90 corridor </p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><div class="text-center"><div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path></svg></div><h3 class="text-xl font-semibold text-gray-900 mb-2">Save Money</h3><p class="text-gray-600"> Get exclusive deals and discounts at restaurants along your I-90 route </p></div><div class="text-center"><div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div><h3 class="text-xl font-semibold text-gray-900 mb-2"> Discover Places </h3><p class="text-gray-600"> Find hidden gems and local favorites you might have missed </p></div><div class="text-center"><div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div><h3 class="text-xl font-semibold text-gray-900 mb-2"> Weekly Updates </h3><p class="text-gray-600"> Fresh deals delivered to your inbox every Friday </p></div></div></div></section><section class="py-16 bg-gray-50"><div class="container-max"><div class="text-center mb-12"><h2 class="text-3xl font-bold text-gray-900 mb-4"> Featured Restaurants </h2><p class="text-xl text-gray-600"> Popular spots along the I-90 corridor </p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><!--[-->`);
      ssrRenderList(featuredRestaurants.value, (restaurant) => {
        _push(`<div class="card"><div class="aspect-w-16 aspect-h-9 bg-gray-200"><div class="w-full h-48 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center"><svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></div></div><div class="p-6"><h3 class="text-lg font-semibold text-gray-900 mb-2">${ssrInterpolate(restaurant.title)}</h3><p class="text-gray-600 mb-2">${ssrInterpolate(restaurant.location)}</p><p class="text-gray-500 text-sm mb-4">${ssrInterpolate(restaurant.cuisine)}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/restaurant/${restaurant.slug}`,
          class: "btn-primary text-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` View Details `);
            } else {
              return [
                createTextVNode(" View Details ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div><div class="text-center mt-8">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/directory",
        class: "btn-secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View All Restaurants `);
          } else {
            return [
              createTextVNode(" View All Restaurants ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section class="py-16 bg-white"><div class="container-max"><div class="text-center mb-12"><h2 class="text-3xl font-bold text-gray-900 mb-4"> Latest from Our Blog </h2><p class="text-xl text-gray-600"> Food news, travel tips, and I-90 insights </p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8"><!--[-->`);
      ssrRenderList(latestPosts.value, (post) => {
        _push(`<article class="card"><div class="aspect-w-16 aspect-h-9 bg-gray-200"><div class="w-full h-48 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center"><svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg></div></div><div class="p-6"><div class="text-sm text-gray-500 mb-2">${ssrInterpolate(formatDate(post.publishDate))}</div><h3 class="text-lg font-semibold text-gray-900 mb-3">${ssrInterpolate(post.title)}</h3><p class="text-gray-600 mb-4">${ssrInterpolate(post.excerpt)}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/blog/${post.slug}`,
          class: "text-primary-600 hover:text-primary-700 font-medium"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Read More \u2192 `);
            } else {
              return [
                createTextVNode(" Read More \u2192 ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></article>`);
      });
      _push(`<!--]--></div><div class="text-center mt-8">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/blog",
        class: "btn-secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View All Posts `);
          } else {
            return [
              createTextVNode(" View All Posts ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section class="bg-primary-600 text-white py-16"><div class="container-max text-center"><h2 class="text-3xl font-bold mb-4">Ready to Start Saving?</h2><p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto"> Join hundreds of travelers who are already saving money on great food along I-90 </p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/subscribe",
        class: "btn-accent text-lg px-8 py-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Subscribe Now - $2.99/month `);
          } else {
            return [
              createTextVNode(" Subscribe Now - $2.99/month ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Cfcl8Wfd.mjs.map
