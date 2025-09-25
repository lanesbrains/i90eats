<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Working Subscribe Form</h1>

    <!-- Debug Panel -->
    <div class="bg-blue-100 p-4 rounded mb-6">
      <h3 class="font-bold">Debug Info:</h3>
      <p>Email: "{{ email }}"</p>
      <p>Locations: {{ selectedLocations.length }}</p>
      <p>Terms: {{ acceptTerms }}</p>
      <p>Valid: {{ isValid }}</p>
      <button
        @click="testValues"
        class="mt-2 bg-green-500 text-white px-4 py-2 rounded"
      >
        Test Values
      </button>
    </div>

    <form @submit.prevent="submitForm" class="space-y-4 max-w-md">
      <!-- Email -->
      <div>
        <label class="block font-medium mb-2">Email:</label>
        <input
          v-model="email"
          type="email"
          class="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter your email"
        />
      </div>

      <!-- Locations -->
      <div>
        <label class="block font-medium mb-2">Select Locations:</label>
        <div class="space-y-2">
          <label
            v-for="location in availableLocations"
            :key="location"
            class="flex items-center"
          >
            <input
              type="checkbox"
              :value="location"
              v-model="selectedLocations"
              class="mr-2"
            />
            {{ location }}
          </label>
        </div>
      </div>

      <!-- Terms -->
      <div>
        <label class="flex items-center">
          <input type="checkbox" v-model="acceptTerms" class="mr-2" />
          I accept the terms and conditions
        </label>
      </div>

      <!-- Submit -->
      <button
        type="submit"
        :disabled="!isValid"
        :class="
          isValid
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-gray-300 text-gray-500'
        "
        class="px-6 py-2 rounded font-medium"
      >
        {{ isSubmitting ? "Processing..." : "Subscribe" }}
      </button>
    </form>
  </div>
</template>

<script setup>
const email = ref("");
const selectedLocations = ref([]);
const acceptTerms = ref(false);
const isSubmitting = ref(false);

const availableLocations = [
  "Seattle, WA",
  "Chicago, IL",
  "Boston, MA",
  "Denver, CO",
];

const isValid = computed(() => {
  return (
    email.value.trim() !== "" &&
    selectedLocations.value.length > 0 &&
    acceptTerms.value
  );
});

const testValues = () => {
  alert(
    `Email: "${email.value}"\nLocations: ${selectedLocations.value.length}\nTerms: ${acceptTerms.value}\nValid: ${isValid.value}`
  );
};

const submitForm = async () => {
  if (!isValid.value) {
    alert("Please fill all fields");
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await $fetch("/api/subscription/create", {
      method: "POST",
      body: {
        email: email.value,
        locations: selectedLocations.value,
        priceId: "test",
      },
    });

    alert("Success! " + JSON.stringify(response));
  } catch (error) {
    alert("Error: " + error.message);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
