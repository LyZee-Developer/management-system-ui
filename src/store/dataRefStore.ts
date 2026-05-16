import { defineStore } from "pinia";
import { reactive } from "vue";
import { ApiUtil } from "../utils/HttpUtil";
import { ToastUtil } from "../utils/ToastUtil";
import { RouteApi } from "../constants/routeApiConstant";
import { StringConstant } from "../constants/stringConstant";

export const useDataRefStore = defineStore("dataRef", () => {
  const api = ApiUtil();
  const toast = ToastUtil();
  const data = reactive<{
    dataRefs: any[];
  }>({
    dataRefs: [],
  });

  const getDataRefByCode = async (code: string) => {
    try {
      const res:any = await api.https({
        data: {
          code: code,
        },
        method: StringConstant.POST,
        url: RouteApi.dataRef.list,
      });

      console.log("res data ref", res.data[0].child);
      data.dataRefs = res.data[0]?.child || [];
    } catch (error: any) {
      console.log(error);
      toast.show(error, "error");
    }
  };
  return {
    data,
    getDataRefByCode,
  };
});
