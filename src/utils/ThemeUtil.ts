import { useDark, useToggle } from "@vueuse/core";
import { StringConstant } from "../constants/stringConstant";
const ThemeUtil = () => {
  const is_dark_mode = useDark();
  const toggleDark = useToggle(is_dark_mode);

  const changeThem = () => {
    toggleDark();
    setThemeToSystem();
  };

  const setThemeToSystem = () => {
    const body = document.body;
    const theme = is_dark_mode.value
      ? StringConstant.DARK
      : StringConstant.LIGHT;
    body.setAttribute("data-bs-theme", theme);
  };

  const getIsDark = (): boolean => {
    return useDark().value;
  };

  return {
    changeThem,
    getIsDark,
    setThemeToSystem,
  };
};

export default ThemeUtil;
