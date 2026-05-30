<template>
    <div>
        <h4>{{ $t("system.my_profile") }}</h4>
        <BRow>
            <BCol
                class="d-flex flex-column flex-md-row gap-3 align-items-center align-items-md-center text-center text-md-start">
                <BImg width="80" height="80" class="object-fit-cover border flex-shrink-0 p-1"
                    :src="imageUrl || image.defaultImage" @click="isShowPreview = true" role="button"
                    rounded="circle" />
                <BRow>
                    <BCol>
                        <input ref="htmlFile" type="file" accept="image/*" class="d-none" @change="handleImageUpload" />
                        <BButton variant="outline-secondary" v-if="imageUrl == '' || imageUrl == image.defaultImage" @click="onUploadImage">
                            {{ $t("system.change_photo") }}
                        </BButton>
                        <BButton variant="outline-success" v-else @click="onSavePhoto">
                            {{ $t("system.save_photos") }}
                        </BButton>
                        <BButton class="ms-2" variant="outline-danger" @click="imageUrl = ''">
                            {{ $t("system.remove_photo") }}
                        </BButton>
                        <p class="p-0 m-0 mt-2 text-secondary-emphasis fs-6">
                            We support PNG, JPG, GIF up to 2MB
                        </p>
                    </BCol>
                </BRow>
            </BCol>
        </BRow>

        <BRow class="mt-4 row-gap-3">
            <BCol sm="12" md="6" class="h-100">
                <label class="p-0" for="password">First Name</label>
                <BFormInput type="text" size="md" placeholder="Ex. Ly" />
            </BCol>
            <BCol sm="12" md="6" class="h-100">
                <label class="p-0" for="password">Last Name</label>
                <BFormInput type="text" size="md" placeholder="Ex. Leang seng" />
            </BCol>
            <BCol sm="12" md="6" class="h-100">
                <label class="p-0" for="password">Phone</label>
                <BFormInput type="text" size="md" placeholder="Ex. 015 844 712" />
            </BCol>
        </BRow>
        <h4 class="mt-4">{{ $t("system.account_security") }}</h4>
        <BRow class="row-gap-3">
            <BCol sm="12" md="6" class="h-100">
                <label class="p-0" for="password">Email</label>
                <BFormInput type="email" size="md" placeholder="Ex. ly.leangseng@example.com" />
            </BCol>
            <BCol sm="12" md="6" class="d-flex align-items-end justify-content-end">
                <BButton variant="outline-secondary">
                    {{ $t("system.change_email") }}
                </BButton>
            </BCol>

            <BCol sm="12" md="6" class="h-100">
                <label class="p-0" for="password">Password</label>
                <BFormInput type="password" size="md" placeholder="Ex. ********" />
            </BCol>
            <BCol sm="12" md="6" class="d-flex align-items-end justify-content-end">
                <BButton variant="outline-secondary">
                    {{ $t("system.change_password") }}
                </BButton>
            </BCol>
            <BCol class="text-end ">
                <BButton variant="outline-secondary" class="me-2">
                    {{ $t("system.cancel") }}
                </BButton>
                <BButton variant="outline-success">
                    {{ $t("system.save_changes") }}
                </BButton>
            </BCol>
        </BRow>
        <SwiperImagePreview v-model="isShowPreview" :image-urls="[imageUrl || image.defaultImage]" />
    </div>
</template>
<script lang="ts" setup>
import { BButton, BCol, BFormInput, BImg, BRow } from 'bootstrap-vue-next';
import { ref } from 'vue';
import { ImageUtil } from '../../../utils/ImageUtil';
import SwiperImagePreview from '../../../composables/SwiperImagePreview.vue';


const image = ImageUtil()
const htmlFile = ref<HTMLInputElement | null>(null);

const imageUrl = ref<string>("");
const isShowPreview = ref<boolean>(false);

const onUploadImage = () => {
    console.log("Upload image");
    if (htmlFile.value) {
        htmlFile.value.click();
    }
}

const onSavePhoto = () => {
    console.log("Save photo");
    // Implement save photo logic here
};

const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;
    const getCompressedImage = await image.Compress(file);
    imageUrl.value = getCompressedImage == "" ? image.defaultImage : URL.createObjectURL(getCompressedImage);

    console.log(getCompressedImage);
};

</script>