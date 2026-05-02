<template>
    <BContainer fluid class="w-100 ">
        <BRow class="w-100 pt-4" :class="StyleUtil.flex_center">
            <BCol cols="5">
                <BRow>
                    <UIInput v-model="search" @debounce="onDebounce" :type="StringConstant.SEARCH" />
                </BRow>
            </BCol>
        </BRow>
        <BRow class="d-flex pt-3 px-3" v-if="is_max_than_0" style="row-gap: 10px;">
            <BCol md="3" sm="6" v-for="menu in dynamic_menu">
                <BCard @click="() => select(menu)" :class="{ active: select_menu.code === menu.code }"
                    class="hover-style-card rounded-4 d-flex gap-5 ">
                    <Icon :icon="menu.icon" width="35" height="35" style="color: #ca00cc" />
                    <p class="m-0 pt-2">{{ $t(`menu.${menu.name}._`) }}</p>
                </BCard>
            </BCol>
        </BRow>
        <!-- don't have menu on our system -->
        <BRow v-else :class="[!is_max_than_0 ? 'calc-height' : '', style.flex_center]">
            <BCol md="3" sm="6">
                <BCard class="rounded-4 gap-5 " :class="style.flex_center">
                    <div :class="style.flex_center">
                        <!-- <Icon icon="proicons:bug" width="50" height="50" style="color: #ca00cc" /> -->
                        <Icon icon="proicons:alert-triangle" width="50" height="50" style="color: #ca00cc" />
                    </div>
                    <p class="m-0 pt-3">{{ search }} - {{ $t("menu.no_available") }}</p>
                </BCard>
            </BCol>
        </BRow>
        <BRow class="pt-4 ps-3" v-if="is_select_sub_menu">
            <div class="ps-3 fs-5">
                Menu of {{ $t(`menu.${select_menu.name}._`) }}
            </div>
        </BRow>
        <BRow class="d-flex pt-3 px-3" v-if="is_select_sub_menu" style="row-gap: 10px;">
            <BCol md="3" sm="6" v-for="sub in select_menu.sub">
                <BCard @click="() => selectSubMenu(sub)" class="hover-style-card rounded-4 d-flex gap-5 ">
                    <Icon :icon="sub.icon" width="35" height="35" style="color: #ca00cc" />
                    <p class="m-0 pt-2">{{ $t(`menu.${select_menu.name}.${sub.name}`) }}</p>
                </BCard>
            </BCol>
        </BRow>

    </BContainer>
</template>

<script setup lang="ts">
import { BCard, BCol, BContainer, BRow } from 'bootstrap-vue-next';
import { StyleUtil } from '../utils/StyleUtil';
import { menuConfig } from '../constants/menu-config';
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import type { MenuConfigType, MenuProperties } from '../types/menu_type';
import UIInput from './ui/UIInput.vue';
import { StringConstant } from '../constants/string-constant';

const style = StyleUtil;
const search = ref<string>("")
const menus = menuConfig;
const dynamic_menu = ref<MenuConfigType[]>(menus);
const is_max_than_0 = computed(() => dynamic_menu.value.length > 0);
const select_menu = ref<MenuConfigType>({} as MenuConfigType);
const select_sub_menu = ref<MenuProperties>({} as MenuProperties);
const is_select_sub_menu = computed(() => select_menu.value && select_menu.value.code?.length > 0);
const onDebounce = () => {
    dynamic_menu.value = menus.filter((menu: MenuConfigType) => menu.name.includes(search.value))
}
const select = (menu: MenuConfigType) => {
    select_menu.value = menu;
    console.log(menu)
}

const selectSubMenu = (sub: MenuProperties) => {
    select_sub_menu.value = sub;
}
</script>
<style scoped>
.calc-height {
    height: calc(100vh - 140px);
}
</style>