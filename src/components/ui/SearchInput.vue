<script setup>
import { useStore } from "../../store";

const store = useStore();
</script>

<template>
  <div class="mb-10 relative w-full text-[16px] leading-4 px-6 sm:px-0">
    <div class="absolute left-8 sm:left-2 top-[60%] transform -translate-y-1/2">
      <i class="fas fa-search text-[#BFBFBF]"></i>
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