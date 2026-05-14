<template>
    <BContainer fluid class="w-100 ">
        <BRow class="pt-4">
            <div class="d-flex justify-content-center align-items-center gap-2">
                <div class="typing m-0 fs-3">{{ welcomeToUsername }}</div>
            </div>
        </BRow>
        <BRow class="w-100 pt-4" :class="StyleUtil.flex_center">
            <BCol cols="5">
                <BRow>
                    <UIInput v-model="search" @debounce="onDebounce" :type="StringConstant.SEARCH" />
                </BRow>
            </BCol>
        </BRow>
        <BRow class="d-flex pt-3 px-3" v-if="isMaxThan0" style="row-gap: 10px;">
            <BCol md="3" sm="6" v-for="menu in dynamicMenu">
                <BCard @click="() => select(menu)"
                    :class="{ active: menuStore.data.selectedParent?.code === menu.code }"
                    class="hover-style-card rounded-4 d-flex gap-5 ">
                    <Icon :icon="menu.icon" width="35" height="35" style="color: #ca00cc" />
                    <p class="m-0 pt-2">{{ $t(`menu.${menu.code}._`) }}</p>
                </BCard>
            </BCol>
        </BRow>
        <!-- don't have menu on our system -->
        <BRow v-else :class="[!isMaxThan0 ? 'calc-height' : '', style.flex_center]">
            <BCol md="3" sm="6">
                <BCard class="rounded-4 gap-5 " :class="style.flex_center">
                    <div :class="style.flex_center">
                        <Icon icon="proicons:alert-triangle" width="50" height="50" style="color: #ca00cc" />
                    </div>
                    <p class="m-0 pt-3">{{ search }} - {{ $t("menu.no_available") }}</p>
                </BCard>
            </BCol>
        </BRow>
        <BRow class="pt-4 ps-3" v-if="menuStore.data.selectedParent && menuStore.data.selectedParent?.code?.length > 0">
            <div class="ps-3 fs-5">
                {{ $t("header.menu_of") }} {{ $t(`menu.${menuStore.data.selectedParent?.code}._`) }}
            </div>
        </BRow>
        <BRow class="d-flex pt-3 px-3"
            v-if="menuStore.data.selectedParent && menuStore.data.selectedParent?.code?.length > 0"
            style="row-gap: 10px;">
            <BCol md="3" sm="6" v-for="sub in menuStore.data.selectedParent?.sub">
                <RouterLink :to="sub.url" class="gap-5 ">
                    <BCard @click="() => onSelectSubMenu(sub)" class="hover-style-card rounded-4 d-flex ">
                        <Icon :icon="sub.icon" width="35" height="35" style="color: #ca00cc" />
                        <p class="m-0 pt-2">{{ $t(`menu.${menuStore.data.selectedParent?.code}.${sub.code}`) }}</p>
                    </BCard>
                </RouterLink>
            </BCol>
        </BRow>

    </BContainer>
</template>

<script setup lang="ts">
import { BCard, BCol, BContainer, BRow } from 'bootstrap-vue-next';
import { StyleUtil } from '../utils/StyleUtil';
import { menuConfig } from '../constants/menuConstant';
import { Icon } from '@iconify/vue';
import { computed, ref, watch } from 'vue';
import type { MenuConfigType, MenuProperties } from '../types/menuType';
import UIInput from './ui/UIInput.vue';
import { StringConstant } from '../constants/stringConstant';
import { RouterLink } from 'vue-router';
import { useUserInfoStore } from '../store/UserInfoStrore';
import type { UserInfo } from '../types/Register/RegisterType';
import { useMenuStore } from '../store/menuStore';
import { RouteUtil } from '../utils/RouteUtil';

const route = RouteUtil();
const menus = menuConfig;
const style = StyleUtil;
const userInfoStore = useUserInfoStore();
const menuStore = useMenuStore();

const search = ref<string>("")
const dynamicMenu = ref<MenuConfigType[]>(menus);
const selectMenu = ref<MenuConfigType>({} as MenuConfigType);
const selectSubMenu = ref<MenuProperties>({} as MenuProperties);

const userInfo = computed<UserInfo>(() => userInfoStore.data.info);
const isMaxThan0 = computed(() => dynamicMenu.value.length > 0);
const isSelectSubMenu = computed(() => selectMenu.value && selectMenu.value.code?.length > 0);

watch(search, () => {
    menuStore.data.selectedParent = {} as MenuConfigType;
    if (search.value == "") {
        dynamicMenu.value = menus;
    }
})

const onDebounce = () => {
    dynamicMenu.value = menus.filter((menu: MenuConfigType) => {
        return menu.name.includes(search.value);
    })

    const getSub = menus.map((menu: MenuConfigType) => menu.sub).flat();
    const convertToMenu = getSub.filter((sub: MenuProperties) => sub.name.includes(search.value) && search.value !== "").map((val: any) => {
        return {
            code: val.code,
            icon: val.icon,
            name: val.name,
            type: val.type,
            url: val.url
        } as MenuConfigType;
    });

    //************* merge data between parent and sub *****************/
    dynamicMenu.value = [...dynamicMenu.value, ...convertToMenu];

    console.log("result", dynamicMenu.value)
}
const select = (menu: MenuConfigType) => {
    console.log(menu)
    if (menu.type == "sub_module") {
        route.setNewRoute(menu.url)
        return;
    }
    selectMenu.value = menu;
    menuStore.data.selectedParent = menu;
}

const onSelectSubMenu = (sub: MenuProperties) => {
    selectSubMenu.value = sub;

}

const welcomeToUsername = computed<string>(() => {
    let hour = new Date().getHours();
    let username = (userInfo?.value?.gender == StringConstant.FEMALE ? `Mrs. ` : `Mr. `) + userInfo?.value?.name;
    let message = "Welcome! Good ";
    let icon = "";

    if (hour >= 5 && hour < 12) {
        message += 'morning';
        icon = "🌄";
    }
    else if (hour >= 12 && hour < 17) {
        message += 'afternoon';
        icon = "🕑";
    }
    else if (hour >= 17 && hour < 21) {
        message += 'evening';
        icon = "🛣️";
    }
    else {
        message += 'night';
        icon = "🌙"
    }
    let fullMessage = message + " " + username + icon;
    return fullMessage;
})


</script>
<style scoped>
.calc-height {
    height: calc(100vh - 140px);
}
</style>