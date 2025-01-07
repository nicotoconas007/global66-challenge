<script setup>
import BaseButton from "../buttons/BaseButton.vue";
defineProps({
  goBack: Function,
});
</script>

<template>
  <div class="text-center">
    <div class="flex flex-col gap-5">
      <h2 class="font-bold text-4xl">Uh-oh!</h2>
      <p class="font-medium text-xl">You look lost on your journey!</p>
    </div>
    <BaseButton :label="'Go Back Home'" :onClick="goBack" />
  </div>
</template>
