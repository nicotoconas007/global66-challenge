<script setup>
import BaseButton from "../buttons/BaseButton.vue";
defineProps({
  start: Function,
});
</script>

<template>
  <div
    class="h-screen text-center flex flex-col justify-center items-center gap-8 p-2 text-[#353535]"
  >
    <div class="max-w-[325px] mb-10">
      <img src="/pikachu-logo.png" alt="pikachu-logo" />
    </div>

    <h1 class="text-[26px] font-bold leading-8">Welcome to pokedex</h1>

    <p class="font-medium text-lg leading-7">
      The digital encyclopedia created by Professor Oak is an invaluable tool to
      Trainers in the Pokémon world.
    </p>

    <BaseButton :label="'Get started'" :onClick="start" />
  </div>
</template>
