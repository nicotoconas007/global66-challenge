<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "../../store";
import FavoriteButton from "../buttons/FavoriteButton.vue";
import PokemonCard from "../ui/PokemonCard.vue";

const store = useStore();

onMounted(() => {
  if (store.pokemonList.length === 0) {
    store.fetchPokemons();
  }
});

const pokemonsToDisplay = computed(() => store.pokemonsToDisplay);

const visibleCount = ref(20);

const visiblePokemons = computed(() => {
  return pokemonsToDisplay.value.slice(0, visibleCount.value);
});

const loadMorePokemons = () => {
  if (visibleCount.value < pokemonsToDisplay.value.length) {
    visibleCount.value += 20;
  }
};

const onScroll = (event) => {
  const scrollContainer = event.target;
  const isAtBottom =
    scrollContainer.scrollHeight ===
    scrollContainer.scrollTop + scrollContainer.clientHeight;

  if (isAtBottom) {
    loadMorePokemons();
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
  <PokemonCard :pokemon="selectedPokemon" v-if="selectedPokemon" />
  <div class="w-full px-6 sm:p-0">
    <div
      class="h-[74vh] 2xl:h-[77vh] flex flex-col gap-2 scroll-container"
      @scroll="onScroll"
    >
      <div
        v-for="pokemon in visiblePokemons"
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
