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
  <div class="w-full p-6 xl:p-0">
    <div class="flex flex-col gap-2">
      <div class="max-h-[400px] scroll-container">
        <div
          v-for="pokemon in pokemonsToDisplay"
          :key="pokemon.name"
          class="flex justify-between items-center border p-3 bg-white rounded-md"
          @click.stop="selectPokemon(pokemon.name)"
        >
          <span class="font-medium text-[22px] leading-[26px] ml-4">
            {{ capitalizeName(pokemon.name) }}
          </span>
          <FavoriteButton :pokemon="pokemon" />
        </div>
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
