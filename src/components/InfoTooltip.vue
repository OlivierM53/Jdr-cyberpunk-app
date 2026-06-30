<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
  <span class="group relative inline-flex">
    <span
      tabindex="0"
      class="grid h-3.5 w-3.5 cursor-help place-items-center rounded-full border border-line font-mono text-[9px] leading-none text-dim outline-none group-hover:border-accent group-hover:text-accent group-focus-within:border-accent group-focus-within:text-accent"
    >
      i
    </span>
    <span
      class="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 border border-accent bg-panel p-2 text-left font-display text-xs leading-snug text-txt opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      style="box-shadow: 0 0 12px var(--color-accent-glow)"
    >
      {{ text }}
    </span>
  </span>
</template>
