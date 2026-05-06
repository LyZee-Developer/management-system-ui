import axios from "axios";
import { defineStore } from "pinia";
import { ToastUtil } from "../utils/ToastUtil";
import { reactive } from "vue";
import type {
  UserInfo,
  UserInfoStoreType,
} from "../types/Register/RegisterType";
import { StringConstant } from "../constants/stringConstant";
import { ObjectUtil } from "../utils/ObjectUtil";
import { RouteUtil } from "../utils/RouteUtil";
import { useAuthStore } from "./authStore";

export const useUserInfoStore = defineStore("userInfo", () => {
  const toast = ToastUtil();
  const objUtil = ObjectUtil();
  const route = RouteUtil();
  const auth = useAuthStore();

  const data = reactive<UserInfoStoreType>({
    info: {} as UserInfo,
  });

  const getUserInfo = async (userLoginId: number, token: string) => {
    try {
      auth.data.token = token;
      console.log("token ", token);
      const res = await axios.get(`api/user_login/user_info/${userLoginId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      data.info = res.data?.data;
      auth.data.accountInfo = data?.info;
      setLocalDataStorage(data.info, token);
    } catch (error: any) {
      if (error.response) {
        toast.show(error.response.data.errors, "error");
      }
    }
  };

  const setLocalDataStorage = (data: any, token: string) => {
    localStorage.setItem(StringConstant.USER_INFO, JSON.stringify(data));
    localStorage.setItem(StringConstant.TOKEN, token);
  };

  const checkUserInfo = () => {
    let userInfo = localStorage.getItem(StringConstant.USER_INFO)!;
    let obj = JSON.parse(userInfo);
    if (obj == null) {
      route.setNewRoute("/login");
      return;
    }
    data.info = JSON.parse(userInfo);
    auth.data.accountInfo = data?.info;
  };

  const clearLocalUserInfo = () => {
    localStorage.removeItem(StringConstant.USER_INFO);
  };

  return {
    getUserInfo,
    checkUserInfo,
    clearLocalUserInfo,
    data,
  };
});
