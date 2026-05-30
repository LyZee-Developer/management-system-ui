<template>
    <BContainer fluid class="h-100 d-grid" style="grid-template-columns: 300px 1fr;">
        <div class="px-3">
            <div class="mb-2">{{ $t("system.general") }}</div>
            <div class="d-flex flex-column row-gap-2 px-2">
                <div role="button" :class="{ 'opacity-100': selectItem === item.name }"
                    class="d-flex custom-hover-card opacity-50 column-gap-2 py-1 px-2 align-items-center"
                    @click="() => onSelectItem(item.name)" v-for="item of setting.account_items" :key="item.name">
                    <Icon :icon="item.icon" width="24" height="24" />
                    <span>{{ item.name }}</span>
                </div>
            </div>
            <div class="mb-2 my-4">{{ $t("system.workspace") }}</div>
            <div class="d-flex flex-column row-gap-2 px-2">
                <div role="button" :class="{ 'opacity-100': selectItem === item.name }"
                    class="d-flex custom-hover-card opacity-50 column-gap-2 py-1 px-2 align-items-center"
                    @click="() => onSelectItem(item.name)" v-for="item of setting.workspace_items" :key="item.name">
                    <Icon :icon="item.icon" width="24" height="24" />
                    <span>{{ item.name }}</span>
                </div>
            </div>
        </div>
        <div>
            <!-- Sub Account -->
            <Account v-if="selectItem === StringConstant.ACCOUNT_SETTING.ACCOUNT" />
            <Apps v-if="selectItem === StringConstant.ACCOUNT_SETTING.APP" />
            <Language v-if="selectItem === StringConstant.ACCOUNT_SETTING.LANGUAGE_AND_REGION" />
            <Notification v-if="selectItem === StringConstant.ACCOUNT_SETTING.NOTIFICATION" />

            <!-- Sub Workspace -->
            <Members v-if="selectItem === StringConstant.WORKSPACE_SETTING.MEMBERS" />
            <Billing v-if="selectItem === StringConstant.WORKSPACE_SETTING.BILLING" />
            <General v-if="selectItem === StringConstant.WORKSPACE_SETTING.GENERAL" />
        </div>
    </BContainer>
</template>
<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { BContainer, BRow, BCol } from 'bootstrap-vue-next';
import setting from './../../constants/accountSetting';
import Account from './SubAccount/Account.vue';
import Apps from './SubAccount/Apps.vue';
import Language from './SubAccount/Language.vue';
import Notification from './SubAccount/Notification.vue';
import General from './SubWorkSpace/General.vue';
import Billing from './SubWorkSpace/Billing.vue';
import Members from './SubWorkSpace/Members.vue';
import { ref } from 'vue';
import { StringConstant } from '../../constants/stringConstant';

const selectItem = ref<string>(StringConstant.ACCOUNT_SETTING.ACCOUNT);

const onSelectItem = (name: string) => {
    selectItem.value = name;
};

</script>

<style lang="scss" scoped>
/* Custom Stylesheet */
.custom-hover-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.custom-hover-card:hover {
    transform: translateY(-1px);
}
</style>