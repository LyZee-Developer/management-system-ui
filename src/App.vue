<template>
    <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import ThemeUtil from './utils/ThemeUtil';
const theme = ThemeUtil();

onMounted(() => {
    theme.setThemeToSystem();
})

</script>