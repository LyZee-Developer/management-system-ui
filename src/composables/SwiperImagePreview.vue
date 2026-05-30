<template>
    <div class="position-fixed overflow-y-auto top-0 start-0 vh-100 vw-100 bg-black d-flex justify-content-center align-items-center"
        @wheel="onScrollImage" :class="{ 'd-none': !isShow }">
        <div class="position-fixed z-3 top-0 end-0 mt-4 me-4 close-icon d-flex justify-content-center align-items-center"
            style="width: 40px; height: 40px;" @click="onClosePreview">
            <Icon icon="proicons:cancel" width="20" height="20" class="text-white " role="button" />
        </div>
        <swiper :modules="modules" :slides-per-view="1" :space-between="50" navigation :pagination="{ clickable: true }"
            @swiper="onSwiper" @slideChange="onSlideChange">
            <swiper-slide v-for="(image, index) in images" :key="index">
                <BImg :src="image" :style="{ transform: `scale(${scaleImage})` }"/>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script lang="ts" setup>
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules';
import { BImg } from 'bootstrap-vue-next';
import { computed, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';

const isShow = defineModel<boolean>();
const scaleImage = ref<number>(1);

const props = defineProps(["imageUrls", "isShow"])
const images = computed(() => props.imageUrls || []);

// Provide modules to the template
const modules = [Navigation, Pagination];

const onClosePreview = () => {
    isShow.value = false;
    scaleImage.value = 1; // Reset zoom when closing
};

// Optional event handlers
const onSwiper = (swiper: any) => {
    console.log('Swiper instance:', swiper);
};

const onScrollImage = (event: any) => {
    const isScrollingBottom = event.deltaY > 0;
    if(isScrollingBottom){
        scaleImage.value -= 0.1;
    } else {
        scaleImage.value += 0.1;
    }
};

const onSlideChange = () => {
    scaleImage.value = 1; 
    console.log('Slide changed');
};
</script>
<style scoped>
/* Set custom sizing for your carousel if needed */
.swiper {
    width: 100%;
    height: 100vh;
}

.swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
}

.close-icon {
    border-radius: 50%;
    transition: all 0.2s ease;
}

.close-icon:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
}
</style>