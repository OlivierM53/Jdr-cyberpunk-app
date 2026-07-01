<script setup lang="ts">
import type { LoreAccent, LoreTimelineEntry } from '@/data/lore'

defineProps<{ entries: LoreTimelineEntry[]; accent: LoreAccent }>()
</script>

<template>
  <div class="relative border border-line bg-panel p-6">
    <div :class="accent === 'accent2' ? 'edge-accent-2' : 'edge-accent'"></div>
    <div class="space-y-4 border-l-2 border-line pl-5">
      <div v-for="(entry, i) in entries" :key="i" class="relative">
        <span
          class="absolute -left-[27px] top-1 h-3 w-3 rounded-full"
          :class="accent === 'accent2' ? 'bg-accent-2' : 'bg-accent'"
        ></span>
        <div
          class="font-mono text-xs font-bold"
          :class="accent === 'accent2' ? 'text-accent-2' : 'text-accent'"
        >
          {{ entry.year }}
        </div>
        <div class="font-display text-[15px] leading-relaxed text-txt">{{ entry.event }}</div>
      </div>
    </div>
  </div>
</template>
