<script setup>
import { useStore } from "../../store";

const store = useStore();
</script>

<template>
  <div class="mb-10 relative w-full pl-6 pr-10 sm:pl-0 sm:pr-4">
    <div class="absolute left-8 sm:left-2 top-[60%] transform -translate-y-1/2">
      <i class="fas fa-search text-gray-500"></i>
    </div>
    <input
      v-model="store.searchPokemon"
      id="search"
      type="text"
      class="border w-full p-3 rounded-md pl-8 mt-2"
      placeholder="Search"
    />
  </div>
</template>
