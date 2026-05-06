export interface UserAccessOnlineType {
  colorName: string;
  lastAccess: null | LastAccessType;
  username: string;
}

export interface LastAccessType {
  date: string;
  id: number;
  type: string;
}
