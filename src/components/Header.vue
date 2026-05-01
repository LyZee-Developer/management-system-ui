<template>
  <BContainer fluid class="p-0">
    <div class="w-100 bg-primary p-0 py-2 px-2">
      <BContainer fluid class="p-0 m-0 h-100 ">
        <BRow class="w-100 h-100 px-4">
          <!-- //Management all system (M-A-S) -->
          <BCol cols="2" class="text-white fs-3 fw-bold" :class="style.flex_center">
            <BTooltip>
              <template #target>
                <BButton class="bg-transparent border-0 fw-bold fs-3 text-nowrap">M-A-S</BButton>
              </template>
              Management all system
            </BTooltip>
          </BCol>
          <BCol cols="8" :class="style.flex_center" class="text-white text-center">
            <BRow class="w-100 " :class="style.flex_center">
              <BCol cols="8">
                <BInputGroup>
                  <BFormInput type="text" class="rounded-start-5" placeholder="Search feature you want..." />
                  <BInputGroupText class="rounded-end-5">
                    <Icon icon="proicons:search" width="24" height="24" />
                  </BInputGroupText>
                </BInputGroup>
              </BCol>
            </BRow>
          </BCol>
          <BCol cols="2" :class="style.flex_end" class="text-white gap-3">
            <BAvatar size="35" role="button" :active="true" class="bg-white text-primary">
              <Icon :icon="is_dark_reactive.value ? 'proicons:brightness' : 'proicons:dark-theme'" width="24"
                height="24" @click="onChangeTheme" />
            </BAvatar>
            <BAvatar size="35" v-for="icon in icon_config" role="button" :active="true" class="bg-white text-primary">
              <Icon :icon="icon.name" width="24" height="24" @click="() => onClickButtonConfig(icon.type)" />
            </BAvatar>
          </BCol>
        </BRow>
      </BContainer>
    </div>

  </BContainer>
</template>

<script lang="ts" setup>
import { BAvatar, BButton, BCol, BContainer, BFormInput, BInputGroup, BInputGroupText, BRow, BTooltip } from 'bootstrap-vue-next';
import { StyleUtil as style } from '../utils/StyleUtil';
import { Icon } from "@iconify/vue";
import type { IconConfigType } from '../types/style_type';
import { useDark, useToggle } from '@vueuse/core'
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { locale } = useI18n<{}, 'en' | 'kh'>()
const is_dark_mode = useDark();
const toggleDark = useToggle(is_dark_mode);

const is_dark_reactive = computed(() => useDark());

const icon_config = computed<IconConfigType[]>(() => {
  return [
    { name: "proicons:settings", type: "setting" },
    { name: "proicons:person", type: "person" },
    { name: "proicons:globe", type: "globe" }
  ];
})

const onClickButtonConfig = (type: string) => {
  locale.value = "kh";
  toggleDark();
}

const onChangeTheme = () => {
  toggleDark();
}

</script>