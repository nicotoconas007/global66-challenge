<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "../../store";
import FavoriteButton from "../buttons/FavoriteButton.vue";
import PokemonCard from "../ui/PokemonCard.vue";

const store = useStore();

onMounted(() => {
  if (store.pokemonList.length === 0 && !store.error) {
    store.fetchPokemons();
  }
});

const pokemonsToDisplay = computed(() => store.pokemonsToDisplay);

const onScroll = (event) => {
  const scrollContainer = event.target;
  const tolerance = 5;
  const isAtBottom =
    scrollContainer.scrollHeight <=
    scrollContainer.scrollTop + scrollContainer.clientHeight + tolerance;

  if (isAtBottom) {
    store.loadMorePokemons();
  }
};

const selectedPokemon = computed(() => store.selectedPokemon);

const selectPokemon = (pokemon) => {
  store.selectPokemon(pokemon);
};

const capitalizeName = (name) => {
  return store.capitalizeName(name);
};
</script>

<template>
  <div v-if="selectedPokemon && !store.isLoading">
    <PokemonCard :pokemon="selectedPokemon" />
  </div>

  <div class="w-full px-6 sm:p-0">
    <ul
      class="h-[74vh] 2xl:h-[77vh] flex flex-col gap-2 scroll-container"
      @scroll="onScroll"
    >
      <li
        v-for="pokemon in pokemonsToDisplay"
        :key="pokemon.name"
        class="flex justify-between items-center border p-2 bg-white rounded-md cursor-pointer"
        @click.stop="selectPokemon(pokemon.name)"
      >
        <span class="font-medium text-[22px] leading-[26px] ml-4">
          {{ capitalizeName(pokemon.name) }}
        </span>
        <FavoriteButton :pokemon="pokemon" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.scroll-container {
  overflow-y: auto;
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
