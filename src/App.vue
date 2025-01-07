<script setup>
import { computed, ref } from "vue";
import { useStore } from "./store";
import HomePage from "./components/layout/HomePage.vue";
import PokemonList from "./components/layout/PokemonList.vue";
import NotFound from "./components/ui/NotFound.vue";

const store = useStore();

const pokemonsToDisplay = computed(() => store.pokemonList);

const currentView = ref("home");

const handleGetStarted = () => {
  currentView.value = "list";
};
const handleGoBackHome = () => {
  currentView.value = "home";
};
</script>

<template>
  <div class="max-w-[570px] m-auto text-[#353535]">
    <HomePage :start="handleGetStarted" v-if="currentView === 'home'" />
    <div
      v-else-if="currentView === 'list'"
      class="h-screen flex flex-col items-center justify-start mt-20 gap-3"
    >
      <NotFound v-if="pokemonsToDisplay.length < 22" :goBack="handleGoBackHome" />
      <PokemonList />
    </div>
  </div>
</template>
