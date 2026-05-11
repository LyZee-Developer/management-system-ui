<template>
  <BContainer fluid class="section-height-message">
    <div class="h-100  grid-middle">
      <!-- // list of users we will be to chat with -->
      <div lg="2" md="4" sm="5" class="h-100 pb-3 ">
        <BCard class="w-100 h-100 ps-2 rounded-4 overflow-y-auto">
          <BRow>
            <b>{{ $t("system.conversation") }}</b>
          </BRow>
          <div class="d-flex flex-column gap-3 mt-3">
            <BRow class="hover-card" v-if="conversations.length > 0" v-for="conversation in conversations">
              <div class="d-flex gap-2" v-if="conversation.members.length == 1"
                @click="() => onSelectedChated(conversation)">
                <BAvatar size="38" :style="{ 'background-color': `${conversation.members[0].user.hex} !important` }">
                  {{ conversation.members[0].user.name.slice(0, 1) }}
                </BAvatar>
                <div>
                  <p class="m-0 p-0">{{ conversation.members[0].user.name }}</p>
                  <p class="p-0 m-0 text-success"
                    v-if="getStatusUser(conversation.members[0]?.user?.userLogin?.TrackUserAccesses) == StringConstant.ONLINE"
                    style="font-size: 12px;">{{
                      getStatusUser(conversation.members[0]?.user?.userLogin?.TrackUserAccesses) }}</p>
                  <p class="p-0 m-0 text-secondary" v-else style="font-size: 12px;">{{
                    getStatusUser(conversation.members[0]?.user?.userLogin?.TrackUserAccesses) }}</p>
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
            <div class="d-flex gap-2 py-3 ps-2">
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
          </div>
          <!-- // block we are communicate here -->
          <div class="w-100 d-flex flex-column gap-2 p-3 overflow-hidden senction-converstaion overflow-y-auto"
            ref="refElmConversation">
            <!-- start conversation with who we want to chant -->
            <div class="d-flex flex-column gap-3 w-100 h-100 justify-content-center align-items-center"
              v-if="messages.length == 0">
              <img :src="randomImage" style="width: 150px;" />
              <div>Make your day with me {{ useAuth.data.accountInfo.name }}?</div>
            </div>

            <div class="d-flex flex-column gap-2" v-if="messages.length > 0" v-for="message in messages">
              <!-- //send message to other -->
              <div class="d-flex justify-content-end" v-if="message.sendBy.id == currentUserId">
                <div class="d-flex gap-2 align-items-end">
                  <div class="bg-secondary-subtle px-3 py-2 rounded-3">
                    {{
                      message.content
                    }}
                  </div>
                  <BAvatar size="38" :style="{ 'background-color': `${useAuth.data.accountInfo.hex} !important` }">
                    {{ useAuth.data.accountInfo.name?.slice(0, 1) }}
                  </BAvatar>
                </div>
              </div>

              <!-- receive message from other -->
              <div class="d-flex gap-2 align-items-end" v-else>
                <BAvatar size="38" :style="{ 'background-color': `${selectedUser?.colorName} !important` }">
                  {{ selectedUser?.username?.slice(0, 1) }}
                </BAvatar>
                <div class="bg-secondary-subtle px-3 py-2 rounded-3">
                  {{
                    message.content
                  }}
                </div>
              </div>

            </div>




          </div>
          <!-- // the place where use to say some and want to contact someone -->
          <div class="w-100" ref="bottomRef">
            <BRow class="px-4">
              <BCol lg="12" md="12" sm="12" cols="12">
                <BInputGroup>
                  <BFormTextarea v-model="message" @keyup.enter="onSendMessage" class="rounded-start-5 padding-textarea"
                    size="sm" rows="1" max-rows="1" placeholder="Say something you here..." />
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
import { BAvatar, BCard, BCol, BContainer, BFormTextarea, BInputGroup, BInputGroupText, BRow } from 'bootstrap-vue-next';
import { Icon } from '@iconify/vue';
import { computed, onMounted, ref } from 'vue';
import { RouteUtil } from '../../utils/RouteUtil';
import { ApiUtil } from '../../utils/HttpUtil';
import { useAuthStore } from '../../store/authStore';
import type { ChatType, LastAccessType, Member, TrackUserAccessesType, UserAccessOnlineType } from '../../types/chatType';
import { StringConstant } from '../../constants/stringConstant';
import moment from 'moment';
import { ImageUtil } from '../../utils/ImageUtil';
import { useChatStore } from '../../store/chatStore';

const useAuth = useAuthStore();
const chatStore = useChatStore();

const img = ImageUtil()
const route = RouteUtil();
const api = ApiUtil();

const currentUserId = ref<number>(useAuth.data.accountInfo.id!);
const chatId = ref<number>(0);
const topRef = ref<HTMLElement | null>(null)
const bottomRef = ref<HTMLElement | null>(null)
const isCreateChat = ref<boolean>(false);
const middleHeight = ref(100)
const message = ref<string>("");
const userActive = ref<UserAccessOnlineType[]>([]);
const selectedUser = ref<UserAccessOnlineType>({} as UserAccessOnlineType);
const randomImage = ref<string>("");

const conversations = computed(() => {
  return chatStore.data.conversations.map((chat: ChatType) => {
    return {
      ...chat,
      members: chat.members.filter((member: Member) => member.user.id != currentUserId.value)
    }
  })
})

const messages = computed(() => {
  return chatStore.data.messages;
})

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
  chatStore.startChat(currentUserId.value, selectedUser.value.userId, message.value, () => {
    loadChat(() => {
      getListUserOnline();
    });
  })
}

const sendNewMessage = () => {
  chatStore.sendMessage(chatId.value, currentUserId.value, message.value, () => {
    chatStore.getConversationMessage(chatId.value)
  })
}


onMounted(() => {
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
}

const onSelectedChated = (user: ChatType) => {
  message.value = "";
  isCreateChat.value = false
  chatStore.getConversationMessage(user.id)
  chatId.value = user.id;
  const userInfo = user.members[0].user;
  let select: UserAccessOnlineType = {
    colorName: userInfo.hex,
    lastAccess: userInfo.userLogin.TrackUserAccesses.length > 0 ? userInfo.userLogin.TrackUserAccesses[0] : {} as LastAccessType,
    username: userInfo.name,
    userId: userInfo.id
  }

  selectedUser.value = select;
}

const loadChat = (fn?: () => void) => {
  chatStore.getChat(useAuth.data.accountInfo.id!, fn);
}

onMounted(() => {
  route.checkBreadCrumb();
  loadChat(() => {
    getListUserOnline();
  });

})

</script>

<style scoped>
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
</style>