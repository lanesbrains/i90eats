import { _ as __nuxt_component_0 } from './nuxt-link-BkWIATs8.mjs';
import { ref, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
import { u as useI90Locations } from './useI90Locations-CGLnxot8.mjs';
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
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const { allLocations } = useI90Locations();
    const editingInfo = ref(false);
    const savingInfo = ref(false);
    const showAddDeal = ref(false);
    const editingDeal = ref(null);
    const savingDeal = ref(false);
    const stats = ref({
      views: 1247,
      activeDeals: 3,
      clicks: 89
    });
    const currentPlan = ref("Premium");
    const nextBilling = ref("March 15, 2024");
    const restaurantSlug = ref("seattle-seafood-co");
    const restaurantInfo = ref({
      name: "The Seattle Seafood Co.",
      cuisine: "Seafood",
      location: "Seattle, WA",
      address: "123 Pike Place, Seattle, WA 98101",
      phone: "(206) 555-0123",
      website: "https://seattleseafoodco.com",
      description: "Fresh seafood with a view of Puget Sound. Specializing in Pacific Northwest favorites including salmon, dungeness crab, and fresh oysters."
    });
    const deals = ref([
      {
        id: 1,
        title: "Happy Hour Oysters",
        description: "Half price on all oysters Monday-Friday 3-6pm",
        startDate: "2024-01-15",
        endDate: "2024-02-29",
        active: true
      },
      {
        id: 2,
        title: "Weekend Brunch Special",
        description: "Free mimosa with any entree purchase on weekends",
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        active: true
      }
    ]);
    const dealForm = ref({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      active: true
    });
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16"><div class="container-max text-center"><h1 class="text-4xl font-bold mb-4">Business Dashboard</h1><p class="text-xl text-primary-100"> Manage your restaurant listing and deals </p></div></section><section class="py-16"><div class="container-max max-w-6xl mx-auto"><div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"><div class="card p-6 text-center"><div class="text-3xl font-bold text-primary-600 mb-2">${ssrInterpolate(stats.value.views)}</div><div class="text-gray-600">Profile Views</div></div><div class="card p-6 text-center"><div class="text-3xl font-bold text-accent-600 mb-2">${ssrInterpolate(stats.value.activeDeals)}</div><div class="text-gray-600">Active Deals</div></div><div class="card p-6 text-center"><div class="text-3xl font-bold text-secondary-600 mb-2">${ssrInterpolate(stats.value.clicks)}</div><div class="text-gray-600">Phone Clicks</div></div><div class="card p-6 text-center"><div class="text-3xl font-bold text-green-600 mb-2">${ssrInterpolate(currentPlan.value)}</div><div class="text-gray-600">Current Plan</div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2"><div class="card p-6 mb-6"><div class="flex items-center justify-between mb-6"><h2 class="text-xl font-semibold text-gray-900"> Restaurant Information </h2><button class="btn-secondary text-sm">${ssrInterpolate(editingInfo.value ? "Cancel" : "Edit Info")}</button></div>`);
      if (editingInfo.value) {
        _push(`<form class="space-y-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label><input${ssrRenderAttr("value", restaurantInfo.value.name)} type="text" class="input-field" required></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Cuisine Type</label><input${ssrRenderAttr("value", restaurantInfo.value.cuisine)} type="text" class="input-field" required></div></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Location</label><select class="input-field" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(restaurantInfo.value.location) ? ssrLooseContain(restaurantInfo.value.location, "") : ssrLooseEqual(restaurantInfo.value.location, "")) ? " selected" : ""}>Select location</option><!--[-->`);
        ssrRenderList(unref(allLocations), (location) => {
          _push(`<option${ssrRenderAttr("value", location)}${ssrIncludeBooleanAttr(Array.isArray(restaurantInfo.value.location) ? ssrLooseContain(restaurantInfo.value.location, location) : ssrLooseEqual(restaurantInfo.value.location, location)) ? " selected" : ""}>${ssrInterpolate(location)}</option>`);
        });
        _push(`<!--]--></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Address</label><textarea rows="2" class="input-field" required>${ssrInterpolate(restaurantInfo.value.address)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">Phone</label><input${ssrRenderAttr("value", restaurantInfo.value.phone)} type="tel" class="input-field" required></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Website</label><input${ssrRenderAttr("value", restaurantInfo.value.website)} type="url" class="input-field"></div></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Description</label><textarea rows="4" class="input-field" required>${ssrInterpolate(restaurantInfo.value.description)}</textarea></div><div class="flex gap-4"><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(savingInfo.value) ? " disabled" : ""}>${ssrInterpolate(savingInfo.value ? "Saving..." : "Save Changes")}</button><button type="button" class="btn-secondary"> Cancel </button></div></form>`);
      } else {
        _push(`<div class="space-y-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><span class="text-sm text-gray-600">Restaurant Name:</span><div class="font-medium text-gray-900">${ssrInterpolate(restaurantInfo.value.name)}</div></div><div><span class="text-sm text-gray-600">Cuisine:</span><div class="font-medium text-gray-900">${ssrInterpolate(restaurantInfo.value.cuisine)}</div></div></div><div><span class="text-sm text-gray-600">Location:</span><div class="font-medium text-gray-900">${ssrInterpolate(restaurantInfo.value.location)}</div></div><div><span class="text-sm text-gray-600">Address:</span><div class="font-medium text-gray-900">${ssrInterpolate(restaurantInfo.value.address)}</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><span class="text-sm text-gray-600">Phone:</span><div class="font-medium text-gray-900">${ssrInterpolate(restaurantInfo.value.phone)}</div></div><div><span class="text-sm text-gray-600">Website:</span><div class="font-medium text-gray-900">`);
        if (restaurantInfo.value.website) {
          _push(`<a${ssrRenderAttr("href", restaurantInfo.value.website)} target="_blank" class="text-primary-600 hover:text-primary-700">${ssrInterpolate(restaurantInfo.value.website)}</a>`);
        } else {
          _push(`<span class="text-gray-400">Not provided</span>`);
        }
        _push(`</div></div></div><div><span class="text-sm text-gray-600">Description:</span><div class="font-medium text-gray-900">${ssrInterpolate(restaurantInfo.value.description)}</div></div></div>`);
      }
      _push(`</div><div class="card p-6"><div class="flex items-center justify-between mb-6"><h2 class="text-xl font-semibold text-gray-900"> Current Deals </h2><button class="btn-primary text-sm"> Add New Deal </button></div>`);
      if (deals.value.length === 0) {
        _push(`<div class="text-center py-8"><div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path></svg></div><h3 class="text-lg font-semibold text-gray-900 mb-2"> No deals yet </h3><p class="text-gray-600 mb-4"> Create your first deal to attract customers </p><button class="btn-primary"> Create Your First Deal </button></div>`);
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(deals.value, (deal) => {
          _push(`<div class="border border-gray-200 rounded-lg p-4"><div class="flex items-center justify-between mb-2"><h3 class="font-semibold text-gray-900">${ssrInterpolate(deal.title)}</h3><div class="flex items-center gap-2"><span class="${ssrRenderClass([
            deal.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800",
            "text-xs px-2 py-1 rounded-full"
          ])}">${ssrInterpolate(deal.active ? "Active" : "Inactive")}</span><button class="text-primary-600 hover:text-primary-700 text-sm"> Edit </button><button class="text-red-600 hover:text-red-700 text-sm"> Delete </button></div></div><p class="text-gray-600 text-sm mb-2">${ssrInterpolate(deal.description)}</p><div class="text-xs text-gray-500"> Valid: ${ssrInterpolate(formatDate(deal.startDate))} - ${ssrInterpolate(formatDate(deal.endDate))}</div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div><div class="space-y-6"><div class="card p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4"> Subscription </h3><div class="space-y-3"><div><span class="text-sm text-gray-600">Current Plan:</span><div class="font-medium text-gray-900">${ssrInterpolate(currentPlan.value)} Listing </div></div><div><span class="text-sm text-gray-600">Monthly Cost:</span><div class="font-medium text-gray-900"> $${ssrInterpolate(currentPlan.value === "Premium" ? "19.99" : "9.99")}</div></div><div><span class="text-sm text-gray-600">Next Billing:</span><div class="font-medium text-gray-900">${ssrInterpolate(nextBilling.value)}</div></div><div class="pt-3 border-t border-gray-200">`);
      if (currentPlan.value === "Basic") {
        _push(`<button class="btn-accent w-full text-sm"> Upgrade to Premium </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="btn-secondary w-full text-sm mt-2"> Manage Billing </button></div></div></div><div class="card p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4"> Quick Actions </h3><div class="space-y-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/restaurant/${restaurantSlug.value}`,
        class: "btn-secondary w-full text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View Public Listing `);
          } else {
            return [
              createTextVNode(" View Public Listing ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="btn-primary w-full text-sm"> Create New Deal </button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "btn-secondary w-full text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Content Manager `);
          } else {
            return [
              createTextVNode(" Content Manager ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="card p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4"> Need Help? </h3><p class="text-gray-600 text-sm mb-4"> Contact our business support team for assistance with your listing. </p><a href="mailto:business@i90eats.com" class="btn-secondary w-full text-sm"> Contact Support </a></div></div></div></div></section>`);
      if (showAddDeal.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"><div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"><div class="flex items-center justify-between p-6 border-b border-gray-200"><h3 class="text-xl font-semibold text-gray-900">${ssrInterpolate(editingDeal.value ? "Edit Deal" : "Add New Deal")}</h3><button class="text-gray-400 hover:text-gray-600"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><form class="p-6 space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">Deal Title</label><input${ssrRenderAttr("value", dealForm.value.title)} type="text" class="input-field" required placeholder="e.g., Happy Hour Special"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Description</label><textarea rows="3" class="input-field" required placeholder="Describe your deal in detail...">${ssrInterpolate(dealForm.value.description)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label><input${ssrRenderAttr("value", dealForm.value.startDate)} type="date" class="input-field" required></div><div><label class="block text-sm font-medium text-gray-700 mb-2">End Date</label><input${ssrRenderAttr("value", dealForm.value.endDate)} type="date" class="input-field" required></div></div><div class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(dealForm.value.active) ? ssrLooseContain(dealForm.value.active, null) : dealForm.value.active) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"><label class="ml-2 text-sm text-gray-700">Deal is active</label></div><div class="flex gap-4 pt-4"><button type="submit" class="btn-primary flex-1"${ssrIncludeBooleanAttr(savingDeal.value) ? " disabled" : ""}>${ssrInterpolate(savingDeal.value ? "Saving..." : editingDeal.value ? "Update Deal" : "Create Deal")}</button><button type="button" class="btn-secondary flex-1"> Cancel </button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/business/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-CBem0eBn.mjs.map
