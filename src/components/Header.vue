<template>
  <BContainer fluid class="p-0">
    <div class="w-100 p-0 ">
      <BContainer fluid class="p-0 py-2 px-2 bg-primary m-0 h-100 ">
        <BRow class="w-100 h-100 px-4">
          <!-- //Management all system (M-A-S) -->
          <BCol sm="6" md="6" class="text-white fs-3 fw-bold" :class="style.flex_start">
            <BTooltip>
              <template #target>
                <BButton :class="style.flex_center" class="bg-transparent gap-3 border-0 text-nowrap">
                  <RouterLink to="/" @click="onHomePage">
                    <Icon icon="proicons:app-remove" width="40" height="40" />
                  </RouterLink>
                  <div class="flex-column d-flex align-items-start">
                    <b class="">M-A-S</b>
                    <p class="m-0 p-0 " style="font-size: 13px; height: 20px;">{{ time }}</p>
                  </div>

                </BButton>
              </template>

              {{ $t("header.management_all_system") }}
            </BTooltip>
          </BCol>
          <BCol sm="6" md="6" :class="style.flex_end" class="text-white gap-3">
            <BTooltip>
              <template #target>
                <BAvatar size="35" role="button" :active="true"
                  :style="{ backgroundColor: `${userInfo?.hex} !important`, color: '#fff' }">
                  <div class="fs-6">{{ userInfo?.name?.slice(0, 1) }}</div>
                </BAvatar>
              </template>
              {{ userInfo?.name || "" }}
            </BTooltip>
            <BAvatar size="35" role="button" :active="true" class="bg-white text-primary">
              <Icon :icon="isDarkReactive.value ? 'proicons:brightness' : 'proicons:dark-theme'" width="24" height="24"
                @click="onChangeTheme" />
            </BAvatar>
            <!-- // select country -->
            <BDropdown variant="dark" no-caret toggle-class="bg-white text-primary same-style-each p-2 rounded-5">
              <template #button-content class="bg-transparent ">
                <Icon icon="proicons:globe" width="24" height="24" />
              </template>
              <BDropdownItem :active="selectLanguage.code == language.code" @click="() => onChangeLanguage(language)"
                v-for="language in languages">
                <div class="d-flex align-items-center">
                  <BAvatar size="35" class="bg-transparent">
                    <Icon :icon="language.icon" class="text-secondary-emphasis" width="301" height="193" />
                  </BAvatar>
                  <div>{{ language.name }}</div>
                </div>
              </BDropdownItem>
            </BDropdown>

            <BDropdown variant="dark" no-caret toggle-class="bg-white text-primary same-style-each p-2 rounded-5">
              <template #button-content class="bg-transparent ">
                <Icon icon="proicons:settings" width="26" height="26" />
              </template>
              <BDropdownItem @click="() => onSetting(item)" v-for="item in SettingConstant">
                <div class="d-flex align-items-center">
                  <BAvatar size="35" class="bg-transparent">
                    <Icon :icon="item.icon!" class="text-secondary-emphasis" width="301" height="193" />
                  </BAvatar>
                  <div>{{ $t('system.' + item.name.toLowerCase()) }}</div>
                </div>
              </BDropdownItem>
            </BDropdown>

          </BCol>
        </BRow>

      </BContainer>
      <div class="d-flex gap-2 px-3 py-3" v-if="isShowBreadcrumb && breadcrumbItems.length > StringConstant.MAX_0">
        <Icon icon="proicons:arrow-left" role="button" @click="onBackUrl" width="24" height="24"
          style="color: #ca00cc" />
        <BBreadcrumb :items="breadcrumbItems" ol-class="m-0" />
      </div>
    </div>
  </BContainer>
</template>

<script lang="ts" setup>
import { BAvatar, BBreadcrumb, BButton, BCol, BContainer, BDropdown, BDropdownItem, BRow, BTooltip, type BreadcrumbItem } from 'bootstrap-vue-next';
import { StyleUtil as style } from '../utils/StyleUtil';
import { Icon } from "@iconify/vue";
import { useDark } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue';
import { languages } from '../constants/languageConstant';
import { LanguageUtil } from '../utils/LanguageUtil';

import moment from 'moment'
import ThemeUtil from '../utils/ThemeUtil';

import type { LanguageType } from '../types/langaugeType';
import { RouterLink } from 'vue-router';
import { useHeaderStore } from '../store/headerStore';
import { RouteUtil } from '../utils/RouteUtil';
import { StringConstant } from '../constants/stringConstant';
import { SettingConstant } from '../constants/valueConstant';
import type { BaseType } from '../types/baseType';
import { useUserInfoStore } from '../store/UserInfoStrore';
import type { UserInfo } from '../types/Register/RegisterType';
import { ApiUtil } from '../utils/HttpUtil';
import { useI18n } from 'vue-i18n';

const route = RouteUtil();
const headerStore = useHeaderStore();
const lang = LanguageUtil();
const theme = ThemeUtil();
const useInfoStore = useUserInfoStore();
const api = ApiUtil();
const { t } = useI18n()

const DURATION = 1000;
const time = ref<string>();
const selectLanguage = ref<LanguageType>({} as LanguageType);
const isDarkReactive = computed(() => useDark());
const userInfo = computed<UserInfo>(() => useInfoStore.data.info);
const isShowBreadcrumb = computed(() => {
  let paths = route.getPathList();
  let isShow = headerStore.data.isShowBreadcrumb || paths.length > 0;
  return isShow;
});


const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  let paths = route.getPathList() ?? [];
  let breadcrumbs = paths.map((path) => ({ text: t('system.' + path.toLowerCase()) }));
  let items = isShowBreadcrumb.value ? breadcrumbs : [];
  return items;
})



const onHomePage = () => {
  headerStore.setIsShowBreadcrumb(false);
}

const onChangeTheme = () => {
  // ------ switch theme ---------
  theme.changeThem();
}

const onChangeLanguage = (value: LanguageType) => {
  selectLanguage.value = value;
  lang.setLanguage(value.code);
}

const onSetting = (value: BaseType) => {
  let url = "";

  switch (value.code) {
    case StringConstant.LOG_OUT: url = "login";
      headerStore.setIsShowBreadcrumb(false);
      useInfoStore.clearLocalUserInfo();
      clearLocalSelectUserChat()
      requestLogout(url);
      route.setNewRoute(url);
      break;
    case StringConstant.ACCOUNT_SETTING._: url = StringConstant.ACCOUNT_SETTING._.toLocaleLowerCase();
      route.setNewRoute(url);
      headerStore.setIsShowBreadcrumb(true);
      break;
  }
  // change to other page

}

const clearLocalSelectUserChat = () =>{
  localStorage.removeItem(StringConstant.SELECT_USER);
}

const requestLogout = async (url: string) => {
  const res = await api.https({
    url: "api/user_login/logout",
    data: {},
    method: 'get'
  })
  console.log(res);
  route.setNewRoute(url);
}

const onBackUrl = () => {
  route.goBack();
}

onMounted(() => {
  setInterval(() => {
    time.value = moment().format('DD MMMM YYYY, h:mm:ssA');
  }, DURATION)
  selectLanguage.value = languages.find((langauge: LanguageType) => langauge.code == "en")!;
})

</script>

<style>
.same-style-each {
  width: 35px !important;
  height: 35px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
</style>