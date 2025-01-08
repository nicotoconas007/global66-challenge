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
        const response = await axios.get(`${this.urlGetPokemons}/?limit=151`);
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

    async selectPokemon(pokemonName) {
      this.isLoading = true;

      try {
        const response = await axios.get(
          `${this.urlGetPokemons}/${pokemonName}`
        );
        this.selectedPokemon = {
          name: response.data.name,
          weight: response.data.weight,
          height: response.data.height,
          types: response.data.types
            .map((typeInfo) => typeInfo.type.name)
            .join(", "),
          sprite: response.data.sprites.other["official-artwork"].front_default,
          isFavorite: this.pokemonFavorites.some(
            (fav) => fav.name === pokemonName
          ),
        };
      } catch (error) {
        console.error("Error", error);
      } finally {
        this.isLoading = false;
      }
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

      if (this.pokemonFavorites.length === 0) {
        this.showFavorites = false;
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
      return typeof name === "string"
        ? name
            .split(",")
            .map((word) =>
              word.trim().replace(/^(\w)/, (match) => match.toUpperCase())
            )
            .join(", ")
        : name;
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
