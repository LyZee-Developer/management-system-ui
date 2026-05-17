<template>
  <BContainer fluid class="section-height-message">
    <div class="h-100  grid-middle">
      <!-- // list of users we will be to chat with -->
      <div lg="2" md="4" sm="5" class="h-100 pb-3 overflow-y-auto">
        <BCard class="w-100 h-100 ps-2 rounded-4 overflow-y-auto">
          <BRow>
            <b>{{ $t("system.conversation") }}</b>
      
          </BRow>
          <div class="d-flex flex-column gap-3 mt-3">
            <BRow class="hover-card" v-if="conversations.length > 0" v-for="conversation in conversations">
              <div class="d-flex gap-2 justify-content-between align-items-center"
                v-if="conversation.members.length == 1" @click="() => {
                  conversation.isUnreadMessage = false;
                  onSelectedChated(conversation, getTotalUnread([selectedUser.userId]).length > 0)
                }">
                <div class="d-flex gap-2">
                  <BAvatar size="38" :style="{ 'background-color': `${conversation.members[0].user.hex} !important` }">
                    {{ conversation.members[0].user.name.slice(0, 1) }}
                  </BAvatar>
                  <div>
                    <p class="m-0 p-0">{{ conversation.members[0].user.name }}</p>

                    <p class="p-0 m-0 text-success"
                      v-if="getStatusUser(conversation.members[0]?.user?.userLogin?.TrackUserAccesses) == StringConstant.ONLINE"
                      style="font-size: 12px;">online</p>
                    <p class="p-0 m-0 text-secondary" v-else style="font-size: 12px;">offline</p>
                  </div>
                </div>

                <!-- //*********** did not read message */ -->
                <!-- && conversation.members[0].user?.id !== selectedUser.userId -->
                <div v-if="conversation.isUnreadMessage"
                  class="rounded-5 bg-success d-flex justify-content-center align-items-center"
                  style="width: 20px; height: 20px;">
                  <p class="p-0 m-0 text-white" style="font-size: 10px;">{{
                    getTotalUnread(conversation.members.map((member: any) => member.user.id)).length}}
                  </p>
                </div>
              </div>
              <div v-else>
                <div class="d-flex gap-2 align-items-center"
                  @click="onSelectedChated(conversation, getTotalUnread([selectedUser.userId]).length > 0)">
                  <BAvatar size="38">
                    <Icon icon="twemoji:warning" width="16" height="16" />
                  </BAvatar>
                  <div>
                    <p class="m-0 p-0">Message block</p>
                  </div>
                </div>
              </div>
            </BRow>
            <BCard v-else>
              {{ $t("system.no_data_available") }}
            </BCard>
          </div>

          <!-- // user for chating with -->
          <BRow class="pt-4">
            <b>{{ $t("system.other") }}</b>
          </BRow>
          <div class="d-flex flex-column gap-3 mt-3">
            <BRow class="hover-card" v-for="user in userActive" @click="() => onSelectedUser(user)">
              <div class=" d-flex gap-2">
                <BAvatar size="38" :style="{ 'background-color': `${user.colorName} !important` }">
                  {{ user.username.slice(0, 1) }}
                </BAvatar>
                <div>
                  <p class="m-0 p-0">{{ user.username }}</p>
                  <p class="p-0 m-0 text-success" style="font-size: 12px;"
                    v-if="user.lastAccess?.type == StringConstant.OPEN">online</p>
                  <p class="p-0 m-0 text-secondary" style="font-size: 12px;"
                    v-else-if="user.lastAccess == null || user.lastAccess?.type == StringConstant.CLOSE">offline</p>
                </div>
              </div>
            </BRow>
          </div>
        </BCard>
      </div>

      <!-- // communication with other user -->
      <div lg="10" md="8" sm="7" class="h-100 pb-3">
        <BCard class="w-100 p-0 rounded-4 grid-chat" ref="topRef" body-class="p-0 h-auto">

          <!-- // user profile that we are chatting -->
          <div class="px-2 border-bottom">
            <div class="d-flex justify-content-between py-3 ps-2">
              <div class="d-flex gap-2">
                <BAvatar size="38" :style="{ 'background-color': `${selectedUser.colorName} !important` }">
                  {{ selectedUser.username?.slice(0, 1) ?? "" }}
                </BAvatar>
                <div>
                  <p class="m-0 p-0">{{ selectedUser?.username || "Anonymous" }}</p>
                  <div class="d-flex gap-2">
                    <p class="p-0 m-0 text-success" style="font-size: 12px;"
                      v-if="selectedUser.lastAccess?.type == StringConstant.OPEN">online</p>
                    <p class="p-0 m-0 text-secondary" style="font-size: 12px;"
                      v-else-if="selectedUser.lastAccess == null || selectedUser?.lastAccess?.type == StringConstant.CLOSE">
                      offline</p>
                    <div class="" style="font-size: 12px;" v-if="selectedUser.lastAccess?.date">
                      {{ moment(new Date(selectedUser.lastAccess?.date)).startOf('minute').fromNow() }}
                    </div>
                  </div>
                </div>
              </div>

              <BDropdown variant="dark" no-caret
                toggle-class="bg-transparent text-secondary-emphasis border-0 same-style-each p-2 rounded-5">
                <template #button-content class="bg-transparent ">
                  <Icon icon="proicons:more" width="26" height="26" />
                </template>
                <BDropdownItem @click="() => onSelectChatOption(item)" v-for="item in ChatOptionConstant">
                  <div class="d-flex align-items-center">
                    <BAvatar size="35" class="bg-transparent">
                      <Icon :icon="item.icon!" class="text-secondary-emphasis" width="301" height="193" />
                    </BAvatar>
                    <div>{{ $t('system.' + item.code.toLowerCase()) }}</div>
                  </div>
                </BDropdownItem>
              </BDropdown>
            </div>
          </div>


          <!-- // block we are communicate here -->
          <div class="w-100 d-flex flex-column gap-2 p-3 pe-5 overflow-hidden senction-converstaion overflow-y-auto"
            ref="scrollContainer">

            <!-- start conversation with who we want to chant -->
            <div class="d-flex flex-column gap-3 w-100 h-100 justify-content-center align-items-center"
              v-if="messages.length == 0">
              <img :src="randomImage" style="width: 150px;" />
              <div>Make your day with me {{ useAuth.data.accountInfo.name }}?</div>
            </div>

            <div class="d-flex flex-column gap-2" v-if="messages.length > 0" v-for="(message, index) in messages">
              <!-- //send message to other -->
              <div class="d-flex justify-content-end"
                v-if="message.sendBy.id == currentUserId && ![StringConstant.CODE.CLEAR, StringConstant.CODE.BLOCK].includes(message.type?.code)">
                <div class="d-flex gap-2  align-items-end position-relative"
                  :class="`${message.delete ? `` : `hover-action`}`">
                  <div class="action d-none">
                    <div class="d-flex gap-2">
                      <!-- //*********** action of meesage ************ */ -->
                      <BDropdown variant="dark" no-caret placement="left-start"
                        toggle-class="bg-transparent text-secondary-emphasis  border-0 same-style-each p-2 rounded-5">
                        <template #button-content class="bg-transparent ">
                          <Icon icon="proicons:more" width="26" height="26" />
                        </template>
                        <BDropdownItem @click="() => onSelectMessage(item, message.id)" v-for="item in MessageAction">
                          <div class="d-flex align-items-center">
                            <BAvatar size="35" class="bg-transparent">
                              <Icon :icon="item.icon!" class="text-secondary-emphasis" width="301" height="193" />
                            </BAvatar>
                            <div>{{ $t('system.' + item.code.toLowerCase()) }}</div>
                          </div>
                        </BDropdownItem>
                      </BDropdown>

                      <!-- //************ feeling about user  ************* */ -->
                      <BDropdown variant="dark" no-caret placement="left-start"
                        toggle-class="bg-transparent text-secondary-emphasis  border-0 same-style-each p-2 rounded-5">
                        <template #button-content class="bg-transparent ">
                          <Icon icon="fluent:emoji-add-16-regular" width="26" height="26" />
                        </template>
                        <BDropdownItem @click="() => onReactEmoji(emoji?.code, message?.id)"
                          :active="isHasSelectEmoji(emoji?.code, message.reactMessages)" v-for="emoji in emojis">
                          <div class="d-flex align-items-center">
                            <div>{{ emoji.description }} {{ emoji.enName }}</div>
                          </div>
                        </BDropdownItem>
                      </BDropdown>
                    </div>
                  </div>
                  <BTooltip>
                    <template #target>
                      <div
                        class="bg-secondary-subtle d-flex flex-column position-relative align-items-end px-3 py-2 rounded-3"
                        v-if="!message.delete">
                        <p class="m-0 p-0">{{
                          message.content
                        }}</p>
                        <p style="font-size: 12px;" class="m-0 text-secondary-emphasis">{{
                          moment(message.sendDate).format('LT') }}</p>
                        <div class="d-flex gap-1 position-absolute" style="right: 10px; bottom: -13px;">
                          <div class="bg-primary-subtle p-1 rounded-circle" style="font-size: 12px;"
                            v-for="emoji in message.reactMessages">
                            {{ emoji?.reactCode?.description }}
                          </div>
                        </div>
                      </div>
                      <div v-else class="px-3 py-2 rounded-3" style="background-color: #95959512;">
                        <Icon icon="material-symbols-light:warning" width="22" height="22" class="text-warning" />
                        message have been remove.
                      </div>
                    </template>
                    <div v-if="!message.delete">
                      sent at {{ moment(message.sendDate).calendar() }}
                    </div>
                    <div v-else>
                      delete at {{ moment(message.sendDate).calendar() }}
                    </div>
                  </BTooltip>
                  <BAvatar size="38" v-if="checkIsShowAvatar(messages, index)"
                    :style="{ 'background-color': `${useAuth.data.accountInfo.hex} !important` }">
                    {{ useAuth.data.accountInfo.name?.slice(0, 1) }}
                  </BAvatar>
                  <div v-else style="margin-right: 36px;">
                  </div>

                  <!-- //********** Mark user has saw the message ********* */ -->
                  <div class="other-seen-message d-flex justify-content-center align-items-center"
                    v-if="otherUserLastSeenMessageId == message.id"
                    :style="{ 'background-color': `${selectedUser.colorName} !important` }">
                    {{ selectedUser.username?.slice(0, 1) }}
                  </div>
                </div>

              </div>

              <!-- receive message from other -->
              <div class="d-flex gap-2 hover-action align-items-end"
                v-else-if="message.sendBy.id !== currentUserId && ![StringConstant.CODE.CLEAR, StringConstant.CODE.BLOCK].includes(message.type?.code)">
                <div class="d-flex gap-2 align-items-end">
                  <BAvatar size="38" v-if="checkIsShowAvatar(messages, index)"
                    :style="{ 'background-color': `${selectedUser.colorName} !important` }">
                    {{ selectedUser.username?.slice(0, 1) }}
                  </BAvatar>
                  <div v-else style="margin-left: 36px;">
                  </div>
                  <BTooltip>
                    <template #target>
                      <div v-if="!message.delete">
                        <div class="bg-secondary-subtle mb-2 position-relative  px-3 py-2 rounded-3">
                          <p class="m-0 p-0">{{
                            message.content
                          }}</p>
                          <p style="font-size: 12px;" class="m-0 text-secondary-emphasis">{{
                            moment(message.sendDate).format('LT') }}</p>
                          <div class="d-flex gap-1 position-absolute" style="right: 10px;">
                            <div class="bg-primary-subtle rounded-circle p-1" style="font-size: 12px;"
                              v-for="emoji in message.reactMessages">
                              {{ emoji?.reactCode?.description }}
                            </div>
                          </div>
                        </div>

                      </div>
                      <div v-else class="px-3 py-2 rounded-3" style="background-color: #95959512;">
                        <Icon icon="material-symbols-light:warning" width="22" height="22" class="text-warning" />
                        message have been remove.
                      </div>
                    </template>

                    <div v-if="!message.delete">
                      sent at {{ moment(message.sendDate).calendar() }}
                    </div>
                    <div v-else>
                      delete at {{ moment(message.sendDate).calendar() }}
                    </div>
                  </BTooltip>

                  <div class="action d-none">
                    <div class="d-flex gap-2">
                      <!-- //************ feeling about user  ************* */ -->
                      <BDropdown variant="dark" no-caret placement="left-start"
                        toggle-class="bg-transparent text-secondary-emphasis  border-0 same-style-each p-2 rounded-5">
                        <template #button-content class="bg-transparent ">
                          <Icon icon="fluent:emoji-add-16-regular" width="26" height="26" />
                        </template>
                        <BDropdownItem :active="isHasSelectEmoji(emoji?.code, message.reactMessages)"
                          @click="() => onReactEmoji(emoji?.code, message?.id)" v-for="emoji in emojis">
                          <div class="d-flex align-items-center">
                            <div>{{ emoji.description }} {{ emoji.enName }}</div>
                          </div>
                        </BDropdownItem>
                      </BDropdown>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Mark message clear message -->
              <div v-else-if="message.type?.code == StringConstant.CODE.CLEAR"
                class="d-flex flex-column justify-content-center align-items-center">
                <p class="m-0 p-0" style="font-size: 14px; color: #5a5a5a;">{{
                  message.content
                  }}</p>
                <p class="p-0 m-0 " style="font-size: 14px; color: #5a5a5a;">{{ moment(message.sendDate).format('LT') }}
                </p>
              </div>

              <!-- Mark message clear message -->
              <div v-else-if="message.type?.code == StringConstant.CODE.BLOCK"
                class="d-flex flex-column justify-content-center align-items-center">
                <p class="m-0 p-0" style="font-size: 14px; color: #5a5a5a;">{{
                  message.content
                  }}</p>
                <p class="p-0 m-0 " style="font-size: 14px; color: #5a5a5a;">{{ moment(message.sendDate).format('LT') }}
                </p>
              </div>
            </div>

          </div>
          <!-- // the place where use to say some and want to contact someone -->
          <div class="w-100" ref="bottomRef">
            <BRow class="px-4">
              <BCol lg="12" md="12" sm="12" cols="12">
                <BInputGroup>
                  <BFormTextarea v-model="message" :disabled="isDisabledInputMessage"  @keyup.enter="onSendMessage" @focus="onRequestSeenMessage"
                    class="rounded-start-5 padding-textarea" size="sm" rows="1" max-rows="1"
                    placeholder="Say something you here..." />
                  <BInputGroupText class="rounded-end-5 bg-primary text-white" @click="onSendMessage">
                    <Icon icon="ri:send-ins-line" width="24" height="24" /><span class="ms-2">Send</span>
                  </BInputGroupText>
                </BInputGroup>
              </BCol>
            </BRow>
          </div>
        </BCard>
      </div>
    </div>
  </BContainer>
</template>
<script lang="ts" setup>
import { BAvatar, BCard, BCol, BContainer, BDropdown, BDropdownItem, BFormTextarea, BInputGroup, BInputGroupText, BRow, BTooltip } from 'bootstrap-vue-next';
import { Icon } from '@iconify/vue';
import { computed, onMounted, ref } from 'vue';
import { RouteUtil } from '../../utils/RouteUtil';
import { ApiUtil } from '../../utils/HttpUtil';
import { useAuthStore } from '../../store/authStore';
import type { ChatType, LastAccessType, Member, MessageType, ReactMessageType, TrackUserAccessesType, UserAccessOnlineType } from '../../types/chatType';
import { StringConstant } from '../../constants/stringConstant';
import moment from 'moment';
import { ImageUtil } from '../../utils/ImageUtil';
import { useChatStore } from '../../store/chatStore';
import { ChatOptionConstant, MessageAction } from '../../constants/valueConstant';
import { SwalUtil } from '../../utils/swalUtil';
import type { BaseType } from '../../types/baseType';
import { useDataRefStore } from '../../store/dataRefStore';
import type { DataRefType } from '../../types/GlobalType';

const useAuth = useAuthStore();
const chatStore = useChatStore();
const dataRefStore = useDataRefStore();

const img = ImageUtil()
const route = RouteUtil();
const api = ApiUtil();
const swal = SwalUtil()

const currentUserId = ref<number>(useAuth.data.accountInfo.id!);
const chatId = ref<number>(0);
const otherUserLastSeenMessageId = ref<number>(0);
const topRef = ref<HTMLElement | null>(null)
const bottomRef = ref<HTMLElement | null>(null)
const isCreateChat = ref<boolean>(false);
const isDisabledInputMessage = ref<boolean>(false);
const middleHeight = ref(100)
const message = ref<string>("");
const userActive = ref<UserAccessOnlineType[]>([]);
const selectedUser = ref<UserAccessOnlineType | any>({} as UserAccessOnlineType);
const randomImage = ref<string>("");
const totalUnreadMessageId = ref<number[]>([])
const conversations = ref<any>([]);
const scrollContainer = ref<any>(null);

const emojis = computed<DataRefType[]>(() => {
  return dataRefStore.data.dataRefs;
})

const scrollToBottom = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({
      top: scrollContainer.value.scrollHeight + 100,
      behavior: 'smooth' // For animated scrolling
    });
  }
};

const getConversation = () => {
  console.log("get chat", chatStore.data.conversations)
  conversations.value = chatStore.data.conversations.filter(s => s.isActivate == true).map((chat: ChatType) => {
    const chatMessageWith = chat.members.filter((member: Member) => member.user.id != currentUserId.value);

    //******** last message id for user select or have select ********/
    if (chatMessageWith.length > 0) {
      chatMessageWith.map((val) => {
        if (chat.id == selectedUser.value.chatId) {
          otherUserLastSeenMessageId.value = val.lastSeenMessageId
        }
      })
    }

    return {
      ...chat,
      isUnreadMessage: getTotalUnread(chatMessageWith.map(member => member.user.id)).length > 0,
      me: chat.members.filter((member: Member) => member.user.id == currentUserId.value),
      members: chatMessageWith
    }
  })
}

const messages = computed(() => {
  isDisabledInputMessage.value = chatStore.data.messages.some(s => s?.type?.code == StringConstant.CODE.BLOCK) || false;
  return chatStore.data.messages;
})

const checkIsShowAvatar = (messages: MessageType[], index: number): boolean => {
  let theSameTop = messages[index - 1]?.sendBy?.id === messages[index]?.sendBy?.id;
  let differenceBottom = messages[index + 1]?.sendBy?.id !== messages[index]?.sendBy?.id;

  let differenceTop = messages[index - 1]?.sendBy?.id !== messages[index]?.sendBy?.id;
  return theSameTop && differenceBottom || (differenceTop && differenceBottom);
}

const isHasSelectEmoji = (emojiCode: string, reactEmoji: ReactMessageType[]): boolean => {
  const reactEmojiCodes = reactEmoji.map((val) => val.reactCode.code);
  //********** mark dropdown to make sure user which have react on emoji ********** */
  return reactEmojiCodes.includes(emojiCode);
}

const onReactEmoji = (emojiCode: string, messageId: number) => {

  chatStore.reactMessage(messageId, currentUserId.value, emojiCode, () => {
    chatStore.getConversationMessage(chatId.value)
  });

}

const getTotalUnread = (sentMessageByUserId: number[]): number[] => {
  console.log("Yes", messages)
  const clientMessage = messages.value.filter(msg => msg.seenMessages.length == 0 && sentMessageByUserId.includes(msg.sendBy.id)) || [];
  const allMessageId = clientMessage?.map(val => val.id) || [];
  return allMessageId;
}

const onRequestSeenMessage = () => {
  console.log(totalUnreadMessageId.value)
  if (totalUnreadMessageId.value.length > 0) {
    let total = totalUnreadMessageId.value.length;
    for (let id = 0; id < total; id++) {
      setTimeout(async () => {
        await chatStore.seenMessage(totalUnreadMessageId.value[id], currentUserId.value)
      }, (id + 1) * 500);
    }
  }
}

const calculateHeight = () => {
  const topHeight = topRef.value?.offsetHeight || 0
  const bottomHeight = bottomRef.value?.offsetHeight || 0
  const windowHeight = window.innerHeight

  middleHeight.value = windowHeight - topHeight - bottomHeight
}

const onSendMessage = () => {
  if (isCreateChat.value) createChat();
  else sendNewMessage()

  message.value = "";
}

const createChat = () => {
  chatStore.startChat(currentUserId.value, selectedUser.value.userId, message.value, (id: number) => {
    chatStore.getConversationMessage(id);
    loadChat();
  })
}

const sendNewMessage = () => {
  chatStore.sendMessage(chatId.value, currentUserId.value, message.value, () => {
    chatStore.getConversationMessage(chatId.value, () => {
      setTimeout(() => {
        scrollToBottom();
      }, 500)
    });
  })
}

onMounted(() => {
  dataRefStore.getDataRefByCode(StringConstant.CODE.EMOJI)
  calculateHeight()
  window.addEventListener('resize', calculateHeight)
})

const getStatusUser = (track: TrackUserAccessesType[]) => {
  if (track.length > 0) {
    return track[0].type == StringConstant.OPEN ? "online" : "offline";
  }
  return "offline"
}

const getListUserOnline = async () => {
  const data: any = await api.https({
    url: "api/user_login/user_online",
    data: {},
    method: "post"
  })

  let chatAlready = conversations.value.map((s: ChatType) => s.members.map((mem: Member) => mem.user.id)).flat();
  userActive.value = data?.data?.content.filter((user: UserAccessOnlineType) => user.username != useAuth.data.accountInfo.name && !chatAlready.includes(user.userId));
}

const onSelectedUser = (user: UserAccessOnlineType) => {
  selectedUser.value = user;
  randomImage.value = img.randomImage();
  isCreateChat.value = true;
  clearMessage();
}

const clearMessage = () => {
  chatStore.clearMessage();
}

const onSelectChatOption = (option: BaseType) => {
  console.log("yes")
  let description = option.code == StringConstant.BLOCK ? "Do you want to block that user." : "Do you want to remove all message."
  swal.show({
    description: description,
    confirm: () => optionDeleteMessage(option)
  })
}

const optionDeleteMessage = (option: BaseType) => {
  if (StringConstant.BLOCK == option.code) {
    chatStore.blockMessage(chatId.value, currentUserId.value);
  }
  else if (StringConstant.ACTION.DELETE == option.code) {
    chatStore.deleteChat(chatId.value);
    loadChat();
  }
  else if (StringConstant.ACTION.CLEAR == option.code) {
    chatStore.removeAllMessage(chatId.value, currentUserId.value, () => {
      chatStore.getConversationMessage(chatId.value);
    });
  }
}

const onSelectMessage = (option: BaseType, messageId: number) => {
  if (option.code == StringConstant.MESSAGE_ACTION.UNSEND) {
    swal.show({
      confirm: () => {
        chatStore.deleteMessage(messageId, () => {
          chatStore.getConversationMessage(chatId.value);
        })
      }
    })
  }

}

const onSelectedChated = (chat: any, isSeenMessage: boolean) => {
  message.value = "";
  isCreateChat.value = false
  chatId.value = chat.id;
  const chatInfo = chat.members[0];

  if (isSeenMessage) {
    chat.isUnreadMessage = false;
    totalUnreadMessageId.value = getTotalUnread([chatInfo.user.id]);
    onRequestSeenMessage();
  }

  chatStore.getConversationMessage(chatId.value)
  let select: any = {
    colorName: chatInfo.user.hex,
    lastAccess: chatInfo.user.userLogin.TrackUserAccesses.length > 0 ? chatInfo.user.userLogin.TrackUserAccesses[0] : {} as LastAccessType,
    username: chatInfo.user.name,
    userId: chatInfo.user.id,
    lastSeenMessageId: chatInfo.lastSeenMessageId,
  }

  selectedUser.value = { ...select, chatId: chatId.value };
  localStorage.setItem(StringConstant.SELECT_USER, JSON.stringify(selectedUser.value));
  setTimeout(() => {
    scrollToBottom();
  }, 1000)
}

const loadChat = () => {
  chatStore.getChat(useAuth.data.accountInfo.id!, () => {
    getListUserOnline();
    getConversation();
    scrollToBottom();
  });
}

const checkToGetMessage = () => {
  const select = localStorage.getItem(StringConstant.SELECT_USER);
  if (select != null) {
    const json = JSON.parse(select || "");
    if (json && json?.chatId > 0) {
      console.log("Pull")
      chatId.value = json?.chatId;
      chatStore.getConversationMessage(json?.chatId)
    }
    selectedUser.value = json;
  }

}

onMounted(() => {
  route.checkBreadCrumb();
  randomImage.value = img.randomImage();

  clearMessage();
  loadChat();
  checkToGetMessage()
})

</script>

<style scoped scss>
:deep(.grid-chat .card-body) {
  display: grid;
  grid-auto-rows: 73px 1fr 78px;
}

.senction-converstaion {
  height: calc(100vh - 317px);
}

.section-height-message {
  height: calc(100vh - 150px);
}

.shape-circle {
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  background-color: rgb(0, 87, 87);
  border-radius: 50%;
}

.grid-middle {
  display: grid !important;
  grid-template-columns: 300px 1fr;
  gap: 24px;
}

.padding-textarea {
  height: 50px;
  box-sizing: border-box;
}

.hover-action:hover .action {
  display: block !important;
}

.other-seen-message {
  width: 18px;
  height: 18px;
  min-width: 18px;
  font-size: 8px;
  min-height: 18px;
  border-radius: 50%;
  position: absolute;
  right: -25px;
  bottom: 7px;
}
</style>