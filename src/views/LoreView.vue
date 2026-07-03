<script setup lang="ts">
import { computed, ref } from 'vue'
import { LORE_TABS } from '@/data/lore'
import { assetUrl } from '@/utils/asset'
import LoreCardGrid from '@/components/LoreCardGrid.vue'
import LoreSectionList from '@/components/LoreSectionList.vue'
import LoreDefinitionList from '@/components/LoreDefinitionList.vue'
import LoreTimeline from '@/components/LoreTimeline.vue'

const activeId = ref(LORE_TABS[0]!.id)
const active = computed(() => LORE_TABS.find((tab) => tab.id === activeId.value) ?? LORE_TABS[0]!)
</script>

<template>
  <div class="mb-5 flex flex-wrap gap-2">
    <button
      v-for="tab in LORE_TABS"
      :key="tab.id"
      class="cursor-pointer border px-3 py-1.5 font-display text-[10px] font-semibold tracking-[0.16em] uppercase sm:px-4 sm:py-2 sm:text-[11px] bg-panel"
      :class="
        activeId === tab.id
          ? tab.accent === 'accent2'
            ? 'border-accent-2 bg-accent-soft text-accent-2'
            : 'border-accent bg-accent-soft text-accent'
          : 'border-line text-dim hover:text-accent'
      "
      @click="activeId = tab.id"
    >
      {{ tab.label }}
    </button>
  </div>

  <LoreCardGrid
    v-if="active.content.kind === 'cards'"
    :intro="active.content.intro"
    :cards="active.content.cards"
    :accent="active.accent"
  />

  <LoreSectionList
    v-else-if="active.content.kind === 'sections'"
    :intro="active.content.intro"
    :outro="active.content.outro"
    :sections="active.content.sections"
    :accent="active.accent"
  />

  <template v-else-if="active.content.kind === 'nightcity'">
    <div class="relative  border border-line bg-panel p-6">
      <div :class="active.accent === 'accent2' ? 'edge-accent-2' : 'edge-accent'"></div>
      <h3
        class="mb-2 font-display text-sm font-bold tracking-[0.12em] uppercase"
        :class="active.accent === 'accent2' ? 'text-accent-2' : 'text-accent'"
      >
        La ville
      </h3>
      <div class="flex flex-col gap-6 sm:flex-row sm:gap-10">
        <img
        :src="assetUrl('night-city.webp')"
        alt="Night City"
        class="mb-5 w-full border border-line object-cover sm:w-1/2"
        />
        <LoreDefinitionList title="Districts" :entries="active.content.districts" :accent="active.accent" />
      </div>
    </div>
    <LoreSectionList
    class="mt-4.5"
      :sections="[{ heading: 'Histoire', items: active.content.histoire }]"
      :accent="active.accent"
    />
    <LoreSectionList
      class="mt-4.5"
      :sections="[{ heading: 'Trivia', items: active.content.trivia }]"
      :accent="active.accent"
    />
  </template>

  <LoreTimeline
    v-else-if="active.content.kind === 'timeline'"
    :entries="active.content.entries"
    :accent="active.accent"
  />

  <div v-else-if="active.content.kind === 'glossary'" class="relative border border-line bg-panel p-6">
    <div :class="active.accent === 'accent2' ? 'edge-accent-2' : 'edge-accent'"></div>
    <LoreDefinitionList :entries="active.content.entries" :accent="active.accent" />
  </div>
</template>
