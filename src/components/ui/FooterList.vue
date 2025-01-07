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
  <div class="flex justify-center gap-4">
    <BaseButton
      :class="{
        'bg-slate-300': showFavorites,
      }"
      :label="'All'"
      :onClick="hideFavorites"
      :icon="'fas fa-list'"
    />
    <BaseButton
      :class="{
        'bg-slate-300': !showFavorites,
      }"
      :label="'Favorites'"
      :onclick="displayFavorites"
      :disabled="!hasFavorites"
      :icon="'fas fa-star'"
    />
  </div>
</template>
