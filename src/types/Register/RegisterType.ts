export interface RegisterType {
  hex?: string;
  name?: string;
  email?: string;
  gender?: string;
  phone?: string;
}

export interface LoginAccess {
  username: string;
  password: string;
  userInfo: RegisterType;
}

export interface UserInfoStoreType {
  info: UserInfo;
}

export interface UserInfo {
  createBy?: string;
  createDate?: string;
  email?: string;
  gender?: string;
  hex?: string;
  id?: number;
  isActivate?: boolean;
  name?: string;
  phone?: string;
  updateBy?: null | string;
  updateDate?: null | string;
}
