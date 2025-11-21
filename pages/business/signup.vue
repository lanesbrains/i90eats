<template>
  <div>
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16">
      <div class="container-max text-center">
        <h1 class="text-4xl font-bold mb-4">List Your Restaurant</h1>
        <p class="text-xl text-primary-100">Join I-90's premier restaurant directory and reach hungry travelers</p>
      </div>
    </section>

    <!-- Business Signup Form -->
    <section class="py-16">
      <div class="container-max max-w-4xl mx-auto">
        <div class="card p-8">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
            <p class="text-gray-600">Select the plan that works best for your restaurant</p>
          </div>

          <!-- Pricing Plans -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <!-- Basic Plan -->
            <div class="border-2 border-gray-200 rounded-xl p-6" :class="{ 'border-primary-500 bg-primary-50': selectedPlan === 'basic' }">
              <div class="text-center mb-4">
                <h3 class="text-xl font-bold text-gray-900">Basic Listing</h3>
                <div class="text-3xl font-bold text-primary-600 mt-2">$9.99</div>
                <div class="text-gray-600">per month</div>
              </div>
              <ul class="space-y-2 mb-6">
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Restaurant listing in directory
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Contact information display
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Basic deal posting
                </li>
              </ul>
              <button @click="selectedPlan = 'basic'" class="w-full py-2 px-4 rounded-lg border-2 transition-colors" :class="selectedPlan === 'basic' ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-300 text-gray-700 hover:border-primary-300'">Select Basic</button>
            </div>

            <!-- Premium Plan -->
            <div class="border-2 border-accent-500 rounded-xl p-6 relative" :class="{ 'bg-accent-50': selectedPlan === 'premium' }">
              <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span class="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">Popular</span>
              </div>
              <div class="text-center mb-4">
                <h3 class="text-xl font-bold text-gray-900">Premium Listing</h3>
                <div class="text-3xl font-bold text-accent-600 mt-2">$19.99</div>
                <div class="text-gray-600">per month</div>
              </div>
              <ul class="space-y-2 mb-6">
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Everything in Basic
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Premium badge & priority placement
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Featured deals in newsletters
                </li>
              </ul>
              <button @click="selectedPlan = 'premium'" class="w-full py-2 px-4 rounded-lg border-2 transition-colors" :class="selectedPlan === 'premium' ? 'bg-accent-600 text-white border-accent-600' : 'border-gray-300 text-gray-700 hover:border-accent-300'">Select Premium</button>
            </div>
          </div>
          <ClientOnly>
            <!-- Form Fields -->
            <form @submit.prevent="handleSignup" class="space-y-6">
              <!-- Restaurant Name -->
              <div>
                <label for="restaurantName" class="block text-sm font-medium text-gray-700 mb-2">Restaurant Name *</label>
                <input id="restaurantName" v-model="form.restaurantName" type="text" required class="input-field" placeholder="Your restaurant name" />
              </div>

              <!-- Owner Email -->
              <div>
                <label for="ownerEmail" class="block text-sm font-medium text-gray-700 mb-2">Owner Email *</label>
                <input id="ownerEmail" v-model="form.ownerEmail" type="email" required class="input-field" placeholder="owner@restaurant.com" />
              </div>

              <!-- Location -->
              <div>
                <label for="location" class="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <select id="location" v-model="form.location" required class="input-field">
                  <option value="">Select a location</option>
                  <option v-for="location in allLocations" :key="location" :value="location">{{ location }}</option>
                </select>
              </div>

              <!-- Address -->
              <div>
                <label for="address" class="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                <input id="address" v-model="form.address" type="text" required class="input-field" placeholder="123 Main St, City, State ZIP" />
              </div>

              <!-- Phone Number -->
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input id="phone" v-model="form.phone" type="tel" required class="input-field" placeholder="(555) 123-4567" />
              </div>

              <!-- Cuisine -->
              <div>
                <label for="cuisine" class="block text-sm font-medium text-gray-700 mb-2">Cuisine Type *</label>
                <input id="cuisine" v-model="form.cuisine" type="text" required class="input-field" placeholder="American, Italian, Mexican, etc." />
              </div>

              <!-- Website -->
              <div>
                <label for="website" class="block text-sm font-medium text-gray-700 mb-2">Website (Optional)</label>
                <input id="website" v-model="form.website" type="url" class="input-field" placeholder="https://yourrestaurant.com" />
              </div>

              <!-- Description -->
              <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Restaurant Description *</label>
                <textarea id="description" v-model="form.description" required rows="4" class="input-field" placeholder="Tell customers about your restaurant, specialties, atmosphere, etc."></textarea>
              </div>

              <!-- Terms -->
              <div>
                <label class="flex items-start">
                  <input type="checkbox" v-model="form.acceptTerms" required class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-1" />
                  <span class="ml-3 text-sm text-gray-700">
                    I agree to the <a href="#" class="text-primary-600 hover:text-primary-700 underline">Terms of Service</a> and <a href="#" class="text-primary-600 hover:text-primary-700 underline">Business Agreement</a>. I understand billing will begin immediately.
                  </span>
                </label>
              </div>

              <!-- Submit Button -->
              <div class="pt-4">
                <button type="submit" :disabled="!isFormValid || isSubmitting" class="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed">
                  <span v-if="isSubmitting" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                  <span v-else>Sign Up - ${{ selectedPlan === "premium" ? "19.99" : "9.99" }}/month</span>
                </button>
              </div>
            </form>
          </ClientOnly>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI90Locations } from '~/composables/useI90Locations';

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
  acceptTerms: false,
});

const isFormValid = computed(() => {
  return (
    form.value.restaurantName &&
    form.value.ownerEmail &&
    form.value.location &&
    form.value.address &&
    form.value.phone &&
    form.value.cuisine &&
    form.value.description &&
    form.value.acceptTerms &&
    selectedPlan.value
  );
});

const handleSignup = async () => {
  if (!isFormValid.value) return;

  isSubmitting.value = true;

  try {
    const response = await $fetch("/api/join", {
    method: "POST",
    body: {
      ...form.value,
      plan: selectedPlan.value, 
      priceId: selectedPlan.value === "premium" ? "price_1SVfPBCNH3O77AidIiQqY2EP" : "price_1SVfN4CNH3O77AideawVMgS6",
    },
  });

  if (response.checkout_url) {
    window.location.href = response.checkout_url;
  }
  } catch (error) {
    console.error("Business signup error:", error);
    alert("There was an error processing your signup. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>