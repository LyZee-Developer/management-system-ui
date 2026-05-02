<template>
  <BContainer fluid class="p-0">
    <div class="w-100 bg-primary p-0 py-2 px-2">
      <BContainer fluid class="p-0 m-0 h-100 ">
        <BRow class="w-100 h-100 px-4">
          <!-- //Management all system (M-A-S) -->
          <BCol sm="6" md="6" class="text-white fs-3 fw-bold" :class="style.flex_start">
            <BTooltip>
              <template #target>
                <BButton :class="style.flex_center" class="bg-transparent gap-3 border-0 text-nowrap">
                  <Icon icon="proicons:app-remove" width="40" height="40" />
                  <div class="flex-column d-flex align-items-start">
                    <b class="">M-A-S</b>
                    <p class="m-0 p-0 " style="font-size: 13px;">{{ time }}</p>
                  </div>
                </BButton>
              </template>
              {{ $t("header.management_all_system") }}
            </BTooltip>
          </BCol>
          <!-- <BCol sm="4" md="4" :class="style.flex_center" class="text-white fs-6 text-center">
            {{ time }}
          </BCol> -->
          <BCol sm="6" md="6" :class="style.flex_end" class="text-white gap-3">
            <BAvatar size="35" role="button" :active="true" class="bg-white text-primary">
              <Icon :icon="is_dark_reactive.value ? 'proicons:brightness' : 'proicons:dark-theme'" width="24"
                height="24" @click="onChangeTheme" />
            </BAvatar>
            <BAvatar size="35" @click="() => onClickButtonConfig(icon.type)" v-for="icon in icon_config" role="button"
              :active="true" class="bg-white text-primary">
              <Icon :icon="icon.name" width="26" height="26" />
            </BAvatar>
            <!-- // select country -->
            <BDropdown variant="dark" no-caret toggle-class="bg-white text-primary same-style-each p-2 rounded-5">
              <template #button-content class="bg-transparent ">
                <Icon icon="proicons:globe" width="24" height="24" />
              </template>
              <BDropdownItem :active="select_language.code == language.code" @click="() => onChangeLanguage(language)"
                v-for="language in languages">
                <div class="d-flex align-items-center">
                  <BAvatar size="35" class="bg-transparent">
                    <Icon :icon="language.icon" width="301" height="193" />
                  </BAvatar>
                  <div>{{ language.name }}</div>
                </div>
              </BDropdownItem>
            </BDropdown>
          </BCol>
        </BRow>
      </BContainer>
    </div>

  </BContainer>
</template>

<script lang="ts" setup>
import { BAvatar, BButton, BCol, BContainer, BDropdown, BDropdownItem, BRow, BTooltip } from 'bootstrap-vue-next';
import { StyleUtil as style } from '../utils/StyleUtil';
import { Icon } from "@iconify/vue";
import { useDark } from '@vueuse/core'
import { useI18n } from 'vue-i18n';
import { computed, onMounted, ref } from 'vue';
import { languages } from '../constants/language-constant';
import { LanguageUtil } from '../utils/LanguageUtil';

import moment from 'moment'
import ThemeUtil from '../utils/ThemeUtil';

const { locale } = useI18n<{}, 'en' | 'kh'>()

import type { IconConfigType } from '../types/style_type';
import type { LanguageType } from '../types/langauge_type';

const lang = LanguageUtil();
const theme = ThemeUtil();

const time = ref<string>();
const select_language = ref<LanguageType>({} as LanguageType);
const is_dark_reactive = computed(() => useDark());

onMounted(() => {
  setInterval(() => {
    time.value = moment().format('DD MMMM YYYY, h:mm:ssA');
  }, 1000)
  select_language.value = languages.find((langauge: LanguageType) => langauge.code == "en")!;
})

const icon_config = computed<IconConfigType[]>(() => {
  return [
    { name: "proicons:settings", type: "setting" },
  ];
})

const onClickButtonConfig = (type: string) => {
  locale.value = "kh";
}

const onChangeTheme = () => {
  // ------ switch theme ---------
  theme.changeThem();
}

const onChangeLanguage = (value: LanguageType) => {
  select_language.value = value;
  lang.setLanguage(value.code);
}

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