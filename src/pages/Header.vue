<template>
  <header class="flex h-16 w-full items-center justify-between border-b border-gray-200 bg-[#F3F4F6] px-4 py-2">
    <div class="flex items-center gap-4">
      <button class="text-gray-700 hover:text-black transition-colors" aria-label="Settings">
        <Settings class="h-5 w-5" />
      </button>
      
      <div class="flex items-center gap-2 ml-2">
        <button class="p-1 text-gray-800 hover:bg-gray-200 rounded" aria-label="Go back">
          <ChevronLeft class="h-6 w-6" />
        </button>
        <button class="p-1 text-gray-800 hover:bg-gray-200 rounded" aria-label="Go forward">
          <ChevronRight class="h-6 w-6" />
        </button>
      </div>

      <div class="relative ml-4">
        <input
          type="text"
          placeholder="Search"
          class="h-10 w-[400px] rounded-xl bg-white px-4 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
    </div>

    <div class="flex items-center gap-3 cursor-pointer group">
      <div class="h-10 w-10 overflow-hidden rounded-full border border-gray-300">
        <img
          src="https://via.placeholder.com/40" 
          alt="Profile"
          class="h-full w-full object-cover"
        />
      </div>
      <span class="text-sm font-medium text-gray-700">Profile Name</span>
      <ChevronDown class="h-5 w-5 text-gray-600 group-hover:text-black" />
    </div>
  </header>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* Base styles handled by Tailwind */
</style>