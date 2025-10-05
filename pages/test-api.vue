<template>
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold mb-6">API Test Page</h1>

    <div class="space-y-6">
      <!-- Test API Connection -->
      <div class="card p-6">
        <h2 class="text-xl font-semibold mb-4">Test API Connection</h2>
        <button @click="testAPI" :disabled="loading" class="btn-primary">
          {{ loading ? "Testing..." : "Test API" }}
        </button>

        <div v-if="apiResult" class="mt-4 p-4 bg-gray-100 rounded">
          <pre>{{ JSON.stringify(apiResult, null, 2) }}</pre>
        </div>
      </div>

      <!-- Test Form Reactivity -->
      <div class="card p-6">
        <h2 class="text-xl font-semibold mb-4">Test Form Reactivity</h2>
        <div class="space-y-4">
          <input
            v-model="testInput"
            placeholder="Type something..."
            class="w-full p-3 border rounded"
          />
          <p>
            You typed: <strong>{{ testInput }}</strong>
          </p>
          <p>
            Character count: <strong>{{ testInput.length }}</strong>
          </p>
        </div>
      </div>

      <!-- Test Image Loading -->
      <div class="card p-6">
        <h2 class="text-xl font-semibold mb-4">Test Image Loading</h2>
        <img
          src="/i90-bg.jpg"
          alt="I-90 Background Test"
          class="w-full max-w-md h-48 object-cover rounded"
          @load="imageLoaded = true"
          @error="imageError = true"
        />
        <p v-if="imageLoaded" class="text-green-600 mt-2">
          ✅ Image loaded successfully
        </p>
        <p v-if="imageError" class="text-red-600 mt-2">
          ❌ Image failed to load
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Test reactive data
const testInput = ref("");
const loading = ref(false);
const apiResult = ref(null);
const imageLoaded = ref(false);
const imageError = ref(false);

// Test API function
const testAPI = async () => {
  loading.value = true;
  apiResult.value = null;

  try {
    const response = await $fetch("/api/test");
    apiResult.value = response;
  } catch (error) {
    apiResult.value = { error: error.message };
  } finally {
    loading.value = false;
  }
};
</script>
