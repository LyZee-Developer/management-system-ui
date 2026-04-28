<template>
    <div
        class="w-full px-3 flex justify-center items-center h-screen bg-center bg-cover bg-[url('../assets/background/background.avif')]">\
        <Toast />
        <div
            class="max-w-87.5 gap-y-5 w-full px-10 flex max-[400px]:px-7 transition-all py-10 flex-col items-center bg-white/30 backdrop-blur-md  rounded-3xl">
            <div class="flex items-center flex-col gap-y-2">
                <div class="w-17 h-17 bg-white rounded-full flex justify-center items-center">
                    <i class="pi pi-user" style="font-size: 2rem"></i>
                </div>
                <h5 class="text-xl font-medium">Customer Login</h5>
            </div>
            <div class="flex flex-col gap-1 w-full">
                <FloatLabel>
                    <label for="username">Username</label>
                    <InputText name="username" @update:modelValue="onInput" v-model="data.username" type="text" fluid />
                </FloatLabel>
                <span v-if="data.username.trim() == '' && !isFirstLogin" class="text-red-700 text-[13px]">Username is required</span>
                <span v-if="isUsernameNumber" class="text-red-700 text-[13px]">Username get letter only</span>
            </div>
            <div class="flex flex-col gap-1 w-full">
                <FloatLabel>
                    <Password  v-model="data.password" placeholder="Password" toggleMask fluid />
                </FloatLabel>
                <span v-if="data.password.trim() == '' && !isFirstLogin" class="text-red-700 text-[13px]">Password is required</span>
            </div>
            <div class="flex flex-col gap-1 w-full" v-if="isCreateAccount">
                <FloatLabel>
                    <Password  v-model="data.confirmPassword" placeholder="Confirm Password" toggleMask fluid />
                </FloatLabel>
                <span v-if="data.confirmPassword.trim() == '' && !isFirstLogin" class="text-red-700 text-[13px]">Confirm Password is required</span>
            </div>
            <p class="cursor-pointer" @click="isCreateAccount = true" v-if="!isCreateAccount">Register or create account</p>
            <p class="cursor-pointer" @click="isCreateAccount = false" v-else>Back to access system</p>
            <Button label="Login" class="w-full" severity="info" @click="onClickSubmit" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { Button, FloatLabel, InputText, Password, Toast, useToast } from 'primevue';
import { ref, watch } from 'vue';
const toast = useToast();
const isCreateAccount = ref<boolean>(false);
const isUsernameNumber = ref<boolean>(false);
const isFirstLogin = ref<boolean>(true);
watch(isCreateAccount,()=>{
    isFirstLogin.value = true;
    data.value.username = "";
    data.value.confirmPassword = "";
    data.value.password = "";
})


const data = ref<{
    username:string,
    password:string,
    confirmPassword:string,
}>({
    username:"",
    password:"",
    confirmPassword:"",
})

const show = (message:string="",type:string) => {
    toast.add({ 
        summary: 'Check here',
        severity: type,
        detail: message, 
        life: 3000 
    });
};

const onInput = (e: any) => {
    if(e.trim() == "") {
        isUsernameNumber.value = false;
        return;
    }
    const isValid = /^[a-zA-Z]+$/.test(e)
    console.log(isValid) // false
    isUsernameNumber.value = !isValid;
}

const onClickSubmit=()=>{
    isFirstLogin.value = false;
    if(data.value.confirmPassword.trim() == "" || data.value.password.trim() == "" ||  data.value.username.trim() == "" ) return;
    if(data.value.password !== data.value.confirmPassword && isCreateAccount.value){
        show("Your passsword not match each other!😒","error")
    }
}

</script>
