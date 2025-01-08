<script setup>
import { useStore } from "../../store";

const store = useStore();

const capitalizeName = (name) => {
  return store.capitalizeName(name);
};
defineProps({
  label: String,
  value: [String, Number],
});
</script>

<template>
  <div class="py-2 border-b border-gray-[#bfbfbf] text-start">
    <strong>{{ label }}:</strong> {{ capitalizeName(value) }}
  </div>
</template>
