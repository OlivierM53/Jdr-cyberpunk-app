<script setup lang="ts">
import type { LoreAccent, LoreSection } from '@/data/lore'

defineProps<{
  sections: LoreSection[]
  accent: LoreAccent
  intro?: string
  outro?: string
}>()
</script>

<template>
  <div class="relative border border-line bg-panel p-6">
    <div :class="accent === 'accent2' ? 'edge-accent-2' : 'edge-accent'"></div>

    <p v-if="intro" class="mb-4 font-display text-[15px] leading-relaxed text-txt">{{ intro }}</p>

    <div v-for="(section, i) in sections" :key="i" class="mb-5 last:mb-0">
      <h3
        v-if="section.heading"
        class="mb-2 font-display text-sm font-bold tracking-[0.12em] uppercase"
        :class="accent === 'accent2' ? 'text-accent-2' : 'text-accent'"
      >
        {{ section.heading }}
      </h3>
      <ul class="space-y-1.5">
        <li
          v-for="(item, j) in section.items"
          :key="j"
          class="flex gap-2 font-display text-[15px] leading-relaxed text-txt"
        >
          <span class="text-dim">▸</span>
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>

    <p v-if="outro" class="mt-4 font-display text-[15px] leading-relaxed text-txt">{{ outro }}</p>
  </div>
</template>
