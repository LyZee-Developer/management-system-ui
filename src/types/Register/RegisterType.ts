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
  userInfo: RegisterType
}
