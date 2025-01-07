<script setup>
import { onMounted } from "vue";
import { useStore } from "../../store";

const store = useStore();

onMounted(() => {
  store.fetchPokemons();
});
</script>

<template>
  <div v-for="pokemon in store.pokemonList">
    {{ pokemon.name }}
  </div>
</template>
