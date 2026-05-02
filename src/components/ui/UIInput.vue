<template>
    <div>
        <BInputGroup v-if="type == StringConstant.SEARCH">
            <BFormInput type="text" class="rounded-start-5" v-model="model" @input="handleInput"
                :placeholder="$t('system.search_feature_you_want')" />
            <BInputGroupText class="rounded-end-5">
                <Icon icon="proicons:search" width="24" height="24" />
            </BInputGroupText>
        </BInputGroup>
    </div>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { BFormInput, BInputGroup, BInputGroupText } from 'bootstrap-vue-next';
import debounce from 'lodash/debounce'
import { computed } from 'vue';
import { StringConstant } from '../../constants/string-constant';

const model = defineModel<string>();
const emit = defineEmits(["debounce"])
const props = defineProps(["type"])
const type = computed(() => props.type ?? "text");


const handleInput = debounce(() => {
    emit("debounce")
}, 1000)

</script>