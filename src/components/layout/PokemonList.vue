<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "../../store";
import FavoriteButton from "../buttons/FavoriteButton.vue";

const store = useStore();

onMounted(() => {
  if (store.pokemonList.length === 0) {
    store.fetchPokemons();
  }
});

const pokemonsToDisplay = computed(() => store.pokemonsToDisplay);

const selectPokemon = (pokemon) => {
  store.selectPokemon(pokemon);
};

const capitalizeName = (pokemon) => {
  return store.capitalizeName(pokemon);
};
</script>

<template>
  <div class="w-full px-6 sm:p-0">
    <div class="h-[74vh] 2xl:h-[77vh] flex flex-col gap-2 scroll-container">
      <div
        v-for="pokemon in pokemonsToDisplay"
        :key="pokemon.name"
        class="flex justify-between items-center border p-2 bg-white rounded-md"
        @click.stop="selectPokemon(pokemon.name)"
      >
        <span class="font-medium text-[22px] leading-[26px] ml-4">
          {{ capitalizeName(pokemon.name) }}
        </span>
        <FavoriteButton :pokemon="pokemon" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-container {
  overflow-y: auto;
  padding-right: 10px;
}

.scroll-container::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 10px;
  border: 2px solid #f5f5f5;
}
</style>
