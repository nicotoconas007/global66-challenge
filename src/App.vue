<script setup>
import { computed, ref } from "vue";
import { useStore } from "./store";
import HomePage from "./components/layout/HomePage.vue";
import PokemonList from "./components/layout/PokemonList.vue";
import NotFound from "./components/ui/NotFound.vue";
import SearchInput from "./components/ui/SearchInput.vue";
import FooterList from "./components/ui/FooterList.vue";
import Loader from "./components/ui/Loader.vue";

const store = useStore();

const currentView = ref("home");

const handleGetStarted = () => {
  currentView.value = "list";
};
const handleGoBackHome = () => {
  currentView.value = "home";
  store.toggleShowFavorites(false);
  store.error = false;
};

const pokemonsToDisplay = computed(() => store.pokemonsToDisplay);

const hasPokemons = computed(() => pokemonsToDisplay.value.length > 0);

const isLoading = computed(() => store.isLoading);
</script>

<template>
  <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center">
    <Loader class="w-16 h-16 animate-spin" />
  </div>
  <div class="max-w-[570px] m-auto text-[#353535]">
    <HomePage :start="handleGetStarted" v-if="currentView === 'home'" />
    <div
      v-else-if="currentView === 'list'"
      class="flex flex-col items-center justify-start mt-10"
    >
      <SearchInput />
      <NotFound
        v-if="!hasPokemons && !isLoading"
        :goBack="handleGoBackHome"
      />
      <PokemonList />
      <FooterList v-if="hasPokemons" />
    </div>
  </div>
</template>
