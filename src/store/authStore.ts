import { defineStore } from "pinia";
import { reactive } from "vue";
import type { UserInfo } from "../types/Register/RegisterType";

interface AuthStoreType {
  accountInfo: UserInfo;
  token: string;
}

export const useAuthStore = defineStore("authStore", () => {
  const data = reactive<AuthStoreType>({
    accountInfo: {},
    token: "",
  });
  
  const authLogin = () => {};
  return {
    data,
    authLogin,
  };
});
