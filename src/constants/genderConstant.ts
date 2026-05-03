import type { BaseType } from "../types/baseType";
import { StringConstant } from "./stringConstant";

export const genders: BaseType[] = [
  {
    code: StringConstant.FEMALE,
    name: "female",
    icon: "material-symbols:female-rounded",
  },
  {
    code: StringConstant.MALE,
    name: "Male",
    icon: "material-symbols:male-rounded",
  },
];
