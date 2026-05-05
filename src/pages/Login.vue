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
                            <span class="text-danger p-0 fs-6 fst-italic"
                                v-if="(data.username.length < 5 && data.username.length > 0) && !containNumber">{{
                                    $t("system.your_name_very_short") }}</span>
                            <span class="text-danger p-0 fs-6 fst-italic"
                                v-else-if="containNumber && data.username.length > 0">{{
                                    $t("system.name_is_not_allow_have_number") }}</span>
                            <span class="text-danger p-0 fs-6 fst-italic"
                                v-else-if="usernameHasSpace && data.username.length > 0">{{
                                    $t("system.name_not_allow_space") }}</span>

                        </BRow>
                        <BRow>
                            <label class="p-0" for="password">Password</label>
                            <BFormInput id="password" placeholder="Enter password" type="password"
                                v-model="data.password" :state="statePassword" />
                            <span class="text-danger p-0 fs-6 fst-italic"
                                v-if="isWeakPassword && data.password.length > 0">{{
                                    $t("system.your_password_is_weak") }}</span>
                        </BRow>
                        <!-- user want to create new account -->
                        <BRow v-if="isCreateAccount">
                            <label class="p-0" for="confirm_password">Confirm password</label>
                            <BFormInput id="confirm_password" placeholder="Enter confirm password" type="password"
                                v-model="data.confirmPassword" :state="stateConfirmPassword" />
                            <span class="text-danger p-0 fs-6 fst-italic"
                                v-if="isWeakPassword && data.confirmPassword.length > 0">{{
                                    $t("system.your_password_is_weak") }}</span>
                        </BRow>
                        <BRow role="button" @click="onClickCreate">
                            {{ isCreateAccount ? 'Continues to login.' : 'Create new account.' }}
                        </BRow>
                        <BRow>
                            <BButton :loading="isProcessLogin" :disabled="isDisabledLogin" variant="primary"
                                class="text-white" @click="onClickSubmit">{{ isCreateAccount ? 'Register' : 'Login' }}
                            </BButton>
                        </BRow>
                    </BContainer>
                </BCard>
            </BCol>
        </BRow>

        <BModal v-model="isShowModal" centered header-class="border-bottom-0" title="Welcome to M-A-S" size="md"
            @ok="onClickOk" footer-class="border-top-0">
            <div class="d-flex flex-column gap-3 px-3">
                <BRow>
                    <div class="w-100 d-flex  justify-content-center">
                        <div class="d-flex flex-column justify-content-center align-items-center gap-3">
                            <BAvatar size="5rem" :style="{ backgroundColor: `${hexColor} !important`, color: '#fff' }"
                                class="fs-2">{{
                                    getFirstLetterName ?? "." }} </BAvatar>
                            <h3>{{ name }}</h3>
                        </div>
                    </div>
                </BRow>
                <BRow>
                    <label class="p-0" for="name">{{ $t("system.name") }}</label>
                    <BFormInput id="name" placeholder="Enter name" type="text" v-model="userInfo.name"
                        @input="userInfo.name = $event.replace(/[^a-zA-Z]/g, '')" />
                    <span class="text-danger p-0 fs-6 fst-italic"
                        v-if="containNumber && userInfo.name.length > 0">{{
                            $t("system.name_is_not_allow_have_number") }}</span>
                </BRow>
                <BRow>
                    <label class="p-0" for="email">{{ $t("system.email") }}</label>
                    <BFormInput id="email" v-model="userInfo.email" placeholder="Enter email" type="email" />
                    <span class="text-danger"
                        v-if="(!userInfo.email.includes('@') || !userInfo.email.includes('.com')) && userInfo.email.length > 0">Something
                        wrong with
                        your email!</span>
                </BRow>
                <BRow class="px-0">
                    <BCol cols="9" class="p-0">
                        <label class="p-0" for="phone">{{ $t("system.phone") }}</label>
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
import { computed, onMounted, ref, watch } from 'vue';
import { ToastUtil } from '../utils/ToastUtil';
import { genders } from '../constants/genderConstant';
import { Icon } from '@iconify/vue';
import { StringConstant } from '../constants/stringConstant';
import type { BaseType } from '../types/baseType';
import { ObjectUtil } from '../utils/ObjectUtil';
import { GenerateUtil } from '../utils/GenerateUtil';
import axios from 'axios';
import { RouteUtil } from '../utils/RouteUtil';
import { PasswordUtil } from '../utils/PasswordUtil';
import type { LoginAccess } from '../types/Register/RegisterType';
import { useUserInfoStore } from '../store/UserInfoStrore';

const toast = ToastUtil();
const generateColor = GenerateUtil();
const route = RouteUtil();
const obj = ObjectUtil();
const pw = PasswordUtil();
const useInfoStore = useUserInfoStore()

const isCreateAccount = ref<boolean>(false);
const isFirstLogin = ref<boolean>(true);
const isProcessLogin = ref<boolean>(false);
const pickGender = ref<BaseType>({} as BaseType);
const styleFlexCenter = "d-flex justify-content-center align-items-center";
const isShowModal = ref<boolean>(false);
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

// ==== show up error imeditly when infor empty
const stateUsername = computed(() => data.value.username !== "");
const statePassword = computed(() => data.value.password !== "");
const name = computed(() => getName());
const stateConfirmPassword = computed(() => data.value.confirmPassword !== "");
const containNumber = computed<boolean>(() => /[A-Za-z]/.test(data.value.username) && /\d/.test(data.value.username));
const usernameHasSpace = computed<boolean>(() => data.value.username.includes(" "));
const isWeakPassword = computed<boolean>(() => pw.isWeakPassword(data.value.password));
const isWeakConfirmPassword = computed<boolean>(() => pw.isWeakPassword(data.value.confirmPassword));
const isDisabledLogin = computed<boolean>(() => {
    var isLoginCreate = (containNumber.value ||
        isWeakPassword.value ||
        (data.value.password?.length ?? 0) < 6 ||
        (data.value.username?.length ?? 0) < 5);

    return isCreateAccount.value ? isLoginCreate || isWeakConfirmPassword.value : isLoginCreate;
}
);
const getFirstLetterName = computed(() => {
    let name = getName();
    return name.slice(0, 1);
})

const getName = (): string => {
    let username = data.value.username;
    let userInfoName = userInfo.value.name;
    let name = userInfoName == "" ? username : userInfoName;
    return name;
}

const onClickOk = () => {
    createNewAccount(true);
}

const hexColor = computed<string>(() => {
    return generateColor.stringToHexColor(getName());
})

watch(isCreateAccount, () => {
    isFirstLogin.value = true;
    setIsProcessLogin(false);
    data.value.username = "";
    data.value.confirmPassword = "";
    data.value.password = "";
})

onMounted(() => {
    clearFormData();
})

const clearFormData = () => {
    data.value.confirmPassword = "";
    data.value.username = "";
    data.value.password = "";

    userInfo.value.email = "";
    userInfo.value.gender = StringConstant.GENDER;
    userInfo.value.phone = "";
    userInfo.value.name = "";
}

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

const onPickGender = (gender: BaseType) => {
    pickGender.value = gender;
    userInfo.value.gender = gender.code;
}

const onClickSubmit = () => {
    let confirm_password: string = data.value.confirmPassword.trim();
    let password: string = data.value.password.trim();
    let username: string = data.value.username.trim();

    setIsProcessLogin(true);
    isFirstLogin.value = false;

    //========== requied value ===========
    var isSomeInfoEmpty: boolean = password == "" || username == "";
    let isLogin = !isCreateAccount.value;
    if (isSomeInfoEmpty && isLogin) {
        toast.show("Please input some with your user account here", "error")
        isProcessLogin.value = false;
        return;
    } else if (confirm_password == "" && !isLogin) {
        toast.show("Please input some with your user account here", "error")
        isProcessLogin.value = false;
        return;
    }

    if (password !== confirm_password && isCreateAccount.value) {
        toast.show("Your passsword not match each other!😒", "error")
        isProcessLogin.value = false;
    }

    if (password === confirm_password && isCreateAccount.value) {
        isProcessLogin.value = false;
        isShowModal.value = true;
    } else {
        createNewAccount(false)
    }

}

const createNewAccount = async (isRegister: boolean) => {
    try {
        let url = `/api/user_login/${isRegister ? `register` : `login`}`;
        let send: LoginAccess = {
            username: data.value.username,
            password: data.value.password,
            userInfo: {},
        }
        if (isRegister) {
            send.userInfo.email = userInfo.value.email;
            send.userInfo.gender = userInfo.value.gender;
            send.userInfo.hex = hexColor.value;
            send.userInfo.name = userInfo.value.name == "" ? data.value.username : userInfo.value.name;
            send.userInfo.phone = userInfo.value.phone;
        }
        const response = await axios.post(url, send)
        if (response.data.status == "Success") {

            let userLoginId = response.data.data;
            let isSuccess = userLoginId > 0;
            let message = isRegister ? isSuccess ? `Register account successfully!` : `Login fail!` : "Welcome to our system M-A-S 🎉🎉";

            toast.show(message, isSuccess ? "success" : "error");

            if (isSuccess) {
                useInfoStore.getUserInfo(userLoginId);
                route.setNewRoute("/")
            }

        }
        setIsProcessLogin(false);
    } catch (error: any) {
        isProcessLogin.value = false;
        if (error.response) {
            toast.show(error.response.data.errors, "error");
        }
    }
}

const setIsProcessLogin = (isProcess: boolean) => {
    isProcessLogin.value = isProcess;
}

</script>
