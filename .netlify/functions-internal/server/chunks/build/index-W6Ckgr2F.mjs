import { _ as __nuxt_component_0 } from './nuxt-link-WWwXaGM8.mjs';
import { withAsyncContext, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useRoute } from './server.mjs';
import { u as useAsyncData, q as queryContent } from './query-DkcKZgg4.mjs';
import { u as useHead } from './v3-fsiqg9oK.mjs';
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
import 'vue-router';
import 'perfect-debounce';
import '../_/index.mjs';
import './preview-MyfrdUu7.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useRoute();
    const { data: blogPosts } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("blog-posts", async () => {
      const posts = await queryContent("/blog").where({ published: true }).sort({ publishDate: -1 }).find();
      return posts;
    })), __temp = await __temp, __restore(), __temp);
    const formatDate = (date) => {
      const dateObj = typeof date === "string" ? new Date(date) : new Date(date);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(dateObj);
    };
    const getPostSlug = (post) => {
      var _a;
      if (post.slug)
        return post.slug;
      return ((_a = post._path) == null ? void 0 : _a.split("/").pop()) || "";
    };
    useHead({
      title: "I-90 Food Blog",
      meta: [
        { name: "description", content: "Food news, travel tips, and insights from along Interstate 90. Discover the best restaurants and dining experiences along the I-90 corridor." },
        { name: "keywords", content: "I-90 food blog, interstate 90 restaurants, travel food tips, road trip dining, food news" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16"><div class="container-max text-center"><h1 class="text-4xl font-bold mb-4">I-90 Food Blog</h1><p class="text-xl text-primary-100"> Food news, travel tips, and insights from along Interstate 90 </p></div></section><section class="py-16"><div class="container-max"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
      ssrRenderList(unref(blogPosts), (post) => {
        _push(`<article class="card hover:shadow-xl transition-shadow duration-300"><div class="aspect-w-16 aspect-h-9 bg-gray-200">`);
        if (post.image) {
          _push(`<img${ssrRenderAttr("src", post.image)}${ssrRenderAttr("alt", post.title)} class="w-full h-full object-cover">`);
        } else {
          _push(`<div class="w-full h-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center"><svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg></div>`);
        }
        _push(`</div><div class="p-6"><div class="flex items-center gap-2 mb-3"><span class="text-sm text-gray-500">${ssrInterpolate(formatDate(post.publishDate))}</span><span class="text-sm text-gray-400">\u2022</span><span class="text-sm text-gray-500">${ssrInterpolate(post.author)}</span></div><h2 class="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">${ssrInterpolate(post.title)}</h2><p class="text-gray-600 mb-4 line-clamp-3">${ssrInterpolate(post.excerpt)}</p><div class="flex items-center justify-between"><div class="flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(post.tags.slice(0, 3), (tag) => {
          _push(`<span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/blog/${getPostSlug(post)}`,
          class: "text-primary-600 hover:text-primary-700 font-medium text-sm",
          onClick: ($event) => _ctx.handleNavigation(`/blog/${getPostSlug(post)}`)
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
        _push(`</div></div></article>`);
      });
      _push(`<!--]--></div><div class="mt-16 text-center"><div class="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 border border-primary-200"><h2 class="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h2><p class="text-gray-600 mb-6"> Subscribe to our newsletter for the latest food news and travel tips along I-90 </p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/subscribe",
        class: "btn-primary"
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
      _push(`</div></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-W6Ckgr2F.mjs.map
