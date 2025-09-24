import { _ as __nuxt_component_0 } from './nuxt-link-BkWIATs8.mjs';
import { ref, computed, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { marked } from 'marked';
import { _ as _export_sfc } from './server.mjs';
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

const slug = "seattle-seafood-co";
const _sfc_main = {
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const restaurant = ref({
      title: "The Seattle Seafood Co.",
      slug: "seattle-seafood-co",
      location: "Seattle, WA",
      cuisine: "Seafood",
      address: "123 Pike Place, Seattle, WA 98101",
      phone: "(206) 555-0123",
      website: "https://seattleseafood.com",
      description: "The Seattle Seafood Co. has been serving the finest fresh seafood from Puget Sound for over 30 years. Our restaurant offers a casual yet elegant dining experience with stunning waterfront views. We source our ingredients locally and sustainably, ensuring the highest quality seafood for our guests. From our famous Dungeness crab to our daily oyster specials, every dish is prepared with care and attention to detail. Whether you're looking for a romantic dinner for two or a family celebration, our warm atmosphere and exceptional service will make your dining experience memorable.",
      deals: "**Happy Hour Specials (4-6 PM Daily)**\n\n- 50% off all appetizers\n- $2 off draft beers\n- $5 house wines\n\n**Tuesday Oyster Special**\n\n- Fresh oysters: $1 each (regularly $2.50)\n- Minimum order: 6 oysters\n- Available all day\n\n**Weekend Brunch (Saturday & Sunday 10 AM - 2 PM)**\n\n- Bottomless mimosas: $15\n- Kids under 12 eat free with adult entr\xE9e purchase\n- Free coffee with any brunch entr\xE9e\n\n**Lunch Combo (Monday-Friday 11 AM - 3 PM)**\n\n- Any entr\xE9e + soup or salad + drink: $24.99\n- Valid for dine-in only",
      premium: true,
      image: null,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    });
    const formattedDeals = computed(() => {
      var _a;
      if (!((_a = restaurant.value) == null ? void 0 : _a.deals)) return "";
      return marked(restaurant.value.deals);
    });
    if (!restaurant.value) {
      console.error("Restaurant not found:", slug);
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-78b3db25><section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16" data-v-78b3db25><div class="container-max" data-v-78b3db25><div class="flex flex-col lg:flex-row items-center gap-8" data-v-78b3db25><div class="w-full lg:w-96 h-64 lg:h-96 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm" data-v-78b3db25>`);
      if ((_a = restaurant.value) == null ? void 0 : _a.image) {
        _push(`<img${ssrRenderAttr("src", restaurant.value.image)}${ssrRenderAttr("alt", (_b = restaurant.value) == null ? void 0 : _b.title)} class="w-full h-full object-cover" data-v-78b3db25>`);
      } else {
        _push(`<div class="w-full h-full bg-gradient-to-br from-primary-100/20 to-accent-100/20 flex items-center justify-center" data-v-78b3db25><svg class="w-24 h-24 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-78b3db25><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" data-v-78b3db25></path></svg></div>`);
      }
      _push(`</div><div class="flex-1 text-center lg:text-left" data-v-78b3db25><div class="flex items-center justify-center lg:justify-start gap-3 mb-4" data-v-78b3db25><h1 class="text-4xl font-bold" data-v-78b3db25>${ssrInterpolate((_c = restaurant.value) == null ? void 0 : _c.title)}</h1>`);
      if ((_d = restaurant.value) == null ? void 0 : _d.premium) {
        _push(`<span class="bg-accent-500 text-white text-sm px-3 py-1 rounded-full font-medium" data-v-78b3db25> Premium </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-xl text-primary-100 mb-4" data-v-78b3db25>${ssrInterpolate((_e = restaurant.value) == null ? void 0 : _e.location)}</p><p class="text-lg text-primary-100 mb-6" data-v-78b3db25>${ssrInterpolate((_f = restaurant.value) == null ? void 0 : _f.cuisine)}</p><div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" data-v-78b3db25>`);
      if ((_g = restaurant.value) == null ? void 0 : _g.phone) {
        _push(`<a${ssrRenderAttr("href", `tel:${restaurant.value.phone}`)} class="btn-accent inline-flex items-center justify-center gap-2" data-v-78b3db25><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-78b3db25><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" data-v-78b3db25></path></svg> Call Restaurant </a>`);
      } else {
        _push(`<!---->`);
      }
      if ((_h = restaurant.value) == null ? void 0 : _h.website) {
        _push(`<a${ssrRenderAttr("href", restaurant.value.website)} target="_blank" rel="noopener noreferrer" class="btn-secondary inline-flex items-center justify-center gap-2" data-v-78b3db25><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-78b3db25><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-78b3db25></path></svg> Visit Website </a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></section><section class="py-16 bg-white" data-v-78b3db25><div class="container-max" data-v-78b3db25><div class="text-center mb-12" data-v-78b3db25><h2 class="text-3xl font-bold text-gray-900 mb-4" data-v-78b3db25>Current Deals &amp; Specials</h2><p class="text-xl text-gray-600" data-v-78b3db25>Don&#39;t miss these amazing offers!</p></div>`);
      if ((_i = restaurant.value) == null ? void 0 : _i.deals) {
        _push(`<div class="max-w-4xl mx-auto" data-v-78b3db25><div class="bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl p-8 border border-accent-200" data-v-78b3db25><div class="prose prose-lg max-w-none" data-v-78b3db25><div data-v-78b3db25>${(_j = formattedDeals.value) != null ? _j : ""}</div></div><div class="mt-8 pt-6 border-t border-accent-200" data-v-78b3db25><p class="text-sm text-gray-600 text-center" data-v-78b3db25> Deals are updated regularly. Call the restaurant to confirm availability. </p></div></div></div>`);
      } else {
        _push(`<div class="text-center py-12" data-v-78b3db25><div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4" data-v-78b3db25><svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-78b3db25><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" data-v-78b3db25></path></svg></div><h3 class="text-xl font-semibold text-gray-900 mb-2" data-v-78b3db25>No Current Deals</h3><p class="text-gray-600" data-v-78b3db25>Check back soon for new offers from this restaurant!</p></div>`);
      }
      _push(`</div></section><section class="py-16 bg-gray-50" data-v-78b3db25><div class="container-max" data-v-78b3db25><div class="grid grid-cols-1 lg:grid-cols-2 gap-12" data-v-78b3db25><div data-v-78b3db25><h3 class="text-2xl font-bold text-gray-900 mb-6" data-v-78b3db25>About ${ssrInterpolate((_k = restaurant.value) == null ? void 0 : _k.title)}</h3><div class="prose prose-gray max-w-none" data-v-78b3db25><p class="text-gray-700 leading-relaxed" data-v-78b3db25>${ssrInterpolate((_l = restaurant.value) == null ? void 0 : _l.description)}</p></div></div><div data-v-78b3db25><h3 class="text-2xl font-bold text-gray-900 mb-6" data-v-78b3db25>Contact &amp; Location</h3><div class="space-y-4" data-v-78b3db25><div class="flex items-start gap-3" data-v-78b3db25><div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1" data-v-78b3db25><svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-78b3db25><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-v-78b3db25></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-78b3db25></path></svg></div><div data-v-78b3db25><p class="font-medium text-gray-900" data-v-78b3db25>Address</p><p class="text-gray-600" data-v-78b3db25>${ssrInterpolate((_m = restaurant.value) == null ? void 0 : _m.address)}</p></div></div><div class="flex items-start gap-3" data-v-78b3db25><div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1" data-v-78b3db25><svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-78b3db25><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" data-v-78b3db25></path></svg></div><div data-v-78b3db25><p class="font-medium text-gray-900" data-v-78b3db25>Phone</p>`);
      if ((_n = restaurant.value) == null ? void 0 : _n.phone) {
        _push(`<a${ssrRenderAttr("href", `tel:${restaurant.value.phone}`)} class="text-primary-600 hover:text-primary-700 font-medium" data-v-78b3db25>${ssrInterpolate(restaurant.value.phone)}</a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if ((_o = restaurant.value) == null ? void 0 : _o.website) {
        _push(`<div class="flex items-start gap-3" data-v-78b3db25><div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1" data-v-78b3db25><svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-78b3db25><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-78b3db25></path></svg></div><div data-v-78b3db25><p class="font-medium text-gray-900" data-v-78b3db25>Website</p><a${ssrRenderAttr("href", restaurant.value.website)} target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-700 font-medium" data-v-78b3db25> Visit Website </a></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mt-8 p-4 bg-gray-100 rounded-lg text-center" data-v-78b3db25><svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-78b3db25><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" data-v-78b3db25></path></svg><p class="text-sm text-gray-600" data-v-78b3db25>Interactive map coming soon</p></div></div></div></div></section><section class="py-16 bg-primary-600 text-white" data-v-78b3db25><div class="container-max text-center" data-v-78b3db25><h2 class="text-3xl font-bold mb-4" data-v-78b3db25>Get More Deals Like This</h2><p class="text-xl text-primary-100 mb-8" data-v-78b3db25> Subscribe to our newsletter and discover amazing restaurant deals along I-90 every week </p><div class="flex flex-col sm:flex-row gap-4 justify-center" data-v-78b3db25>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/subscribe",
        class: "btn-accent text-lg px-8 py-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Subscribe to Newsletter `);
          } else {
            return [
              createTextVNode(" Subscribe to Newsletter ")
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
            _push2(` Browse More Restaurants `);
          } else {
            return [
              createTextVNode(" Browse More Restaurants ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/restaurant/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-78b3db25"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-BYktNYNU.mjs.map
