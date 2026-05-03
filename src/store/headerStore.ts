import { defineStore } from "pinia";
import { reactive } from "vue";

export const useHeaderStore = defineStore("header", () => {
  const data = reactive({
    isShowBreadcrumb: false,
    isShowHeader: false,
  });

  const setIsShowBreadcrumb = (isShow: boolean) => {
    data.isShowBreadcrumb = isShow;
  };

  const setIsShowHeader = (isShow: boolean) => {
    data.isShowHeader = isShow;
  };

  return {
    data,
    setIsShowBreadcrumb,
    setIsShowHeader,
  };
});
