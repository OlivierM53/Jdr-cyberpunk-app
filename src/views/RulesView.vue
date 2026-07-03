<script setup lang="ts">
import { computed, ref } from 'vue'
import { RULE_TABS } from '@/data/rules'
import RuleBlocks from '@/components/RuleBlocks.vue'

const activeId = ref(RULE_TABS[0]!.id)
const active = computed(() => RULE_TABS.find((tab) => tab.id === activeId.value) ?? RULE_TABS[0]!)
</script>

<template>
  <div class="mb-5 flex flex-wrap gap-2">
    <button
      v-for="tab in RULE_TABS"
      :key="tab.id"
      class="cursor-pointer border px-3 py-1.5 font-display text-[10px] font-semibold tracking-[0.16em] uppercase sm:px-4 sm:py-2 sm:text-[11px]"
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

  <RuleBlocks :blocks="active.blocks" :accent="active.accent" />
</template>
