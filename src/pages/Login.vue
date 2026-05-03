<template>
    <BContainer fluid :class="styleFlexCenter" style="height: 100vh;">
        <BRow class="w-100 justify-content-center">
            <BCol lg="4" md="7" sm="10">
                <BCard class="w-100 rounded-4">
                    <h3 class="fw-bold">Hello! Welcome</h3>
                    <BContainer class="d-grid gap-lg-3">
                        <BRow>
                            Sign up to Get Started
                        </BRow>
                        <BRow>
                            <label class="p-0" for="username">Username</label>
                            <BFormInput id="username" placeholder="Enter username" v-model="data.username"
                                :state="stateUsername" />
                        </BRow>
                        <BRow>
                            <label class="p-0" for="password">Password</label>
                            <BFormInput id="password" placeholder="Enter password" type="password"
                                v-model="data.password" :state="statePassword" />
                        </BRow>
                        <!-- user want to create new account -->
                        <BRow v-if="isCreateAccount">
                            <label class="p-0" for="confirm_password">Confirm password</label>
                            <BFormInput id="confirm_password" placeholder="Enter confirm password" type="password"
                                v-model="data.confirmPassword" :state="stateConfirmPassword" />
                        </BRow>
                        <BRow role="button" @click="onClickCreate">
                            {{ isCreateAccount ? 'Continues to login.' : 'Create new account.' }}
                        </BRow>
                        <BRow>
                            <BButton :loading="isProcessLogin" variant="primary" class="text-white"
                                @click="onClickSubmit">{{ isCreateAccount ? 'Register' : 'Login' }}</BButton>
                        </BRow>
                    </BContainer>
                </BCard>
            </BCol>
        </BRow>

        <BModal v-model="isShowModal" centered header-class="border-bottom-0" title="Welcome to M-A-S" size="md"
            footer-class="border-top-0">
            <div class="d-flex flex-column gap-3 px-3">
                <BRow>
                    <div class="w-100 d-flex justify-content-center">
                        <BAvatar size="5rem" class="fs-2">{{
                            data.username.slice(0, 1) ?? "." }}</BAvatar>
                    </div>
                </BRow>
                <BRow>
                    <label class="p-0" for="name">Name</label>
                    <BFormInput id="name" placeholder="Enter name" v-model="userInfo.name" />
                </BRow>
                <BRow>
                    <label class="p-0" for="email">Email</label>
                    <BFormInput id="email" v-model="userInfo.email" placeholder="Enter email" type="email" />
                </BRow>
                <BRow class="px-0">
                    <BCol cols="9" class="p-0">
                        <label class="p-0" for="phone">Phone</label>
                        <BFormInput id="phone" placeholder="Enter phone" v-model="userInfo.phone" type="text" />
                    </BCol>
                    <BCol cols="3">
                        <BDropdown :text="gender" variant="warning" class="mt-4 w-100">
                            <BDropdownItem @click="() => onPickGender(gender)" v-for="gender in genders">
                                <div class="d-flex align-items-center gap-3">
                                    <BAvatar size="30"
                                        :class="gender.code == StringConstant.FEMALE ? 'bg-danger' : 'bg-info'">
                                        <Icon :icon="gender.icon!" width="301" height="193" />
                                    </BAvatar>
                                    <div>{{ gender.name }}</div>
                                </div>
                            </BDropdownItem>
                        </BDropdown>
                    </BCol>
                </BRow>
            </div>
        </BModal>
    </BContainer>
</template>
<script setup lang="ts">
import { BAvatar, BButton, BCard, BCol, BContainer, BDropdown, BDropdownItem, BFormInput, BModal, BRow } from 'bootstrap-vue-next';
import { computed, ref, watch } from 'vue';
import { ToastUtil } from '../utils/ToastUtil';
import { genders } from '../constants/genderConstant';
import { Icon } from '@iconify/vue';
import { StringConstant } from '../constants/stringConstant';
import type { BaseType } from '../types/baseType';
import { ObjectUtil } from '../utils/ObjectUtil';

const toast = ToastUtil();

const obj = ObjectUtil();
const isCreateAccount = ref<boolean>(false);
const isFirstLogin = ref<boolean>(true);
const isProcessLogin = ref<boolean>(false);
const pickGender = ref<BaseType>({} as BaseType);
const styleFlexCenter = "d-flex justify-content-center align-items-center";
const isShowModal = ref<boolean>(true);

// ==== show up error imeditly when infor empty
const stateUsername = computed(() => data.value.username !== "");
const statePassword = computed(() => data.value.password !== "");
const stateConfirmPassword = computed(() => data.value.confirmPassword !== "");

watch(isCreateAccount, () => {
    isFirstLogin.value = true;
    setIsProcessLogin(false);
    data.value.username = "";
    data.value.confirmPassword = "";
    data.value.password = "";
})

const gender = computed<string>(() => {
    let isEmptyObject = obj.checkObject(pickGender.value);
    let gender = "";
    if (isEmptyObject) gender = StringConstant.GENDER;
    else {
        let isSelectFemale = pickGender.value && pickGender.value.code == StringConstant.FEMALE;
        if (isSelectFemale) gender = StringConstant.FEMALE;
        else gender = StringConstant.MALE;
    }
    return gender;
})

const onClickCreate = () => {
    // ====== user switch to login or create new
    isCreateAccount.value = !isCreateAccount.value;
}

const data = ref<{
    username: string,
    password: string,
    confirmPassword: string,
}>({
    username: "",
    password: "",
    confirmPassword: "",
})

const userInfo = ref<{
    name: string,
    email: string,
    phone: string,
    gender: string,
}>({
    name: "",
    email: "",
    phone: "",
    gender: "",
})

const onPickGender = (gender: BaseType) => {
    pickGender.value = gender;
}

const onClickSubmit = () => {
    let confirm_password: string = data.value.confirmPassword.trim();
    let password: string = data.value.password.trim();
    let username: string = data.value.username.trim();

    setIsProcessLogin(true);
    isShowModal.value = true;
    isFirstLogin.value = false;

    //========== requied value ===========
    var isSomeInfoEmpty: boolean = password == "" || username == "";
    if (isSomeInfoEmpty && !isCreateAccount.value) {
        toast.show("Please input some with your user account here", "error")
        return;
    }

    if (password !== confirm_password && isCreateAccount.value) {
        toast.show("Your passsword not match each other!😒", "error")
    }
    setIsProcessLogin(false);
}

const setIsProcessLogin = (isProcess: boolean) => {
    isProcessLogin.value = isProcess;
}

</script>
