import { ref, readonly } from 'vue';

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

export { useSubscription as u };
//# sourceMappingURL=useSubscription-Bak8OegO.mjs.map
