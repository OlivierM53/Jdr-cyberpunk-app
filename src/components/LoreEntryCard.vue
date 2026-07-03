<script setup lang="ts">
import type { LoreAccent, LoreCard } from '@/data/lore'
import { assetUrl } from '@/utils/asset'

defineProps<{ card: LoreCard; accent: LoreAccent }>()
</script>

<template>
  <div class="relative flex flex-col border border-line bg-panel p-5 sm:flex-row sm:items-center">
    <div :class="accent === 'accent2' ? 'edge-accent-2' : 'edge-accent'"></div>
    <img v-if="card.logo" :src="assetUrl(card.logo)" :alt="card.name"
      class="mx-auto h-30 w-30 flex-none border border-line object-cover sm:mx-0" />
    <div class="flex flex-col pt-3 sm:pl-4 sm:pt-0">
      <div class="mb-2 flex items-start justify-between gap-3">
        <div class="flex items-center gap-3">
          <h3 class="font-display text-lg font-bold text-txt uppercase tracking-[0.04em]">
            {{ card.name }}
          </h3>
        </div>
        <span class="whitespace-nowrap border px-2 py-1 font-mono text-[10px] tracking-[0.08em] uppercase"
          :class="accent === 'accent2' ? 'border-accent-2 text-accent-2' : 'border-accent text-accent'">
          {{ card.badge }}
        </span>
      </div>
      <p class="mb-3 font-display text-[15px] leading-relaxed text-accent">{{ card.description }}</p>
      <p v-if="card.footer" class="flex gap-1.5 font-mono text-xs text-dim">
        <span>{{ accent === 'accent2' ? '▸' : '◈' }}</span>
        <span>{{ card.footer }}</span>
      </p>
    </div>
  </div>
</template>
