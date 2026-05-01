import { toast, type ToastOptions } from "vue3-toastify";
const ToastUtil = () => {
  const show = (message : string , type : 'info' | 'success' | 'error' | 'warning' | 'loading' | 'default') => {
    if(message == "") message = "New message!";
    toast(message, {
      autoClose: 2000,
      position: toast.POSITION.BOTTOM_RIGHT,
      type: type,
    } as ToastOptions);
  };
  return {
    show,
  };
};

export { ToastUtil };
