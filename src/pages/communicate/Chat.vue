<template>
  <BContainer fluid class="section-height-message">
    <BRow class="h-100">
      <!-- // list of users we will be to chat with -->
      <BCol lg="2" md="4" sm="5" class="h-100 pb-3 ps-0 ">
        <BCard class="w-100 h-100 ps-2 rounded-4 overflow-y-auto">
          <BRow>
            <b>{{ $t("system.conversation") }}</b>
          </BRow>
          <div class="d-flex flex-column gap-3 mt-3">
            <BRow class="hover-card" v-if="conversation.length > 0" v-for="value in conversation">
              <div class="d-flex gap-2">
                <BAvatar size="38">
                  LA
                </BAvatar>
                <div>
                  <p class="m-0 p-0">Lesiles Alexander</p>
                  <p class="p-0 m-0 text-success" style="font-size: 12px;">Active</p>
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
            <BRow class="hover-card" v-for="user in userActive">
              <div class=" d-flex gap-2">
                <BAvatar size="38" :style="{ 'background-color': `${user.colorName} !important` }">
                  {{ user.username.slice(0, 1) }}
                </BAvatar>
                <div>
                  <p class="m-0 p-0">{{ user.username }}</p>
                  <p class="p-0 m-0 text-success" style="font-size: 12px;" v-if="user.lastAccess != null">online</p>
                  <p class="p-0 m-0 text-secondary" style="font-size: 12px;" v-else>offline</p>
                </div>
              </div>
            </BRow>
          </div>
        </BCard>
      </BCol>
      <!-- // communication with other user -->
      <BCol lg="10" md="8" sm="7" class="h-100 pb-3">
        <BCard class="w-100 p-0 rounded-4 grid-chat" ref="topRef" body-class="p-0 h-auto">
          <!-- // user profile that we are chatting -->
          <div class="px-2 border-bottom">
            <div class="d-flex gap-2 py-3 ps-2">
              <BAvatar size="38">
                LA
              </BAvatar>
              <div>
                <p class="m-0 p-0">Lesiles Alexander</p>
                <p class="p-0 m-0 text-success" style="font-size: 12px;">Active</p>
              </div>
            </div>
          </div>
          <!-- // block we are communicate here -->
          <div class="w-100 p-3 overflow-hidden senction-converstaion overflow-y-auto" ref="refElmConversation">
            <!-- receive message from other -->
            <BRow v-for="value in [1, 2, 3, 4]">
              <div class="d-flex align-items-end  gap-2 pb-3">
                <BAvatar size="38">
                  LA
                </BAvatar>
                <BCard bg-variant="secondary-subtle" class="border-0">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse explicabo maxime neque est adipisci
                  repellendus id modi placeat architecto fugiat non natus ad quis, ipsa, cupiditate velit voluptate
                  possimus dolorum.
                </BCard>
              </div>
            </BRow>
            <!-- //send message to other -->
            <BRow>
              <div class="d-flex align-items-end justify-content-end gap-2 pb-3">
                <BCard bg-variant="secondary-subtle" class="border-0">
                  Lorem ipsum dolor sit amet consectetur adipisicing
                </BCard>
                <BAvatar size="38">
                  LA
                </BAvatar>
              </div>
            </BRow>
          </div>
          <!-- // the place where use to say some and want to contact someone -->
          <div class="w-100" ref="bottomRef">
            <BRow class="px-4">
              <BCol lg="12" md="12" sm="12" cols="12">
                <BInputGroup>
                  <BFormTextarea class="rounded-start-5" size="sm" rows="1" max-rows="1"
                    placeholder="Say something you here..." />
                  <BInputGroupText class="rounded-end-5 bg-primary text-white">
                    <Icon icon="ri:send-ins-line" width="24" height="24" /><span class="ms-2">Send</span>
                  </BInputGroupText>
                </BInputGroup>
              </BCol>
            </BRow>
          </div>
        </BCard>
      </BCol>
    </BRow>
  </BContainer>
</template>
<script lang="ts" setup>
import { BAvatar, BCard, BCol, BContainer, BFormTextarea, BInputGroup, BInputGroupText, BRow } from 'bootstrap-vue-next';
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';
import { RouteUtil } from '../../utils/RouteUtil';
import { ApiUtil } from '../../utils/HttpUtil';
import { useAuthStore } from '../../store/authStore';

interface UserAccessOnlineType {
  colorName: string,
  lastAccess: null | any
  username: string
}

const useAuth = useAuthStore();


const route = RouteUtil();
const api = ApiUtil();
const topRef = ref<HTMLElement | null>(null)
const bottomRef = ref<HTMLElement | null>(null)
const middleHeight = ref(100)
const userActive = ref<UserAccessOnlineType[]>([]);
const conversation = ref<UserAccessOnlineType[]>([]);


const calculateHeight = () => {
  const topHeight = topRef.value?.offsetHeight || 0
  const bottomHeight = bottomRef.value?.offsetHeight || 0
  const windowHeight = window.innerHeight

  middleHeight.value = windowHeight - topHeight - bottomHeight
}

onMounted(() => {
  calculateHeight()
  window.addEventListener('resize', calculateHeight)
})

const getListUserOnline = async () => {
  const data: any = await api.https({
    url: "api/user_login/user_online",
    data: {},
    method: "post"
  })
  userActive.value = data?.data?.content.filter((user: UserAccessOnlineType) => user.username != useAuth.data.accountInfo.name);
  console.log(userActive.value)
}
onMounted(() => {
  route.checkBreadCrumb();
  getListUserOnline();
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
</style>