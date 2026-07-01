<script setup lang="ts">
import type { LoreAccent, LoreCard } from '@/data/lore'

defineProps<{ card: LoreCard; accent: LoreAccent }>()
</script>

<template>
  <div class="relative border border-line bg-panel p-5">
    <div :class="accent === 'accent2' ? 'edge-accent-2' : 'edge-accent'"></div>
    <div class="mb-2 flex items-start justify-between gap-3">
      <h3 class="font-display text-lg font-bold text-txt uppercase tracking-[0.04em]">
        {{ card.name }}
      </h3>
      <span
        class="whitespace-nowrap border px-2 py-1 font-mono text-[10px] tracking-[0.08em] uppercase"
        :class="accent === 'accent2' ? 'border-accent-2 text-accent-2' : 'border-accent text-accent'"
      >
        {{ card.badge }}
      </span>
    </div>
    <p class="mb-3 font-display text-[15px] leading-relaxed text-accent">{{ card.description }}</p>
    <p v-if="card.footer" class="flex gap-1.5 font-mono text-xs text-dim">
      <span>{{ accent === 'accent2' ? '▸' : '◈' }}</span>
      <span>{{ card.footer }}</span>
    </p>
  </div>
</template>
