import type { BaseType } from "../types/baseType";
import { StringConstant } from "./stringConstant";

export const SettingConstant: BaseType[] = [
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


export const ChatOptionConstant: BaseType[] = [
  {
    code: StringConstant.CLEAR_CHAT,
    name: "Clear Chat",
    icon: "mingcute:brush-3-line",
  },
  {
    code: StringConstant.BLOCK,
    name: "Block",
    icon: "streamline:interface-user-block-actions-block-close-denied-deny-geometric-human-person-single-up-user",
  },
  {
    code: StringConstant.ACTION.DELETE,
    name: "Delete",
    icon: "streamline:interface-block-remove-circle-garbage-trash-delete",
  },
];

export const MessageAction: BaseType[] = [
  {
    code: StringConstant.MESSAGE_ACTION.UNSEND,
    name: "unsend",
    icon: "material-symbols:delete-outline-rounded",
  },
];