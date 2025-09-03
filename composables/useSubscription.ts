import { ref, readonly } from 'vue'

export const useSubscription = () => {
  const isSubscribed = ref(false)
  const subscriptionStatus = ref('inactive')
  const subscriptionPlan = ref(null)

  // Check subscription status from localStorage and API
  const checkSubscription = async () => {
    try {
      // Check localStorage first for quick response
      const localStatus = localStorage.getItem('subscription_status')
      const localPlan = localStorage.getItem('subscription_plan')
      
      if (localStatus === 'active') {
        isSubscribed.value = true
        subscriptionStatus.value = 'active'
        subscriptionPlan.value = localPlan
      }

      // Verify with API (optional - for production you'd want this)
      // const response = await $fetch('/api/subscription/verify')
      // if (response.active) {
      //   isSubscribed.value = true
      //   subscriptionStatus.value = 'active'
      //   subscriptionPlan.value = response.plan
      //   localStorage.setItem('subscription_status', 'active')
      //   localStorage.setItem('subscription_plan', response.plan)
      // }
    } catch (error) {
      console.error('Error checking subscription:', error)
      isSubscribed.value = false
      subscriptionStatus.value = 'inactive'
    }
  }

  // Set subscription status (called after successful payment)
  const setSubscriptionActive = (plan: string) => {
    isSubscribed.value = true
    subscriptionStatus.value = 'active'
    subscriptionPlan.value = plan
    localStorage.setItem('subscription_status', 'active')
    localStorage.setItem('subscription_plan', plan)
  }

  // Clear subscription status
  const clearSubscription = () => {
    isSubscribed.value = false
    subscriptionStatus.value = 'inactive'
    subscriptionPlan.value = null
    localStorage.removeItem('subscription_status')
    localStorage.removeItem('subscription_plan')
  }

  return {
    isSubscribed: readonly(isSubscribed),
    subscriptionStatus: readonly(subscriptionStatus),
    subscriptionPlan: readonly(subscriptionPlan),
    checkSubscription,
    setSubscriptionActive,
    clearSubscription
  }
}
////////////////////
// export const useSubscription = () => {
//   const isSubscribed = ref(false)
//   const subscriptionStatus = ref('inactive')
//   const subscriptionPlan = ref(null)

//   // Check subscription status from localStorage and API
//   const checkSubscription = async () => {
//     try {
//       // Check localStorage first for quick response
//       const localStatus = localStorage.getItem('subscription_status')
//       const localPlan = localStorage.getItem('subscription_plan')
      
//       if (localStatus === 'active') {
//         isSubscribed.value = true
//         subscriptionStatus.value = 'active'
//         subscriptionPlan.value = localPlan
//       }

//       // Verify with API (optional - for production you'd want this)
//       // const response = await $fetch('/api/subscription/verify')
//       // if (response.active) {
//       //   isSubscribed.value = true
//       //   subscriptionStatus.value = 'active'
//       //   subscriptionPlan.value = response.plan
//       //   localStorage.setItem('subscription_status', 'active')
//       //   localStorage.setItem('subscription_plan', response.plan)
//       // }
//     } catch (error) {
//       console.error('Error checking subscription:', error)
//       isSubscribed.value = false
//       subscriptionStatus.value = 'inactive'
//     }
//   }

//   // Set subscription status (called after successful payment)
//   const setSubscriptionActive = (plan: string) => {
//     isSubscribed.value = true
//     subscriptionStatus.value = 'active'
//     subscriptionPlan.value = plan
//     localStorage.setItem('subscription_status', 'active')
//     localStorage.setItem('subscription_plan', plan)
//   }

//   // Clear subscription status
//   const clearSubscription = () => {
//     isSubscribed.value = false
//     subscriptionStatus.value = 'inactive'
//     subscriptionPlan.value = null
//     localStorage.removeItem('subscription_status')
//     localStorage.removeItem('subscription_plan')
//   }

//   return {
//     isSubscribed: readonly(isSubscribed),
//     subscriptionStatus: readonly(subscriptionStatus),
//     subscriptionPlan: readonly(subscriptionPlan),
//     checkSubscription,
//     setSubscriptionActive,
//     clearSubscription
//   }
// }