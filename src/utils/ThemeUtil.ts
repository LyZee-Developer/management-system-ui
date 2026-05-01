import { useDark, useToggle } from "@vueuse/core";
const ThemeUtil = () => {
  const is_dark_mode = useDark();
  const toggleDark = useToggle(is_dark_mode);

  const changeThem = () => {
    toggleDark();
  };

  const getIsDark = (): boolean => {
    return useDark().value;
  };
  
  return {
    changeThem,
    getIsDark
  };
};

export default ThemeUtil;
