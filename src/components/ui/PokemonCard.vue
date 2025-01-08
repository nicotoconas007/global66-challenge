<script setup>
import { ref } from "vue";
import { useStore } from "../../store";
import FavoriteButton from "../buttons/FavoriteButton.vue";
import BaseButton from "../buttons/BaseButton.vue";
import PokemonDetailCard from "./PokemonDetailCard.vue";

const pokemonProps = defineProps({
  pokemon: Object,
  required: true,
});

const store = useStore();

const copied = ref(false);

const clearSelectedPokemon = () => {
  store.clearSelectedPokemon();
};

const capitalizeName = (name) => {
  return store.capitalizeName(name);
};

const pokemonDetails = [
  { label: "Name", value: pokemonProps.pokemon.name },
  { label: "Weight", value: pokemonProps.pokemon.weight },
  { label: "Height", value: pokemonProps.pokemon.height },
  { label: "Types", value: pokemonProps.pokemon.types },
];

const copyToClipBoard = () => {
  const pokemonInfo = pokemonDetails
    .map(({ label, value }) => `${label}: ${capitalizeName(value)}`)
    .join(", ");

  navigator.clipboard.writeText(pokemonInfo).then(() => {
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  });
};
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center pb-5 bg-black bg-opacity-50 z-50"
  >
    <div
      class="relative w-[560px] mx-7 sm:mx-16 xl:mx-0 bg-white rounded-md shadow"
    >
      <button
        @click="clearSelectedPokemon"
        class="absolute text-md lead font-bold text-[#81CDF9] hover:opacity-80 right-3 top-2 bg-white rounded-full w-6"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div
        class="bg-[url(background-card.png)] bg-cover bg-center h-[220px] rounded-t-md"
      >
        <div class="h-full flex justify-center items-center">
          <img        
            :src="pokemon.sprite"
            alt="Pokemon Image"
            width="170"
          />
        </div>
      </div>
      <div class="px-5 pb-5 pt-3">
        <ul class="flex flex-col justify-start items-start list-none">
          <li
            class="w-full px-2"
            v-for="(detail, index) in pokemonDetails"
            :key="index"
          >
            <PokemonDetailCard :label="detail.label" :value="detail.value" />
          </li>
        </ul>
        <div class="flex justify-between items-center mt-5">
          <BaseButton
            :onClick="copyToClipBoard"
            :label="copied ? 'Copied to clipboard' : 'Share to my friends'"
            :padding="'py-2.5 px-5'"
            :disabled="copied"
            :icon="copied ? 'fa-solid fa-check' : ''"
          />
          <FavoriteButton :pokemon="pokemonProps.pokemon" />
        </div>
      </div>
    </div>
  </div>
</template>
