<template>
    <BContainer fluid class="w-100 ">
        <BRow class="w-100 pt-4" :class="StyleUtil.flex_center">
            <BCol cols="5">
                <BRow>
                    <UIInput v-model="search" @debounce="onDebounce" :type="StringConstant.SEARCH" />
                </BRow>
            </BCol>
        </BRow>
        <BRow class="d-flex pt-3 px-3" v-if="isMaxThan0" style="row-gap: 10px;">
            <BCol md="3" sm="6" v-for="menu in dynamicMenu">
                <BCard @click="() => select(menu)" :class="{ active: selectMenu.code === menu.code }"
                    class="hover-style-card rounded-4 d-flex gap-5 ">
                    <Icon :icon="menu.icon" width="35" height="35" style="color: #ca00cc" />
                    <p class="m-0 pt-2">{{ $t(`menu.${menu.name}._`) }}</p>
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
        <BRow class="pt-4 ps-3" v-if="isSelectSubMenu">
            <div class="ps-3 fs-5">
                {{ $t("header.menu_of") }} {{ $t(`menu.${selectMenu.name}._`) }}
            </div>
        </BRow>
        <BRow class="d-flex pt-3 px-3" v-if="isSelectSubMenu" style="row-gap: 10px;">
            <BCol md="3" sm="6" v-for="sub in selectMenu.sub">
                <RouterLink :to="sub.url"  class="gap-5 ">
                    <BCard @click="() => onSelectSubMenu(sub)" class="hover-style-card rounded-4 d-flex ">
                        <Icon :icon="sub.icon" width="35" height="35" style="color: #ca00cc" />
                        <p class="m-0 pt-2">{{ $t(`menu.${selectMenu.name}.${sub.name}`) }}</p>
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
import { computed, ref } from 'vue';
import type { MenuConfigType, MenuProperties } from '../types/menuType';
import UIInput from './ui/UIInput.vue';
import { StringConstant } from '../constants/stringConstant';
import { RouterLink } from 'vue-router';

const menus = menuConfig;
const style = StyleUtil;

const search = ref<string>("")
const dynamicMenu = ref<MenuConfigType[]>(menus);
const selectMenu = ref<MenuConfigType>({} as MenuConfigType);
const selectSubMenu = ref<MenuProperties>({} as MenuProperties);

const isMaxThan0 = computed(() => dynamicMenu.value.length > 0);
const isSelectSubMenu = computed(() => selectMenu.value && selectMenu.value.code?.length > 0);

const onDebounce = () => {
    dynamicMenu.value = menus.filter((menu: MenuConfigType) => menu.name.includes(search.value))
}
const select = (menu: MenuConfigType) => {
    selectMenu.value = menu;
    console.log(menu)
}

const onSelectSubMenu = (sub: MenuProperties) => {
    selectSubMenu.value = sub;
}

</script>
<style scoped>
.calc-height {
    height: calc(100vh - 140px);
}
</style>