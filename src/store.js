import { defineStore } from "pinia";
import axios from "axios";

export const useStore = defineStore("store", {
  state: () => ({
    pokemonList: [],
    pokemonFavorites:
      JSON.parse(localStorage.getItem("pokemonFavorites")) || [],
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
        const response = await axios.get(`${this.urlGetPokemons}`);
        this.pokemonList = response.data.results.map((pokemon, index) => ({
          id: index + 1,
          name: pokemon.name,
          isFavorite: this.pokemonFavorites.some(
            (fav) => fav.name === pokemon.name
          ),
        }));
      } catch (error) {
        console.error("Error", error);
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

      const pokemonIndex = this.pokemonList.findIndex(
        (poke) => poke.name === pokemon.name
      );
      if (pokemonIndex !== -1) {
        this.pokemonList[pokemonIndex] = {
          ...this.pokemonList[pokemonIndex],
          isFavorite: pokemon.isFavorite,
        };
      }

      localStorage.setItem(
        "pokemonFavorites",
        JSON.stringify(this.pokemonFavorites)
      );
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

  getters: {
    filteredPokemons(state) {
      if (!state.searchPokemon) {
        return state.pokemonList;
      }
      return state.pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(state.searchPokemon.toLowerCase())
      );
    },

    filteredFavorites(state) {
      if (!state.searchPokemon) {
        return state.pokemonFavorites;
      }
      return state.pokemonFavorites.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(state.searchPokemon.toLowerCase())
      );
    },

    pokemonsToDisplay(state) {
      const pokemons = state.showFavorites
        ? state.filteredFavorites
        : state.filteredPokemons;
      return pokemons;
    },
  },
});
