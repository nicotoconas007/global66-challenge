import { defineStore } from "pinia";
import axios from "axios";

export const useStore = defineStore("store", {
  state: () => ({
    pokemonList: [],
    pokemonFavorites: [],
    showFavorites: false,
    isLoading: false,
    searchPokemon: "",
    selectedPokemon: '',
    urlGetPokemons: "https://pokeapi.co/api/v2/pokemon",
  }),

  actions: {
    async fetchPokemons() {
      this.isLoading = true;
      try {
        const response = await axios.get(this.urlGetPokemons);
        this.pokemonList = response.data.results;
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
    },

    async selectPokemon(pokemon) {
        this.selectedPokemon = pokemon;
        console.log(this.selectedPokemon)
    },

    clearSelectedPokemon() {
        this.selectedPokemon = null;
    },

    displayFavorites() {
      this.showFavorites = true;
    },

    hideFavorites() {
      this.showFavorites = false;
    },
  },

  getters: {},
});
