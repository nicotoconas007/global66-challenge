<script setup>
import { computed } from "vue";
import { useStore } from "../../store";
import BaseButton from "../buttons/BaseButton.vue";

const store = useStore();

const hasFavorites = computed(() => store.pokemonFavorites.length > 0);

const showFavorites = computed(() => store.showFavorites);

const displayFavorites = () => {
  store.displayFavorites();
};

const hideFavorites = () => {
  store.hideFavorites();
};
</script>

<template>
  <div class="flex justify-center fixed bottom-0 left-0 gap-4 w-screen bg-white py-5 pr-8 pl-5 shadow-2xl">
    <BaseButton
      :class="{
        'bg-[#BFBFBF]': showFavorites,
      }"
      :label="'All'"
      :onClick="hideFavorites"
      :icon="'fas fa-list'"
      :width="'w-full sm:w-[270px]'"
      :padding="'py-2'"
    />
    <BaseButton
      :class="{
        'bg-[#BFBFBF]': !showFavorites,
      }"
      :label="'Favorites'"
      :onclick="displayFavorites"
      :disabled="!hasFavorites"
      :icon="'fas fa-star'"
      :width="'w-full sm:w-[270px]'"
      :padding="'py-2'"
    />
  </div>
</template>
