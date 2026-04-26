<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-[380px] bg-white rounded-2xl shadow-xl p-8 text-center">

      <!-- Logo -->
      <div class="flex items-center justify-center gap-2 mb-3">
        <div class="w-6 h-3 bg-indigo-500 rounded-t-full"></div>
        <span class="font-semibold text-lg">Aura</span>
      </div>

      <!-- Title -->
      <h1 class="text-2xl font-bold mb-1">Welcome back</h1>
      <p class="text-gray-500 text-sm mb-6">
        Please enter your details to sign in
      </p>

      <!-- Social -->
      <div class="flex justify-center gap-3 mb-6">
        <button class="w-11 h-11 rounded-full border flex items-center justify-center hover:bg-gray-100">G</button>
        <button class="w-11 h-11 rounded-full border flex items-center justify-center hover:bg-gray-100"></button>
        <button class="w-11 h-11 rounded-full border flex items-center justify-center hover:bg-gray-100">X</button>
      </div>

      <!-- Divider -->
      <div class="flex items-center mb-6">
        <div class="flex-1 h-px bg-gray-200"></div>
        <span class="px-3 text-xs text-gray-400">OR</span>
        <div class="flex-1 h-px bg-gray-200"></div>
      </div>

      <!-- Form -->
      <div class="text-left space-y-4">
        <div>
          <label class="text-sm">Your Email Address</label>
          <input
            type="email"
            v-model="email"
            placeholder="Your Email Address"
            class="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label class="text-sm">Password</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="********"
              class="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <span
              class="absolute right-3 top-3 cursor-pointer text-gray-400"
              @click="showPassword = !showPassword"
            >
              👁
            </span>
          </div>
        </div>

        <!-- Options -->
        <div class="flex justify-between items-center text-sm">
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="remember" />
            Remember me
          </label>
          <a href="#" class="text-gray-500 hover:underline">
            Forgot password?
          </a>
        </div>

        <!-- Button -->
        <button
          @click="handleLogin"
          class="w-full py-2 rounded-lg bg-gradient-to-r from-black to-gray-700 text-white hover:opacity-90"
        >
          Sign in
        </button>
      </div>

      <!-- Signup -->
      <p class="mt-6 text-sm text-gray-500">
        Don’t have an account?
        <a href="#" class="font-medium text-black hover:underline">Sign up</a>
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref<string>('')
const password = ref<string>('')
const remember = ref<boolean>(false)
const showPassword = ref<boolean>(false)

const handleLogin = () => {
  console.log({
    email: email.value,
    password: password.value,
    remember: remember.value
  })
}
</script>