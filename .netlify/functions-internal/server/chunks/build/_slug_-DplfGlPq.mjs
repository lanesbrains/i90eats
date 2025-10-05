import _sfc_main$1 from './ContentDoc--wYdZh0u.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-WWwXaGM8.mjs';
import { withAsyncContext, computed, unref, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRoute, c as createError, a as useRuntimeConfig } from './server.mjs';
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
import './ContentRenderer-HtIdpSG3.mjs';
import './ContentRendererMarkdown-C2WjIz9Y.mjs';
import 'property-information';
import './node-yHY0X6Y7.mjs';
import './preview-MyfrdUu7.mjs';
import './ContentQuery-BOjNRqyU.mjs';
import '../_/index.mjs';
import 'vue-router';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = {
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slug = route.params.slug;
    const config = useRuntimeConfig();
    const { data: post } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`blog-${slug}`, async () => {
      try {
        let foundPost = null;
        try {
          const posts = await queryContent("/blog").where({ slug }).find();
          foundPost = posts[0] || null;
        } catch (e) {
          console.log("Method 1 failed:", e);
        }
        if (!foundPost) {
          try {
            const allPosts = await queryContent("/blog").find();
            foundPost = allPosts.find((p) => {
              var _a;
              const filename = (_a = p._path) == null ? void 0 : _a.split("/").pop();
              const filenameWithoutExt = filename == null ? void 0 : filename.replace(/\.md$/, "");
              return filenameWithoutExt === slug;
            });
          } catch (e) {
            console.log("Method 2 failed:", e);
          }
        }
        if (!foundPost) {
          try {
            foundPost = await queryContent(`/blog/${slug}`).findOne();
          } catch (e) {
            console.log("Method 3 failed:", e);
          }
        }
        return foundPost;
      } catch (error) {
        console.error("Error fetching blog post:", error);
        return null;
      }
    })), __temp = await __temp, __restore(), __temp);
    if (!post.value) {
      throw createError({
        statusCode: 404,
        statusMessage: "Blog post not found"
      });
    }
    const currentUrl = computed(() => {
      const baseUrl = config.public.siteUrl || "https://i90eats.com";
      return `${baseUrl}/blog/${slug}`;
    });
    const formatDate = (date) => {
      if (!date) return "No date";
      const dateObj = typeof date === "string" ? new Date(date) : new Date(date);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(dateObj);
    };
    useHead(() => {
      var _a;
      return {
        title: `${post.value.title} | I-90 Eats Blog`,
        meta: [
          { name: "description", content: post.value.excerpt },
          { name: "keywords", content: ((_a = post.value.tags) == null ? void 0 : _a.join(", ")) || "" },
          { name: "author", content: post.value.author },
          // Open Graph
          { property: "og:title", content: post.value.title },
          { property: "og:description", content: post.value.excerpt },
          { property: "og:image", content: post.value.image || `${config.public.siteUrl}/og-image.jpg` },
          { property: "og:url", content: currentUrl.value },
          { property: "og:type", content: "article" },
          // Twitter
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:title", content: post.value.title },
          { name: "twitter:description", content: post.value.excerpt },
          { name: "twitter:image", content: post.value.image || `${config.public.siteUrl}/og-image.jpg` }
        ],
        link: [
          { rel: "canonical", href: currentUrl.value }
        ]
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentDoc = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-0196dc15><section class="${ssrRenderClass([unref(post).image ? "min-h-[60vh]" : "py-16", "relative py-24 text-white overflow-hidden"])}" data-v-0196dc15>`);
      if (unref(post).image) {
        _push(`<div class="absolute inset-0 bg-black/40 z-10" data-v-0196dc15></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(post).image) {
        _push(`<div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="${ssrRenderStyle({ backgroundImage: `url(${unref(post).image})` })}" data-v-0196dc15></div>`);
      } else {
        _push(`<div class="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600" data-v-0196dc15></div>`);
      }
      _push(`<div class="container-max relative z-20" data-v-0196dc15><div class="max-w-4xl mx-auto text-center" data-v-0196dc15><h1 class="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg" data-v-0196dc15>${ssrInterpolate(unref(post).title)}</h1><div class="flex items-center justify-center gap-4 text-white/90 text-lg" data-v-0196dc15><span data-v-0196dc15>${ssrInterpolate(formatDate(unref(post).publishDate))}</span><span data-v-0196dc15>\u2022</span><span data-v-0196dc15>${ssrInterpolate(unref(post).author)}</span>`);
      if (unref(post).readTime) {
        _push(`<span data-v-0196dc15>\u2022</span>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(post).readTime) {
        _push(`<span data-v-0196dc15>${ssrInterpolate(unref(post).readTime)} min read</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></section><section class="py-16" data-v-0196dc15><div class="container-max" data-v-0196dc15><div class="max-w-4xl mx-auto" data-v-0196dc15><article class="prose prose-lg prose-blue max-w-none" data-v-0196dc15><p class="text-xl text-gray-600 mb-8 font-medium leading-relaxed border-l-4 border-primary-500 pl-6 bg-gray-50 py-4 rounded-r-lg" data-v-0196dc15>${ssrInterpolate(unref(post).excerpt)}</p>`);
      if (!unref(post).html) {
        _push(ssrRenderComponent(_component_ContentDoc, {
          path: unref(post)._path,
          class: "blog-content"
        }, null, _parent));
      } else {
        _push(`<div class="blog-content" data-v-0196dc15><p class="text-gray-500 italic" data-v-0196dc15>Content could not be loaded. Please check the blog post file.</p></div>`);
      }
      _push(`<div class="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-6 border border-primary-200 mt-12 not-prose" data-v-0196dc15><div class="flex items-start gap-4" data-v-0196dc15><div class="bg-primary-100 rounded-full p-2 flex-shrink-0" data-v-0196dc15><svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0196dc15><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-0196dc15></path></svg></div><div class="flex-1" data-v-0196dc15><h3 class="text-lg font-semibold text-gray-900 mb-2" data-v-0196dc15>Never Miss a Meal</h3><p class="text-gray-600 mb-4" data-v-0196dc15> Get weekly updates on the best restaurant deals and hidden gems along Interstate 90. </p>`);
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
      _push(`</div></div></div></article>`);
      if (unref(post).tags && unref(post).tags.length) {
        _push(`<div class="mt-12 pt-8 border-t border-gray-200" data-v-0196dc15><h3 class="text-lg font-semibold mb-4 flex items-center gap-2" data-v-0196dc15><svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0196dc15><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" data-v-0196dc15></path></svg> Tags </h3><div class="flex flex-wrap gap-2" data-v-0196dc15><!--[-->`);
        ssrRenderList(unref(post).tags, (tag) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: tag,
            to: `/blog?tag=${encodeURIComponent(tag)}`,
            class: "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 px-3 py-1 rounded-full text-sm transition-colors duration-200"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(tag)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(tag), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(post).authorBio || unref(post).authorImage) {
        _push(`<div class="mt-12 pt-8 border-t border-gray-200" data-v-0196dc15><div class="flex items-start gap-4" data-v-0196dc15>`);
        if (unref(post).authorImage) {
          _push(`<img${ssrRenderAttr("src", unref(post).authorImage)}${ssrRenderAttr("alt", unref(post).author)} class="w-16 h-16 rounded-full object-cover" data-v-0196dc15>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex-1" data-v-0196dc15><h4 class="text-lg font-semibold text-gray-900" data-v-0196dc15>${ssrInterpolate(unref(post).author)}</h4>`);
        if (unref(post).authorBio) {
          _push(`<p class="text-gray-600 mt-1" data-v-0196dc15>${ssrInterpolate(unref(post).authorBio)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center" data-v-0196dc15>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/blog",
        class: "btn-secondary flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0196dc15${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-0196dc15${_scopeId}></path></svg> Back to Blog `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M15 19l-7-7 7-7"
                })
              ])),
              createTextVNode(" Back to Blog ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-2" data-v-0196dc15><span class="text-sm text-gray-500 mr-2" data-v-0196dc15>Share:</span><a${ssrRenderAttr("href", `https://twitter.com/intent/tweet?text=${encodeURIComponent(unref(post).title)}&url=${encodeURIComponent(unref(currentUrl))}`)} target="_blank" rel="noopener noreferrer" class="p-2 text-gray-400 hover:text-blue-500 transition-colors" aria-label="Share on Twitter" data-v-0196dc15><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" data-v-0196dc15><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" data-v-0196dc15></path></svg></a><a${ssrRenderAttr("href", `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(unref(currentUrl))}`)} target="_blank" rel="noopener noreferrer" class="p-2 text-gray-400 hover:text-blue-600 transition-colors" aria-label="Share on Facebook" data-v-0196dc15><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" data-v-0196dc15><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" data-v-0196dc15></path></svg></a></div></div></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0196dc15"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-DplfGlPq.mjs.map
