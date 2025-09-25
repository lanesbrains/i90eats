<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Form Test Page</h1>

    <div class="bg-gray-100 p-4 rounded mb-4">
      <h2 class="font-bold">Current Form State:</h2>
      <p>Email: "{{ email }}"</p>
      <p>Locations: {{ selectedLocations.length }}</p>
      <p>Terms: {{ acceptTerms }}</p>
      <p>Valid: {{ isValid }}</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label>Email:</label>
        <input
          v-model="email"
          type="email"
          class="w-full border p-2 rounded"
          placeholder="Enter email"
        />
      </div>

      <div>
        <label>Locations:</label>
        <div class="space-y-2">
          <label
            v-for="location in locations"
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

      <div>
        <label class="flex items-center">
          <input type="checkbox" v-model="acceptTerms" class="mr-2" />
          Accept Terms
        </label>
      </div>

      <button
        type="submit"
        :disabled="!isValid"
        :class="
          isValid ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
        "
        class="px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
const email = ref("");
const selectedLocations = ref([]);
const acceptTerms = ref(false);

const locations = ["Seattle, WA", "Chicago, IL", "Boston, MA"];

const isValid = computed(() => {
  return (
    email.value.trim() !== "" &&
    selectedLocations.value.length > 0 &&
    acceptTerms.value
  );
});

const handleSubmit = () => {
  alert(
    `Form submitted! Email: ${email.value}, Locations: ${selectedLocations.value.length}`
  );
};
</script>
