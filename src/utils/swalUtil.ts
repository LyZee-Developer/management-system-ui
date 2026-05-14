import Swal, { type SweetAlertOptions } from "sweetalert2";
import ThemeUtil from "./ThemeUtil";
import { StringConstant } from "../constants/stringConstant";

export const SwalUtil = () => {
  const theme = ThemeUtil();
  const show = (option: {
    title?: string;
    description?: string;
    confirmTitle?: string;
    icon?: "success" | "error" | "warning" | "info" | "question";
    timer?: number;
    hasCancel?: boolean;
    draggable?: boolean;
    progerss?: boolean;
    confirm: (isClickOk: boolean) => void;
  }) => {
    let isDarkMode = theme.getIsDark();
    const customizeOption = {
      title: option.title ?? "Are you sure?",
      text: option.description ?? "You won't be able to revert this!",
      icon: option.icon ?? "warning",
      showCancelButton: !option.hasCancel,
      draggable: !option.draggable,
      timerProgressBar: !option.progerss,
      confirmButtonColor: StringConstant.COLOR.MAIN_SYSTEM,
      cancelButtonColor: "rgba(116, 116, 116, 0.67)",
      confirmButtonText: option.confirmTitle ?? "Confirm",
      theme: isDarkMode ? "dark" : "light", // support dark mode and light mode
    } as SweetAlertOptions;
    if (option.timer && option.timer > 0) { 
      customizeOption.timer = option.timer;
    }
    Swal.fire(customizeOption).then((result: any) => {
      if (result.isConfirmed) {
        option.confirm(true);
      }
    });
  };
  return {
    show,
  };
};
