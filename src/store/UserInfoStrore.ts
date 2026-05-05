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

export const useUserInfoStore = defineStore("userInfo", () => {
  const toast = ToastUtil();
  const objUtil = ObjectUtil();
  const route = RouteUtil();

  const data = reactive<UserInfoStoreType>({
    info: {} as UserInfo,
  });

  const getUserInfo = async (userLoginId: number) => {
    try {
      const res = await axios.get(`api/user_login/user_info/${userLoginId}`);
      data.info = res.data.data;
      localStorage.setItem(StringConstant.USER_INFO, JSON.stringify(data.info));
    } catch (error: any) {
      if (error.response) {
        toast.show(error.response.data.errors, "error");
      }
    }
  };

  const checkUserInfo = () => {
    let userInfo = localStorage.getItem(StringConstant.USER_INFO)!;
    let obj =  JSON.parse(userInfo);
    if(obj == null){
      route.setNewRoute("/login")
      return;
    }
    data.info = JSON.parse(userInfo);
  };

  const clearLocalUserInfo = () => {
    localStorage.removeItem(StringConstant.USER_INFO);
  }

  return {
    getUserInfo,
    checkUserInfo,
    clearLocalUserInfo,
    data,
  };
});
