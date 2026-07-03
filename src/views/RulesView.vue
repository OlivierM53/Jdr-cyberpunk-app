<script setup lang="ts">
import { computed } from 'vue'
import { RULE_TABS } from '@/data/rules'
import { useTabQuery } from '@/composables/useTabQuery'
import RuleBlocks from '@/components/RuleBlocks.vue'

const { activeId, selectTab } = useTabQuery(RULE_TABS)
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
      @click="selectTab(tab.id)"
    >
      {{ tab.label }}
    </button>
  </div>

  <RuleBlocks :blocks="active.blocks" :accent="active.accent" />
</template>
