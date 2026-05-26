export const RouteApi = {
  chat: {
    list: "api/chat/list",
    create: "api/chat/create",
    conversation: "api/chat/conversation",
    seenMessage: "api/chat/seen",
    reactMessage: "api/chat/react",
    blockMessage: "api/chat/block",
    sendMessage: "api/chat/conversation/send",
    deleteChat: "api/chat/delete",

    clearMessage: "api/chat_message/clear",
    focusOutMessage: "api/chat/un_typing",

    //message
    deleteMessage: "api/chat_message/delete",
    removeMessage: "api/chat_message/remove",
  },
  dataRef: {
    list: "api/data_ref",
    create: "api/data_ref/create",
    update: "api/data_ref/update",
    delete: "api/data_ref/delete",
  },
};
