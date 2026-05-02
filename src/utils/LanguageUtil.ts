import { useI18n } from "vue-i18n";

export const LanguageUtil = () => {
  const { locale } = useI18n<{}, "en" | "km">();

  //========= user want to use other lanauge =========
  const setLanguage = (language: "en" | "km") => {
    locale.value = language;
  };

  const getLanguage = (): string => {
    return locale.value;
  };

  return {
    setLanguage,
    getLanguage,
  };
};
