<template>
  <div>
    <Header />
    <BContainer fluid style="height: 89vh;">
      <BRow class="h-100">
        <!-- // communication with other user -->
        <BCol cols="9" class="h-100 py-3">
          <BCard class="w-100 h-100 rounded-4">
             <div>
              
             </div>
          </BCard>
        </BCol>
        <BCol cols="3" class="h-100 py-3 ps-0">
          <BCard class="w-100 h-100 rounded-4">
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
      </BRow>
    </BContainer>
  </div>
</template>
<script lang="ts" setup>
import { BAvatar, BCard, BCol, BContainer, BRow } from 'bootstrap-vue-next';
import Header from '../../components/Header.vue';


</script>