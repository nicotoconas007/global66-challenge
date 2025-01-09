<script setup>
import { computed } from "vue";
import { useStore } from "../../store";
import BaseButton from "../buttons/BaseButton.vue";

const store = useStore();

const hasFavorites = computed(() => store.pokemonFavorites.length > 0);

const showFavorites = computed(() => store.showFavorites);

const toggleShowFavorites = (show) => {
  store.toggleShowFavorites(show);
};

const show = () => {
  toggleShowFavorites(true);
};

const hide = () => {
  toggleShowFavorites(false);
};
</script>

<template>
  <div
    class="flex justify-center fixed bottom-0 left-0 gap-4 w-screen bg-white py-5 pr-8 pl-5 shadow-2xl"
  >
    <BaseButton
      :class="{
        'bg-[#bfbfbf]': showFavorites,
      }"
      :label="'All'"
      :onClick="hide"
      :icon="'fas fa-list'"
      :width="'w-full sm:w-[270px]'"
      :padding="'py-2'"
    />
    <BaseButton
      :class="{
        'bg-[#bfbfbf]': !showFavorites,
      }"
      :label="'Favorites'"
      :onclick="show"
      :disabled="!hasFavorites"
      :icon="'fas fa-star'"
      :width="'w-full sm:w-[270px]'"
      :padding="'py-2'"
    />
  </div>
</template>
