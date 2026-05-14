import { defineStore } from "pinia";
import { reactive } from "vue";
import type { MenuConfigType } from "../types/menuType";

export const useMenuStore = defineStore("menuStore", () => {
  const data = reactive<{
    selectedParent: MenuConfigType;
  }>({
    selectedParent: {} as MenuConfigType,
  });
  return {
    data,
  };
});
