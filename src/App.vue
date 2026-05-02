<template>
    <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import ThemeUtil from './utils/ThemeUtil';
import { LanguageUtil } from './utils/LanguageUtil';
const theme = ThemeUtil();
const lang = LanguageUtil();

onMounted(() => {
    theme.setThemeToSystem();
    lang.setLanguage("en");
})

</script>