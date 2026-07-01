<script setup lang="ts">
import type { LoreAccent, LoreDefinition } from '@/data/lore'

defineProps<{ entries: LoreDefinition[]; accent: LoreAccent; title?: string }>()
</script>

<template>
  <div>
    <h3 v-if="title" class="mb-3 font-mono text-[10px] tracking-[0.2em] text-dim uppercase">
      {{ title }}
    </h3>
    <div class="grid grid-cols-2 gap-x-5 gap-y-3">
      <div
        v-for="entry in entries"
        :key="entry.term"
        class="border-l-2 pl-3"
        :class="accent === 'accent2' ? 'border-accent-2' : 'border-accent'"
      >
        <div
          class="font-display text-sm font-bold tracking-[0.04em] uppercase"
          :class="accent === 'accent2' ? 'text-accent-2' : 'text-accent'"
        >
          {{ entry.term }}
        </div>
        <div class="font-display text-[14px] leading-relaxed text-txt">{{ entry.description }}</div>
      </div>
    </div>
  </div>
</template>
