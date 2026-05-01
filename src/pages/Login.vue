<template>
    <BContainer fluid :class="style_flex_center" style="height: 100vh;">
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
                                :state="state_username" />
                        </BRow>
                        <BRow>
                            <label class="p-0" for="password">Password</label>
                            <BFormInput id="password" placeholder="Enter password" type="password"
                                v-model="data.password" :state="state_password" />
                        </BRow>
                        <!-- user want to create new account -->
                        <BRow v-if="is_create_account">
                            <label class="p-0" for="confirm_password">Confirm password</label>
                            <BFormInput id="confirm_password" placeholder="Enter confirm password" type="password"
                                v-model="data.confirmPassword" :state="state_confirm_password" />
                        </BRow>
                        <BRow role="button" @click="onClickCreate">
                            {{ is_create_account ? 'Continues to login.' : 'Create new account.' }}
                        </BRow>
                        <BRow>
                            <BButton :loading="is_process_login" variant="primary" class="text-white"
                                @click="onClickSubmit">{{ is_create_account ? 'Register' : 'Login' }}</BButton>
                        </BRow>
                    </BContainer>
                </BCard>
            </BCol>
        </BRow>
    </BContainer>
</template>
<script setup lang="ts">
import { BButton, BCard, BCol, BContainer, BFormInput, BRow } from 'bootstrap-vue-next';
import { computed, ref, watch } from 'vue';
import { ToastUtil } from '../utils/ToastUtil';

const toast = ToastUtil();

const is_create_account = ref<boolean>(false);
const is_user_input_number = ref<boolean>(false);
const is_first_login = ref<boolean>(true);
const is_process_login = ref<boolean>(false);
const style_flex_center = "d-flex justify-content-center align-items-center";

// ==== show up error imeditly when infor empty
const state_username = computed(() => data.value.username !== "");
const state_password = computed(() => data.value.password !== "");
const state_confirm_password = computed(() => data.value.confirmPassword !== "");

watch(is_create_account, () => {
    is_first_login.value = true;
    setIsProcessLogin(false);
    data.value.username = "";
    data.value.confirmPassword = "";
    data.value.password = "";
})

const onClickCreate = () => {
    // ====== user switch to login or create new
    is_create_account.value = !is_create_account.value;
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

const onInput = (e: any) => {
    if (e.trim() == "") {
        is_user_input_number.value = false;
        return;
    }
    const isValid = /^[a-zA-Z]+$/.test(e)
    console.log(isValid) // false
    is_user_input_number.value = !isValid;
}

const onClickSubmit = () => {
    let confirm_password: string = data.value.confirmPassword.trim();
    let password: string = data.value.password.trim();
    let username: string = data.value.username.trim();

    setIsProcessLogin(true);
    is_first_login.value = false;

    //========== requied value ===========
    var is_some_info_empty: boolean = password == "" || username == "";
    if (is_some_info_empty && !is_create_account.value) {
        toast.show("Please input some with your user account here", "error")
        return;
    }

    if (password !== confirm_password && is_create_account.value) {
        toast.show("Your passsword not match each other!😒", "error")
    }
    setIsProcessLogin(false);
}

const setIsProcessLogin = (is_process : boolean) => {
    is_process_login.value = is_process;
}

</script>
