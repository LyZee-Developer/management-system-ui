<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white">
    
    <div class="text-center">
      
      <!-- Icon -->
      <div class="flex justify-center mb-6">
        <div class="w-16 h-16 border-2 border-white rounded-md flex items-center justify-center relative">
          <span class="text-xl">✕</span>
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-4xl font-bold mb-2">404 Error</h1>
      <p class="text-lg mb-8 opacity-90">Sorry, page not found</p>

      <!-- Button -->
      <button
        @click="goHome"
        class="px-8 py-3 border border-white rounded-lg hover:bg-white hover:text-orange-500 transition"
      >
        Back to home
      </button>

    </div>

  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>