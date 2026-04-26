<template>
  <div class="ticks text-red-400">123</div>
  <section id="spacer">123</section>
  <Button label="Submit" />
  <div class="flex items-center gap-2">
        <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" value="Cheese" />
        <label for="ingredient1"> Cheese </label>
    </div>
    <i class="pi pi-check pi-spin"></i>
</template>

<script setup lang="ts">
import { Button, Checkbox  } from 'primevue';
import { ref } from 'vue';
const pizza  = ref<string>("");
</script>
