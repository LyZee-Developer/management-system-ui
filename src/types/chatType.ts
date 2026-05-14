export interface UserAccessOnlineType {
  colorName: string;
  lastAccess: null | LastAccessType | TrackUserAccessesType;
  username: string;
  userId: number;
}

export interface LastAccessType {
  date: string;
  id: number;
  type: string;
}

export interface Member {
  dateJoin: string;
  id: number;
  lastSeenMessageId: number;
  user: UserInfoType;
}

export interface UserInfoType {
  email: string;
  gender: string;
  id: number;
  name: string;
  phone: string;
  hex: string;
  userLogin: {
    TrackUserAccesses: TrackUserAccessesType[] | LastAccessType[];
  };
}

export interface TrackUserAccessesType {
  date: string;
  id: number;
  type: string;
}

export interface ChatType {
  id: number;
  members: Member[];
  messages: MessageType[];
  roomName: null | string;
}

export interface MessageType {
  content: string;
  createBy: string;
  createDate: string;
  delete: boolean;
  id: number;
  isActivate: boolean;
  pin: boolean;
  reactMessages: [];
  reply: [];
  seenMessages: [];
  sendBy: UserInfoType;
  sendDate: string;
  type: null | any;
}
