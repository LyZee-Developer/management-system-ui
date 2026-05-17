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
    console.log("list");
    const res: any = await api.https({
      url: RouteApi.chat.list,
      data: {
        userId: userId,
      },
      method: StringConstant.POST,
    });
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
    fn?.();
  };

  const reactMessage = async (
    messageId: number,
    reactById: number,
    emojiCode: string,
    fn?: () => void,
  ) => {
    const res: any = await api.https({
      url: RouteApi.chat.reactMessage,
      data: {
        messageId: messageId,
        reactById: reactById,
        emojiCode: emojiCode,
      },
      method: StringConstant.POST,
    });

    console.log("res", res);
    fn?.();
  };

  const blockMessage = async (
    chatId: number,
    blockById: number,
    fn?: () => void,
  ) => {
    const res: any = await api.https({
      url: RouteApi.chat.blockMessage,
      data: {
        chatId: chatId,
        blockBy: blockById,
      },
      method: StringConstant.POST,
    });

    console.log("res", res);
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

  const deleteMessage = async (chatId: number, fn?: () => void) => {
    await api.https({
      url: `${RouteApi.chat.deleteMessage}/${chatId}`,
      data: {},
      method: StringConstant.GET,
    });
    fn?.();
  };

  const deleteChat = async (chatId: number, fn?: () => void) => {
    await api.https({
      url: `${RouteApi.chat.deleteChat}/${chatId}`,
      data: {},
      method: StringConstant.GET,
    });
    fn?.();
  };

  const seenMessage = async (
    lastMessageId: number,
    seenById: number,
    fn?: () => void,
  ) => {
    console.log("seen");
    const res: any = await api.https({
      url: `${RouteApi.chat.seenMessage}`,
      data: {
        userId: seenById,
        messageId: lastMessageId,
      },
      method: StringConstant.POST,
    });
    console.log("message", res?.data);
    fn?.();
  };

  const removeAllMessage = async (
    chatId: number,
    clearById: number,
    fn?: () => void,
  ) => {
    console.log("seen");
    const res: any = await api.https({
      url: `${RouteApi.chat.clearMessage}`,
      data: {
        chatId: chatId,
        userId: clearById,
      },
      method: StringConstant.POST,
    });
    console.log("message", res?.data);
    fn?.();
  };

  const startChat = async (
    senderId: number,
    receiverId: number,
    message: string,
    fn?: (id:number) => void,
  ) => {
    const res:any = await api.https({
      url: RouteApi.chat.create,
      data: {
        sendBy: senderId,
        receiveBy: receiverId,
        content: message,
      },
      method: StringConstant.POST,
    });
    console.log(res);
    fn?.(res.data || 0);
  };

  const clearMessage = () => {
    data.messages = [];
  };

  return {
    data,
    getChat,
    getConversationMessage,
    reactMessage,
    sendMessage,
    blockMessage,
    startChat,
    seenMessage,
    deleteChat,
    deleteMessage,
    removeAllMessage,
    clearMessage,
  };
});
