<script setup>
defineProps({
  label: String,
  type: {
    type: String,
    default: "button",
  },
  onClick: Function,
  disabled: {
    type: Boolean,
    default: false,
  },
  padding: {
    type: String,
    default: "px-[20px] py-[11px]",
  },
  width: {
    type: String,
  },
  icon: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <button
    :type="type"
    @click="onClick"
    :disabled="disabled"
    :class="[
      padding,
      width,
      'rounded-[60px] bg-[#F22539] hover:bg-[#C00E20] text-white text-lg leading-[22px] font-bold',
      { 'opacity-50 cursor-not-allowed hover:bg-slate-300': disabled },
    ]"
  >
    <i v-if="icon" :class="[icon, 'mr-2']"></i>
    {{ label }}
  </button>
</template>
