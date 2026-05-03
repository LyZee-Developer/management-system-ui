import { toast, type ToastOptions } from "vue3-toastify";
import { StringConstant } from "../constants/stringConstant";
import ThemeUtil from "./ThemeUtil";
const ToastUtil = () => {
  const theme = ThemeUtil();

  const show = (message : string , type : 'info' | 'success' | 'error' | 'warning' | 'loading' | 'default') => {
    let is_dark = theme.getIsDark();
    if(message == "") message = "New message!";
    toast(message, {
      theme: is_dark ? StringConstant.DARK : StringConstant.LIGHT,
      autoClose: 2000,
      position: toast.POSITION.BOTTOM_RIGHT,
      transition: StringConstant.ZOOM,
      type: type,
    } as ToastOptions);
  };
  
  return {
    show,
  };
};

export { ToastUtil };
