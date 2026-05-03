import type { BaseType } from "../types/baseType";
import { StringConstant } from "./stringConstant";

export const SettingItems: BaseType[] = [
  {
    code: StringConstant.PROFILE,
    name: "Profile",
    icon: "proicons:person-circle",
  },
  {
    code: StringConstant.LOG_OUT,
    name: "Logout",
    icon: "proicons:door-open",
  },
];
