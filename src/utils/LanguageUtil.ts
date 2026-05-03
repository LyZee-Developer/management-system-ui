import { useI18n } from "vue-i18n";
import type { SupportLanguage } from "../types/langaugeType";

export const LanguageUtil = () => {
  const { locale } = useI18n<{}, SupportLanguage>();

  //========= user want to use other lanauge =========
  const setLanguage = (language: SupportLanguage) => {
    locale.value = language;
    setFont(language);
  };

  const setFont = (supportLanguage: SupportLanguage) => {
    let body = document.body;

    body.setAttribute("class", supportLanguage);
  };
  const getLanguage = (): string => {
    return locale.value;
  };

  return {
    setLanguage,
    getLanguage,
  };
};
