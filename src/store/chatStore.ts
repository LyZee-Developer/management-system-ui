import { defineStore } from "pinia";
import { reactive } from "vue";
import { ApiUtil } from "../utils/HttpUtil";
import { RouteApi } from "../constants/routeApiConstant";
import { StringConstant } from "../constants/stringConstant";
import type { ChatType, Member, MessageType } from "../types/chatType";

export const useChatStore = defineStore("chatStore", () => {
  const api = ApiUtil();
  const data = reactive<{
    conversations: ChatType[];
    messages: MessageType[];
  }>({
    conversations: [],
    messages: [],
  });

  const getChat = async (userId: number, fn?: () => void) => {
    const res: any = await api.https({
      url: RouteApi.chat.list,
      data: {
        userId: userId,
      },
      method: StringConstant.POST,
    });
    console.log(res?.data);
    data.conversations = res?.data ?? [];
    fn?.();
  };

  const sendMessage = async (
    chatId: number,
    senderId: number,
    content: string,
    fn?: () => void,
  ) => {
    const res: any = await api.https({
      url: RouteApi.chat.sendMessage,
      data: {
        id: chatId,
        sendBy: senderId,
        content: content,
      },
      method: StringConstant.POST,
    });
    console.log(res?.data);
    data.conversations = res?.data ?? [];
    fn?.();
  };

  const getConversationMessage = async (chatId: number, fn?: () => void) => {
    const res: any = await api.https({
      url: `${RouteApi.chat.conversation}/${chatId}`,
      data: {},
      method: StringConstant.GET,
    });
    console.log("message", res?.data);
    data.messages = res?.data ?? [];
    fn?.();
  };

  const startChat = async (
    senderId: number,
    receiverId: number,
    message: string,
    fn?: () => void,
  ) => {
    const res = await api.https({
      url: RouteApi.chat.create,
      data: {
        sendBy: senderId,
        receiveBy: receiverId,
        content: message,
      },
      method: StringConstant.POST,
    });
    console.log(res);
    fn?.();
  };

  const clearMessage = () => {
    data.messages = [];
  }

  return {
    data,
    getChat,
    getConversationMessage,
    sendMessage,
    startChat,
    clearMessage,
  };
});
