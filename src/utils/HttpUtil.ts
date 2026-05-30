import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { ToastUtil } from "./ToastUtil";
import type { ApiType } from "../types/apiType";
import { StringConstant } from "../constants/stringConstant";
import { RouteUtil } from "./RouteUtil";

export const ApiUtil = () => {
  const auth = useAuthStore();
  const toast = ToastUtil();
  const route = RouteUtil();

  const https = async (api: ApiType) => {
    try {
      let token = auth.data.token;
      console.log(token);
      if (token == "") {
        let localStore = localStorage.getItem(StringConstant.TOKEN)!;
        token = localStore;
      }
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let res = {
        data: {},
      };
      if (api.method == "get") res = await axios.get(api.url, header);
      else if (api.method == "post") {
        res = await axios.post(api.url, api.data, header);
      }

      return res?.data;
    } catch (error: any) {
      if (error.response) {
        console.log("error", error.response.statusText);
        let messge =
          error.response.data.errors == undefined
            ? "Something went wrong!."
            : error.response.data.errors;
        toast.show(messge, "error");
        setTimeout(() => {
          if (error.response.status === 401) {
            route.setNewRoute("/login");
          }
        }, 2000);
      }
      throw new Error(error.response.data.errors);
    }
  };

  return {
    https,
  };
};
