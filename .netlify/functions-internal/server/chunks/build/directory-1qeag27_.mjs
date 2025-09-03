import { _ as __nuxt_component_0 } from './nuxt-link-Y_eMj_Wd.mjs';
import { ref, computed, unref, withCtx, createTextVNode, readonly, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useI90Locations } from './useI90Locations-CGLnxot8.mjs';
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

const useSubscription = () => {
  const isSubscribed = ref(false);
  const subscriptionStatus = ref("inactive");
  const subscriptionPlan = ref(null);
  const checkSubscription = async () => {
    try {
      const localStatus = localStorage.getItem("subscription_status");
      const localPlan = localStorage.getItem("subscription_plan");
      if (localStatus === "active") {
        isSubscribed.value = true;
        subscriptionStatus.value = "active";
        subscriptionPlan.value = localPlan;
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
      isSubscribed.value = false;
      subscriptionStatus.value = "inactive";
    }
  };
  const setSubscriptionActive = (plan) => {
    isSubscribed.value = true;
    subscriptionStatus.value = "active";
    subscriptionPlan.value = plan;
    localStorage.setItem("subscription_status", "active");
    localStorage.setItem("subscription_plan", plan);
  };
  const clearSubscription = () => {
    isSubscribed.value = false;
    subscriptionStatus.value = "inactive";
    subscriptionPlan.value = null;
    localStorage.removeItem("subscription_status");
    localStorage.removeItem("subscription_plan");
  };
  return {
    isSubscribed: readonly(isSubscribed),
    subscriptionStatus: readonly(subscriptionStatus),
    subscriptionPlan: readonly(subscriptionPlan),
    checkSubscription,
    setSubscriptionActive,
    clearSubscription
  };
};
const _sfc_main = {
  __name: "directory",
  __ssrInlineRender: true,
  setup(__props) {
    const { isSubscribed } = useSubscription();
    const { allLocations } = useI90Locations();
    const restaurants = [
      {
        title: "The Seattle Seafood Co.",
        slug: "seattle-seafood-co",
        location: "Seattle, WA",
        cuisine: "Seafood",
        address: "123 Pike Place, Seattle, WA 98101",
        phone: "(206) 555-0123",
        description: "Fresh seafood with a view of Puget Sound",
        premium: true,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      },
      {
        title: "Spokane Steakhouse",
        slug: "spokane-steakhouse",
        location: "Spokane, WA",
        cuisine: "Steakhouse",
        address: "456 Main St, Spokane, WA 99201",
        phone: "(509) 555-0456",
        description: "Premium steaks and fine dining",
        premium: false,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      },
      {
        title: "Missoula Montana Grill",
        slug: "missoula-montana-grill",
        location: "Missoula, MT",
        cuisine: "American",
        address: "789 Higgins Ave, Missoula, MT 59801",
        phone: "(406) 555-0789",
        description: "Classic American comfort food",
        premium: false,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      },
      {
        title: "Chicago Deep Dish Delight",
        slug: "chicago-deep-dish-delight",
        location: "Chicago, IL",
        cuisine: "Pizza",
        address: "456 Michigan Ave, Chicago, IL 60601",
        phone: "(312) 555-0456",
        description: "Authentic Chicago-style deep dish pizza",
        premium: false,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      },
      {
        title: "Boston Bistro",
        slug: "boston-bistro",
        location: "Boston, MA",
        cuisine: "American",
        address: "789 Newbury St, Boston, MA 02116",
        phone: "(617) 555-0789",
        description: "Classic New England cuisine with a modern twist",
        premium: true,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      }
    ];
    const searchQuery = ref("");
    const selectedLocation = ref("");
    const selectedCuisine = ref("");
    const showDealsModal = ref(false);
    const selectedRestaurant = ref(null);
    const availableCuisines = computed(() => {
      const cuisines = [...new Set(restaurants.map((r) => r.cuisine))];
      return cuisines.sort();
    });
    const filteredRestaurants = computed(() => {
      return restaurants.filter((restaurant) => {
        const matchesSearch = !searchQuery.value || restaurant.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || restaurant.description.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesLocation = !selectedLocation.value || restaurant.location === selectedLocation.value;
        const matchesCuisine = !selectedCuisine.value || restaurant.cuisine === selectedCuisine.value;
        return matchesSearch && matchesLocation && matchesCuisine;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16"><div class="container-max text-center"><h1 class="text-4xl font-bold mb-4">Restaurant Directory</h1><p class="text-xl text-primary-100"> Discover amazing restaurants along Interstate 90 </p></div></section><section class="bg-white py-8 border-b border-gray-200"><div class="container-max"><div class="flex flex-col lg:flex-row gap-6"><div class="flex-1"><div class="relative"><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search restaurants..." class="input-field pl-10"><svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div></div><div class="lg:w-64"><select class="input-field"><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedLocation.value) ? ssrLooseContain(selectedLocation.value, "") : ssrLooseEqual(selectedLocation.value, "")) ? " selected" : ""}>All Locations</option><!--[-->`);
      ssrRenderList(unref(allLocations), (location) => {
        _push(`<option${ssrRenderAttr("value", location)}${ssrIncludeBooleanAttr(Array.isArray(selectedLocation.value) ? ssrLooseContain(selectedLocation.value, location) : ssrLooseEqual(selectedLocation.value, location)) ? " selected" : ""}>${ssrInterpolate(location)}</option>`);
      });
      _push(`<!--]--></select></div><div class="lg:w-64"><select class="input-field"><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedCuisine.value) ? ssrLooseContain(selectedCuisine.value, "") : ssrLooseEqual(selectedCuisine.value, "")) ? " selected" : ""}>All Cuisines</option><!--[-->`);
      ssrRenderList(availableCuisines.value, (cuisine) => {
        _push(`<option${ssrRenderAttr("value", cuisine)}${ssrIncludeBooleanAttr(Array.isArray(selectedCuisine.value) ? ssrLooseContain(selectedCuisine.value, cuisine) : ssrLooseEqual(selectedCuisine.value, cuisine)) ? " selected" : ""}>${ssrInterpolate(cuisine)}</option>`);
      });
      _push(`<!--]--></select></div><button class="btn-secondary whitespace-nowrap"> Clear Filters </button></div></div></section><section class="bg-gray-50 py-4"><div class="container-max"><div class="flex flex-col sm:flex-row justify-between items-center"><p class="text-gray-600"> Showing ${ssrInterpolate(filteredRestaurants.value.length)} of ${ssrInterpolate(restaurants.length)} restaurants </p>`);
      if (selectedLocation.value || selectedCuisine.value) {
        _push(`<div class="flex items-center gap-2 mt-2 sm:mt-0"><span class="text-sm text-gray-500">Active filters:</span>`);
        if (selectedLocation.value) {
          _push(`<span class="bg-primary-100 text-primary-800 text-sm px-2 py-1 rounded-full">${ssrInterpolate(selectedLocation.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (selectedCuisine.value) {
          _push(`<span class="bg-accent-100 text-accent-800 text-sm px-2 py-1 rounded-full">${ssrInterpolate(selectedCuisine.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section><section class="py-12"><div class="container-max">`);
      if (filteredRestaurants.value.length === 0) {
        _push(`<div class="text-center py-16"><div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div><h3 class="text-xl font-semibold text-gray-900 mb-2"> No restaurants found </h3><p class="text-gray-600 mb-4"> Try adjusting your search terms or filters to find more restaurants. </p><button class="btn-primary"> Clear All Filters </button></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList(filteredRestaurants.value, (restaurant) => {
          _push(`<div class="card hover:shadow-xl transition-shadow duration-300"><div class="aspect-w-16 aspect-h-9 bg-gray-200">`);
          if (restaurant.image) {
            _push(`<img${ssrRenderAttr("src", restaurant.image)}${ssrRenderAttr("alt", restaurant.title)} class="w-full h-full object-cover">`);
          } else {
            _push(`<div class="w-full h-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center"><svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></div>`);
          }
          _push(`</div><div class="p-6"><div class="flex items-center justify-between mb-2"><h3 class="text-lg font-semibold text-gray-900">${ssrInterpolate(restaurant.title)}</h3>`);
          if (restaurant.premium) {
            _push(`<span class="bg-accent-100 text-accent-800 text-xs px-2 py-1 rounded-full font-medium"> Premium </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><p class="text-gray-600 mb-2">${ssrInterpolate(restaurant.location)}</p><p class="text-gray-500 text-sm mb-4">${ssrInterpolate(restaurant.cuisine)}</p>`);
          if (!unref(isSubscribed)) {
            _push(`<div class="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-4 mb-4 border border-primary-200"><div class="text-center"><div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3"><svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path></svg></div><h4 class="font-semibold text-gray-900 mb-2"> Exclusive Deals Available </h4><p class="text-sm text-gray-600 mb-3"> Subscribe to unlock current deals and specials from this restaurant </p><button class="btn-primary text-sm px-4 py-2"> View Deals - $2.99/month </button></div></div>`);
          } else {
            _push(`<div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4 border border-green-200"><div class="text-center"><div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div><h4 class="font-semibold text-gray-900 mb-2"> Current Deals </h4><div class="text-left space-y-2"><div class="bg-white rounded p-3 border border-green-200"><h5 class="font-medium text-gray-900"> Happy Hour Special </h5><p class="text-sm text-gray-600"> 20% off appetizers Mon-Fri 3-6pm </p><p class="text-xs text-green-600 font-medium"> Valid until Feb 29, 2024 </p></div><div class="bg-white rounded p-3 border border-green-200"><h5 class="font-medium text-gray-900">Weekend Brunch</h5><p class="text-sm text-gray-600"> Free mimosa with entree purchase </p><p class="text-xs text-green-600 font-medium"> Saturdays &amp; Sundays </p></div></div></div></div>`);
          }
          _push(`<div class="flex items-center justify-between">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/restaurant/${restaurant.slug}`,
            class: "btn-secondary flex-1 text-center"
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
          if (restaurant.phone) {
            _push(`<a${ssrRenderAttr("href", `tel:${restaurant.phone}`)} class="ml-2 p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors" title="Call restaurant"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></section><section class="bg-primary-600 text-white py-16"><div class="container-max text-center"><h2 class="text-3xl font-bold mb-4">Get Weekly Newsletter</h2><p class="text-xl text-primary-100 mb-8"> Subscribe to our newsletter for food news, travel tips, and I-90 insights </p>`);
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
      _push(`</div></section>`);
      if (showDealsModal.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"><div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"><div class="flex items-center justify-between p-6 border-b border-gray-200"><h3 class="text-xl font-semibold text-gray-900"> Deals from ${ssrInterpolate((_a = selectedRestaurant.value) == null ? void 0 : _a.title)}</h3><button class="text-gray-400 hover:text-gray-600"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="p-6"><div class="text-center mb-6"><div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></div><h4 class="text-lg font-semibold text-gray-900 mb-2"> Deals are Locked </h4><p class="text-gray-600 mb-4"> Subscribe to our newsletter to unlock exclusive deals and specials from this restaurant </p></div><div class="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-4 mb-6"><h5 class="font-semibold text-gray-900 mb-2">What you&#39;ll get:</h5><ul class="text-sm text-gray-700 space-y-1"><li>\u2022 Current deals and specials</li><li>\u2022 Happy hour information</li><li>\u2022 Seasonal promotions</li><li>\u2022 Exclusive subscriber-only offers</li></ul></div><div class="flex gap-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/subscribe",
          class: "btn-primary flex-1 text-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Subscribe Now `);
            } else {
              return [
                createTextVNode(" Subscribe Now ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="btn-secondary flex-1"> Maybe Later </button></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/directory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=directory-1qeag27_.mjs.map
