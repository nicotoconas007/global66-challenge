import { defineStore } from "pinia";
import axios from "axios";

export const useStore = defineStore("store", {
  state: () => ({
    pokemonList: [],
    pokemonFavorites: [],
    showFavorites: false,
    isLoading: false,
    searchPokemon: "",
    selectedPokemon: "",
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
      console.log(this.selectedPokemon);
    },

    clearSelectedPokemon() {
      this.selectedPokemon = null;
    },

    toggleFavorite(pokemon) {
      pokemon.isFavorite = !pokemon.isFavorite;
      if (pokemon.isFavorite) {
        this.pokemonFavorites.push(pokemon);
      } else {
        this.pokemonFavorites = this.pokemonFavorites.filter(
          (fav) => fav.name !== pokemon.name
        );
      }
    },

    displayFavorites() {
      this.showFavorites = true;
    },

    hideFavorites() {
      this.showFavorites = false;
    },

    capitalizeName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
  },

  getters: {},
});
