<script setup>
import { useStore } from "../../store";

const store = useStore();
</script>

<template>
  <div class="mb-10 relative w-full pl-6 pr-8 xl:pl-0 xl:pr-4">
    <div class="absolute left-8 xl:left-2 top-[60%] transform -translate-y-1/2">
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
