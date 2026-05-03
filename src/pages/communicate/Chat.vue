<template>
  <BContainer fluid class="section-height-message">
    <BRow class="h-100">
      <!-- // list of users we will be to chat with -->
      <BCol cols="2" class="h-100 pb-3 ps-0 ">
        <BCard class="w-100 h-100 ps-2 rounded-4 overflow-y-auto">
          <BRow>
            <b>{{ $t("system.conversation") }}</b>
          </BRow>
          <div class="d-flex flex-column gap-3 mt-3">
            <BRow class="hover-card" v-for="value in [1, 2, 3, 4]">
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
          </div>

          <!-- // user for chating with -->
          <BRow class="pt-4">
            <b>{{ $t("system.message") }}</b>
          </BRow>
          <div class="d-flex flex-column gap-3 mt-3">
            <BRow class="hover-card" v-for="value in [1, 2, 3, 4]">
              <div class=" d-flex gap-2">
                <BAvatar size="38" style="background-color: #123123 !important; ">
                  LA
                </BAvatar>
                <div>
                  <p class="m-0 p-0">Lesiles Alexander</p>
                  <p class="p-0 m-0 text-success" style="font-size: 12px;">Active</p>
                </div>
              </div>
            </BRow>
          </div>
        </BCard>
      </BCol>
      <!-- // communication with other user -->
      <BCol cols="10" class="h-100 pb-3">
        <BCard class="w-100 p-0 rounded-4 grid-chat" ref="topRef" body-class="p-0 ">
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

const route = RouteUtil();

const topRef = ref<HTMLElement | null>(null)
const bottomRef = ref<HTMLElement | null>(null)
const middleHeight = ref(100)

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

onMounted(() => {
  route.checkBreadCrumb();
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