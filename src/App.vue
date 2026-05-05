<template>
    <b-container fluid class="p-0">
        <Header v-if="isShowHeader"/>
        <router-view />
    </b-container>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import ThemeUtil from './utils/ThemeUtil';
import { LanguageUtil } from './utils/LanguageUtil';
import { BContainer } from 'bootstrap-vue-next';
import Header from './components/Header.vue';
import { RouteUtil } from './utils/RouteUtil';
import { StringConstant } from './constants/stringConstant';
import { useUserInfoStore } from './store/UserInfoStrore';
const theme = ThemeUtil();
const lang = LanguageUtil();
const route = RouteUtil();
const userInfoStore = useUserInfoStore();

const isShowHeader = computed(() => {
    let paths = route.getPathList();
    let isShow = !paths.includes(StringConstant.LOG_IN);
    return isShow;
});

onMounted(() => {
    theme.setThemeToSystem();
    userInfoStore.checkUserInfo();
    lang.setLanguage("en");
})


</script>