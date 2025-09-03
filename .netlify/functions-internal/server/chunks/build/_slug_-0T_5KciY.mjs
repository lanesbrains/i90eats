import { _ as __nuxt_component_0 } from './nuxt-link-Y_eMj_Wd.mjs';
import { unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { u as useRoute } from './server.mjs';
import { u as useHead } from './v3-By6k_887.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = {
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const slug = route.params.slug;
    const blogPosts = {
      "ultimate-guide-seattle-seafood": {
        title: "The Ultimate Guide to Seattle's Best Seafood Spots",
        slug: "ultimate-guide-seattle-seafood",
        author: "Sarah Johnson",
        publishDate: /* @__PURE__ */ new Date("2024-01-15"),
        excerpt: "Discover the freshest seafood restaurants along Seattle's waterfront, from casual oyster bars to upscale dining experiences.",
        tags: ["Seattle", "Seafood", "Waterfront", "Restaurants"]
      },
      "chicago-deep-dish-vs-ny-style": {
        title: "Chicago Deep Dish vs. New York Style: The Great Pizza Debate",
        slug: "chicago-deep-dish-vs-ny-style",
        author: "Mike Chen",
        publishDate: /* @__PURE__ */ new Date("2024-01-10"),
        excerpt: "We settle the age-old question: which pizza style reigns supreme? Join us as we explore both cities' iconic pizza traditions.",
        tags: ["Chicago", "New York", "Pizza", "Food Culture"]
      },
      "hidden-gems-underrated-restaurants-i90": {
        title: "Hidden Gems: Underrated Restaurants Along I-90",
        slug: "hidden-gems-underrated-restaurants-i90",
        author: "Emily Rodriguez",
        publishDate: /* @__PURE__ */ new Date("2024-01-05"),
        excerpt: "Skip the tourist traps and discover the local favorites that only insiders know about along the I-90 corridor.",
        tags: ["Hidden Gems", "Local Favorites", "I-90", "Travel Tips"]
      },
      "seasonal-eating-winter-i90": {
        title: "Seasonal Eating: What's Fresh Along I-90 This Winter",
        slug: "seasonal-eating-winter-i90",
        author: "David Thompson",
        publishDate: /* @__PURE__ */ new Date("2023-12-28"),
        excerpt: "From hearty stews to warming comfort foods, discover the best seasonal dishes being served along Interstate 90 this winter.",
        tags: ["Seasonal", "Winter", "Comfort Food", "Local Ingredients"]
      },
      "farm-to-table-dining-i90": {
        title: "The Rise of Farm-to-Table Dining Along I-90",
        slug: "farm-to-table-dining-i90",
        author: "Lisa Wang",
        publishDate: /* @__PURE__ */ new Date("2023-12-20"),
        excerpt: "How restaurants along the I-90 corridor are embracing local agriculture and sustainable dining practices.",
        tags: ["Farm-to-Table", "Sustainability", "Local Agriculture", "Trends"]
      },
      "weekend-road-trip-seattle-spokane": {
        title: "Weekend Road Trip: Food Stops Between Seattle and Spokane",
        slug: "weekend-road-trip-seattle-spokane",
        author: "Alex Martinez",
        publishDate: /* @__PURE__ */ new Date("2023-12-15"),
        excerpt: "Plan the perfect weekend getaway with our curated list of must-visit restaurants and food stops along the Washington stretch of I-90.",
        tags: ["Road Trip", "Weekend Getaway", "Washington", "Travel Guide"]
      }
    };
    const post = blogPosts[slug] || {
      title: "Blog Post Not Found",
      slug,
      author: "Unknown",
      publishDate: /* @__PURE__ */ new Date(),
      excerpt: "This blog post could not be found.",
      tags: []
    };
    const formatDate = (date) => {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(date);
    };
    useHead({
      title: post.title,
      meta: [{ name: "description", content: post.excerpt }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16"><div class="container-max"><div class="max-w-4xl mx-auto text-center"><h1 class="text-4xl font-bold mb-4">${ssrInterpolate(unref(post).title)}</h1><div class="flex items-center justify-center gap-4 text-primary-100"><span>${ssrInterpolate(formatDate(unref(post).publishDate))}</span><span>\u2022</span><span>${ssrInterpolate(unref(post).author)}</span></div></div></div></section><section class="py-16"><div class="container-max"><div class="max-w-4xl mx-auto"><article class="prose prose-lg max-w-none"><p class="text-xl text-gray-600 mb-8">${ssrInterpolate(unref(post).excerpt)}</p><div class="bg-gray-50 rounded-lg p-8 mb-8"><h2>About This Article</h2><p> This is a sample blog post for the I-90 Eats platform. In a real implementation, this content would be managed through a CMS or markdown files. </p><h3>Key Topics Covered:</h3><ul><!--[-->`);
      ssrRenderList(unref(post).tags, (tag) => {
        _push(`<li>${ssrInterpolate(tag)}</li>`);
      });
      _push(`<!--]--></ul></div><div class="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-6 border border-primary-200"><h3>Subscribe for More Content</h3><p> Get weekly updates on restaurant deals and food news along Interstate 90. </p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/subscribe",
        class: "btn-primary mt-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Subscribe Now`);
          } else {
            return [
              createTextVNode("Subscribe Now")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></article><div class="mt-8 pt-8 border-t border-gray-200"><h3 class="text-lg font-semibold mb-4">Tags</h3><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(unref(post).tags, (tag) => {
        _push(`<span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">${ssrInterpolate(tag)}</span>`);
      });
      _push(`<!--]--></div></div><div class="mt-8 pt-8 border-t border-gray-200">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/blog",
        class: "btn-secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u2190 Back to Blog `);
          } else {
            return [
              createTextVNode(" \u2190 Back to Blog ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-0T_5KciY.mjs.map
