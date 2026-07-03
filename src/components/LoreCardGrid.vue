<script setup lang="ts">
import { computed } from 'vue'
import type { LoreAccent, LoreCard } from '@/data/lore'
import LoreEntryCard from '@/components/LoreEntryCard.vue'

const props = defineProps<{ intro?: string; cards: LoreCard[]; accent: LoreAccent }>()
const introParagraphs = computed(() => props.intro?.split('\n\n') ?? [])
</script>

<template>
  <div v-if="introParagraphs.length" class="mb-5">
    <p
      v-for="(para, i) in introParagraphs"
      :key="i"
      class="mb-2 font-display text-[15px] leading-relaxed text-txt last:mb-0"
    >
      {{ para }}
    </p>
  </div>

  <div class="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
    <LoreEntryCard v-for="card in cards" :key="card.name" :card="card" :accent="accent" />
  </div>
</template>
