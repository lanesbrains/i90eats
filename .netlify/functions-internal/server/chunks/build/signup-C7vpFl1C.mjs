import { ref, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useI90Locations } from './useI90Locations-CGLnxot8.mjs';

const _sfc_main = {
  __name: "signup",
  __ssrInlineRender: true,
  setup(__props) {
    const { allLocations } = useI90Locations();
    const selectedPlan = ref("premium");
    const isSubmitting = ref(false);
    const form = ref({
      restaurantName: "",
      ownerEmail: "",
      location: "",
      address: "",
      phone: "",
      cuisine: "",
      website: "",
      description: "",
      acceptTerms: false
    });
    const isFormValid = computed(() => {
      return form.value.restaurantName && form.value.ownerEmail && form.value.location && form.value.address && form.value.phone && form.value.cuisine && form.value.description && form.value.acceptTerms && selectedPlan.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16"><div class="container-max text-center"><h1 class="text-4xl font-bold mb-4">List Your Restaurant</h1><p class="text-xl text-primary-100"> Join I-90&#39;s premier restaurant directory and reach hungry travelers </p></div></section><section class="py-16"><div class="container-max max-w-4xl mx-auto"><div class="card p-8"><div class="text-center mb-8"><h2 class="text-2xl font-bold text-gray-900 mb-2"> Choose Your Plan </h2><p class="text-gray-600"> Select the plan that works best for your restaurant </p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"><div class="${ssrRenderClass([{
        "border-primary-500 bg-primary-50": selectedPlan.value === "basic"
      }, "border-2 border-gray-200 rounded-xl p-6"])}"><div class="text-center mb-4"><h3 class="text-xl font-bold text-gray-900">Basic Listing</h3><div class="text-3xl font-bold text-primary-600 mt-2"> $9.99 </div><div class="text-gray-600">per month</div></div><ul class="space-y-2 mb-6"><li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Restaurant listing in directory </li><li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Contact information display </li><li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Basic deal posting </li></ul><button class="${ssrRenderClass([
        selectedPlan.value === "basic" ? "bg-primary-600 text-white border-primary-600" : "border-gray-300 text-gray-700 hover:border-primary-300",
        "w-full py-2 px-4 rounded-lg border-2 transition-colors"
      ])}"> Select Basic </button></div><div class="${ssrRenderClass([{ "bg-accent-50": selectedPlan.value === "premium" }, "border-2 border-accent-500 rounded-xl p-6 relative"])}"><div class="absolute -top-3 left-1/2 transform -translate-x-1/2"><span class="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">Popular</span></div><div class="text-center mb-4"><h3 class="text-xl font-bold text-gray-900">Premium Listing</h3><div class="text-3xl font-bold text-accent-600 mt-2"> $19.99 </div><div class="text-gray-600">per month</div></div><ul class="space-y-2 mb-6"><li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Everything in Basic </li><li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Premium badge &amp; priority placement </li><li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Featured in newsletters </li><li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Photo gallery &amp; detailed description </li><li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Analytics dashboard </li></ul><button class="${ssrRenderClass([
        selectedPlan.value === "premium" ? "bg-accent-600 text-white border-accent-600" : "border-accent-300 text-accent-700 hover:border-accent-400",
        "w-full py-2 px-4 rounded-lg border-2 transition-colors"
      ])}"> Select Premium </button></div></div><form class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label for="restaurantName" class="block text-sm font-medium text-gray-700 mb-2"> Restaurant Name * </label><input id="restaurantName"${ssrRenderAttr("value", form.value.restaurantName)} type="text" required class="input-field" placeholder="Your Restaurant Name"></div><div><label for="ownerEmail" class="block text-sm font-medium text-gray-700 mb-2"> Owner Email * </label><input id="ownerEmail"${ssrRenderAttr("value", form.value.ownerEmail)} type="email" required class="input-field" placeholder="owner@restaurant.com"></div></div><div><label for="location" class="block text-sm font-medium text-gray-700 mb-2"> Location * </label><select id="location" required class="input-field"><option value=""${ssrIncludeBooleanAttr(Array.isArray(form.value.location) ? ssrLooseContain(form.value.location, "") : ssrLooseEqual(form.value.location, "")) ? " selected" : ""}>Select your I-90 location</option><!--[-->`);
      ssrRenderList(unref(allLocations), (location) => {
        _push(`<option${ssrRenderAttr("value", location)}${ssrIncludeBooleanAttr(Array.isArray(form.value.location) ? ssrLooseContain(form.value.location, location) : ssrLooseEqual(form.value.location, location)) ? " selected" : ""}>${ssrInterpolate(location)}</option>`);
      });
      _push(`<!--]--></select></div><div><label for="address" class="block text-sm font-medium text-gray-700 mb-2"> Full Address * </label><textarea id="address" required rows="2" class="input-field" placeholder="123 Main Street, City, State ZIP">${ssrInterpolate(form.value.address)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label for="phone" class="block text-sm font-medium text-gray-700 mb-2"> Phone Number * </label><input id="phone"${ssrRenderAttr("value", form.value.phone)} type="tel" required class="input-field" placeholder="(555) 123-4567"></div><div><label for="cuisine" class="block text-sm font-medium text-gray-700 mb-2"> Cuisine Type * </label><input id="cuisine"${ssrRenderAttr("value", form.value.cuisine)} type="text" required class="input-field" placeholder="American, Italian, Mexican, etc."></div></div><div><label for="website" class="block text-sm font-medium text-gray-700 mb-2"> Website (Optional) </label><input id="website"${ssrRenderAttr("value", form.value.website)} type="url" class="input-field" placeholder="https://yourrestaurant.com"></div><div><label for="description" class="block text-sm font-medium text-gray-700 mb-2"> Restaurant Description * </label><textarea id="description" required rows="4" class="input-field" placeholder="Tell customers about your restaurant, specialties, atmosphere, etc.">${ssrInterpolate(form.value.description)}</textarea></div><div><label class="flex items-start"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(form.value.acceptTerms) ? ssrLooseContain(form.value.acceptTerms, null) : form.value.acceptTerms) ? " checked" : ""} required class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-1"><span class="ml-3 text-sm text-gray-700"> I agree to the <a href="#" class="text-primary-600 hover:text-primary-700 underline">Terms of Service</a> and <a href="#" class="text-primary-600 hover:text-primary-700 underline">Business Agreement</a>. I understand billing will begin immediately. </span></label></div><div class="pt-4"><button type="submit"${ssrIncludeBooleanAttr(!isFormValid.value || isSubmitting.value) ? " disabled" : ""} class="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed">`);
      if (isSubmitting.value) {
        _push(`<span class="flex items-center justify-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing... </span>`);
      } else {
        _push(`<span> Sign Up - $${ssrInterpolate(selectedPlan.value === "premium" ? "19.99" : "9.99")}/month </span>`);
      }
      _push(`</button></div></form></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/business/signup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=signup-C7vpFl1C.mjs.map
