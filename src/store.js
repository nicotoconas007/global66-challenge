import { defineStore } from "pinia";
import axios from "axios";

export const useStore = defineStore("store", {
  state: () => ({
    pokemonList: [],
    pokemonFavorites: [],
    showFavorites: false,
    isLoading: false,
    searchPokemon: "",
    urlGetPokemons: "https://pokeapi.co/api/v2/pokemon",
  }),

  actions: {
    async fetchPokemons() {
      this.isLoading = true;
      try {
        const response = await axios.get(this.urlGetPokemons);
        this.pokemonList = response.data.results;
        console.log(this.pokemonList)
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
    },

    async selectPokemon() {},
  },

  getters: {},
});
