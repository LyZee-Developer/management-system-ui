import type { MenuConfigType } from "../types/menu_type";

// ----------- the module that we have to access on our system -----------
export const menuConfig: MenuConfigType[] = [
  {
    code: "communicate",
    url: "/communicate",
    name: "communicate",
    icon: "proicons:chat",
    sub: [
      {
        code: "chat",
        url: "/chat",
        name: "chat",
        icon: "tabler:brand-wechat",
      },
    ],
  },
  {
    code: "security",
    url: "/security",
    name: "security",
    icon: "proicons:lock",
    sub: [
      {
        code: "manage_password",
        url: "/manage_password",
        name: "password",
        icon: "tabler:password-user",
      },
    ],
  },
  {
    code: "budget",
    url: "/budget",
    name: "budget",
    icon: "tabler:moneybag",
    sub: [
      {
        code: "calculate_budget",
        url: "/calculate_budget",
        name: "calculate_budget",
        icon: "proicons:calculator",
      },
      {
        code: "purchase_plan",
        url: "/purchase_plan",
        name: "purchase_plan",
        icon: "proicons:checkbox-list",
      },
    ],
  },
];
