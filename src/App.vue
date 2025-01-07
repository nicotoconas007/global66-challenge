<script setup>
import { ref } from "vue";
import HomePage from "./components/layout/HomePage.vue";
import PokemonList from "./components/layout/PokemonList.vue";

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
      <PokemonList />
    </div>
  </div>
</template>
