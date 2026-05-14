import type { MenuConfigType } from "../types/menuType";

// ----------- the module that we have to access on our system -----------
export const menuConfig: MenuConfigType[] = [
  {
    code: "communicate",
    url: "/communicate",
    name: "communicate",
    icon: "proicons:chat",
    type: "module",
    sub: [
      {
        code: "chat",
        url: "/chat",
        name: "chat",
        type: "sub_module",
        icon: "tabler:brand-wechat",
      },
    ],
  },
  {
    code: "security",
    url: "/security",
    name: "security",
    icon: "proicons:lock",
    type: "module",
    sub: [
      {
        code: "password",
        url: "/manage_password",
        name: "password",
        type: "sub_module",
        icon: "tabler:password-user",
      },
    ],
  },
  {
    code: "budget",
    url: "/budget",
    name: "budget",
    icon: "tabler:moneybag",
    type: "module",
    sub: [
      {
        code: "break_money",
        url: "/break_money",
        name: "Break Money",
        type: "sub_module",
        icon: "ep:money",
      },
      {
        code: "calculate_budget",
        url: "/calculate_budget",
        name: "calculate budget",
        type: "sub_module",
        icon: "proicons:calculator",
      },
      {
        code: "purchase_plan",
        url: "/purchase_plan",
        name: "purchase plan",
        type: "sub_module",
        icon: "proicons:checkbox-list",
      },
    ],
  },
];
