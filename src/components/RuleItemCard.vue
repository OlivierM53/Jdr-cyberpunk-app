<script setup lang="ts">
import type { RuleAccent, RuleItem } from '@/data/rules'

defineProps<{ item: RuleItem; accent: RuleAccent }>()
</script>

<template>
  <div class="border border-line bg-black/20 p-4">
    <div class="mb-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
      <h4
        class="font-display text-base font-bold uppercase tracking-[0.04em]"
        :class="accent === 'accent2' ? 'text-accent-2' : 'text-accent'"
      >
        {{ item.name }}
      </h4>
      <span v-if="item.price" class="font-mono text-[11px] text-dim">{{ item.price }}</span>
    </div>
    <div v-if="item.subtitle" class="mb-3 font-mono text-[10px] tracking-[0.14em] text-dim uppercase">
      {{ item.subtitle }}
    </div>
    <div v-if="item.humanityCost" class="mb-3 font-mono text-[11px] tracking-[0.08em] text-accent-2">
      COÛT HUMANITÉ : {{ item.humanityCost }}
    </div>

    <div v-if="item.stats" class="mb-3 flex flex-wrap gap-3">
      <div v-for="(stat, i) in item.stats" :key="i" class="border border-line bg-black/30 px-2 py-1">
        <div class="font-mono text-[9px] tracking-[0.1em] text-dim uppercase">{{ stat.label }}</div>
        <div class="font-mono text-sm font-bold text-txt">{{ stat.value }}</div>
      </div>
    </div>

    <div v-if="item.rangeTable" class="mb-3 overflow-x-auto border border-line">
      <table class="w-full min-w-[420px] border-collapse font-mono text-[12px]">
        <thead>
          <tr class="border-b border-line bg-black/40">
            <th
              v-for="(h, i) in item.rangeTable.headers"
              :key="i"
              class="px-2 py-1.5 text-center text-[9px] tracking-[0.08em] text-dim uppercase"
            >
              {{ h }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              v-for="(cell, i) in item.rangeTable.row"
              :key="i"
              class="px-2 py-1.5 text-center font-semibold text-txt"
            >
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="item.notes" class="flex flex-col gap-2">
      <div v-for="(note, i) in item.notes" :key="i">
        <p v-if="!note.term" class="font-display text-[13px] leading-relaxed text-txt">
          {{ note.description }}
        </p>
        <div
          v-else
          class="border-l-2 pl-2.5"
          :class="accent === 'accent2' ? 'border-accent-2' : 'border-accent'"
        >
          <div
            class="font-display text-xs font-bold tracking-[0.02em] uppercase"
            :class="accent === 'accent2' ? 'text-accent-2' : 'text-accent'"
          >
            {{ note.term }}
          </div>
          <div class="font-display text-[13px] leading-relaxed text-txt">{{ note.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
