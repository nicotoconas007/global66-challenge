<script setup>
import { useStore } from "../../store";
defineProps({
  pokemon: Object,
});

const store = useStore();
const toggleFavorite = (pokemon) => {
  store.toggleFavorite(pokemon);
};
</script>

<template>
  <button
    @click.stop="toggleFavorite(pokemon)"
    :class="{
      'text-[#ECA539]': pokemon.isFavorite,
      'text-[#BFBFBF]': !pokemon.isFavorite,
    }"
    class="text-2xl cursor-pointer bg-[#F5F5F5] rounded-full p-2"
  >
    <i class="fas fa-star"></i>
  </button>
</template>
