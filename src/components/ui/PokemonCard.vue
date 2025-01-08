<script setup>
import { useStore } from "../../store";
import FavoriteButton from "../buttons/FavoriteButton.vue";
import BaseButton from "../buttons/BaseButton.vue";
defineProps({
  pokemon: Object,
});

const store = useStore();
const clearSelectedPokemon = () => {
  store.clearSelectedPokemon();
};
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div
      @click.stop
      class="max-w-[560px] mx-7 sm:mx-16 xl:mx-0 bg-white border border-gray-200 rounded-lg shadow"
    >
      <img class="rounded-t-lg" src="/background-card.png" alt="Background" />
      <div class="p-5">
        <ul class="flex flex-col justify-start items-start gap-3 list-none">
          <li class="py-2 border-b border-gray-[#bfbfbf]">
            Name: {{ pokemon.name }}
          </li>
          <li class="py-2 border-b border-gray-[#bfbfbf]">
            Weight: {{ pokemon.weight }}
          </li>
          <li class="py-2 border-b border-gray-[#bfbfbf]">
            Height: {{ pokemon.height }}
          </li>
          <li class="py-2">Types: {{ pokemon.types }}</li>
        </ul>
        <div class="flex justify-between items-center mt-5">
          <BaseButton :label="'Share to my friends'" :padding="'py-2.5 px-5'" />
          <FavoriteButton :pokemon="pokemon" />
        </div>
      </div>
    </div>
  </div>
</template>
