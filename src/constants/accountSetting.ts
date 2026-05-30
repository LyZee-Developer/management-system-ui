import { StringConstant } from "./stringConstant";

const account_items = [
  {
    name: StringConstant.ACCOUNT_SETTING.APP,
    icon: "proicons:laptop",
  },
  {
    name: StringConstant.ACCOUNT_SETTING.ACCOUNT,
    icon: "proicons:person-circle",
  },
  {
    name: StringConstant.ACCOUNT_SETTING.NOTIFICATION,
    icon: "material-symbols:notification-audio-outline",
  },
  {
    name: StringConstant.ACCOUNT_SETTING.LANGUAGE_AND_REGION,
    icon: "solar:global-outline",
  },
];
const workspace_items = [
  {
    name: StringConstant.WORKSPACE_SETTING.GENERAL,
    icon: "mingcute:settings-2-line",
  },
  {
    name: StringConstant.WORKSPACE_SETTING.MEMBERS,
    icon: "ic:round-person-add-alt-1",
  },
  {
    name: StringConstant.WORKSPACE_SETTING.BILLING,
    icon: "mingcute:bill-2-line",
  },
];

export default { account_items, workspace_items };
