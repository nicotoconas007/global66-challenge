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
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div
      class="max-w-[560px] mx-7 sm:mx-16 xl:mx-0 bg-white border border-gray-200 rounded-lg shadow"
    >
      <img class="rounded-t-lg" src="/background-card.png" alt="Background" />
      <div class="p-5">
        <ul class="flex flex-col justify-start items-start gap-3 list-none">
          <li
            class="w-full"
            v-for="(detail, index) in pokemonDetails"
            :key="index"
          >
            <PokemonDetailCard :label="detail.label" :value="detail.value" />
          </li>
        </ul>
        <div class="flex justify-between items-center mt-5">
          <BaseButton
            :onClick="copyToClipBoard"
            :label="
              copied ? 'Copied to clipboard' : 'Share to my friends'
            "
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
