import { ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main = {
  __name: "test-form",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const selectedLocations = ref([]);
    const acceptTerms = ref(false);
    const locations = ["Seattle, WA", "Chicago, IL", "Boston, MA"];
    const isValid = computed(() => {
      return email.value.trim() !== "" && selectedLocations.value.length > 0 && acceptTerms.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-8" }, _attrs))}><h1 class="text-2xl font-bold mb-4">Form Test Page</h1><div class="bg-gray-100 p-4 rounded mb-4"><h2 class="font-bold">Current Form State:</h2><p>Email: &quot;${ssrInterpolate(unref(email))}&quot;</p><p>Locations: ${ssrInterpolate(unref(selectedLocations).length)}</p><p>Terms: ${ssrInterpolate(unref(acceptTerms))}</p><p>Valid: ${ssrInterpolate(unref(isValid))}</p></div><form class="space-y-4"><div><label>Email:</label><input${ssrRenderAttr("value", unref(email))} type="email" class="w-full border p-2 rounded" placeholder="Enter email"></div><div><label>Locations:</label><div class="space-y-2"><!--[-->`);
      ssrRenderList(locations, (location) => {
        _push(`<label class="flex items-center"><input type="checkbox"${ssrRenderAttr("value", location)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedLocations)) ? ssrLooseContain(unref(selectedLocations), location) : unref(selectedLocations)) ? " checked" : ""} class="mr-2"> ${ssrInterpolate(location)}</label>`);
      });
      _push(`<!--]--></div></div><div><label class="flex items-center"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(acceptTerms)) ? ssrLooseContain(unref(acceptTerms), null) : unref(acceptTerms)) ? " checked" : ""} class="mr-2"> Accept Terms </label></div><button type="submit"${ssrIncludeBooleanAttr(!unref(isValid)) ? " disabled" : ""} class="${ssrRenderClass([
        unref(isValid) ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500",
        "px-4 py-2 rounded"
      ])}"> Submit </button></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/test-form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=test-form-COwDr1P5.mjs.map
