<script setup lang="ts">
import type { RuleAccent, RuleBlock } from '@/data/rules'
import LoreDefinitionList from '@/components/LoreDefinitionList.vue'

defineProps<{ blocks: RuleBlock[]; accent: RuleAccent }>()
</script>

<template>
  <div class="relative border border-line bg-panel p-6">
    <div :class="accent === 'accent2' ? 'edge-accent-2' : 'edge-accent'"></div>

    <template v-for="(block, i) in blocks" :key="i">
      <h3
        v-if="block.kind === 'heading'"
        class="mb-2 mt-5 font-display text-sm font-bold tracking-[0.12em] uppercase first:mt-0"
        :class="accent === 'accent2' ? 'text-accent-2' : 'text-accent'"
      >
        {{ block.text }}
      </h3>

      <p v-else-if="block.kind === 'paragraph'" class="mb-4 font-display text-[15px] leading-relaxed text-txt">
        {{ block.text }}
      </p>

      <ul v-else-if="block.kind === 'list'" class="mb-4 space-y-1.5">
        <li
          v-for="(item, j) in block.items"
          :key="j"
          class="flex gap-2 font-display text-[15px] leading-relaxed text-txt"
        >
          <span class="text-dim">▸</span>
          <span>{{ item }}</span>
        </li>
      </ul>

      <LoreDefinitionList
        v-else-if="block.kind === 'definitions'"
        class="mb-4"
        :entries="block.entries"
        :accent="accent"
      />

      <div v-else-if="block.kind === 'formula'" class="mb-4 border border-line bg-black/30 p-3 font-mono text-[13px] leading-relaxed text-txt flex flex-col items-center">
        <div
          v-for="(line, j) in block.lines"
          :key="j"
          class="w-fit"
          :class="{'my-0.5 text-dim italic': line === 'contre', 'my-0. font-bold': line === 'ou'}"
        >
          {{ line }}
        </div>
      </div>

      <div v-else-if="block.kind === 'table'" class="mb-4 overflow-x-auto border border-line">
        <table class="w-full min-w-[420px] border-collapse font-mono text-[13px]">
          <thead>
            <tr class="border-b border-line bg-black/40">
              <th
                v-for="(h, hi) in block.headers"
                :key="hi"
                class="px-3 py-2 text-left text-[10px] tracking-[0.12em] text-dim uppercase"
              >
                {{ h }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, ri) in block.rows" :key="ri" class="border-b border-line last:border-b-0">
              <td
                v-for="(cell, ci) in row"
                :key="ci"
                class="px-3 py-2 font-display text-[13px] leading-snug text-txt"
                :class="ci === 0 ? (accent === 'accent2' ? 'font-semibold text-accent-2' : 'font-semibold text-accent') : ''"
              >
                {{ cell }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>
