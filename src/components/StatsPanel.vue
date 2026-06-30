<script setup lang="ts">
import { useCharacterStore } from '@/stores/character'
import { STAT_DEFS } from '@/data/cyberpunk'

const store = useCharacterStore()
</script>

<template>
  <div class="relative mb-[18px] border border-line bg-panel px-5 py-[18px]">
    <div class="edge-accent"></div>
    <div class="mb-4 flex items-center gap-2">
      <span class="font-mono text-xs font-bold text-accent">▸</span>
      <h2 class="m-0 font-display text-[13px] font-semibold tracking-[0.22em] uppercase">
        Statistiques
      </h2>
      <div
        class="h-px flex-1"
        style="background: linear-gradient(90deg, var(--color-accent), transparent)"
      ></div>
      <span class="font-mono text-[10px] tracking-[0.14em] text-dim">TOTAL RÉPARTI</span>
      <span class="font-mono text-[15px] font-bold text-accent">{{ store.statSum }}</span>
    </div>

    <div class="grid grid-cols-5 gap-3">
      <div
        v-for="d in STAT_DEFS"
        :key="d.key"
        class="border border-line bg-black/25 p-3 pb-3.5"
      >
        <div class="flex items-baseline justify-between">
          <span class="font-mono text-lg font-bold tracking-[0.05em] text-accent">{{ d.key }}</span>
          <span class="font-display text-[30px] leading-none font-bold text-txt">{{
            store.char.stats[d.key]
          }}</span>
        </div>
        <div class="my-0.5 mb-[9px] font-display text-[11px] font-medium tracking-[0.1em] text-dim uppercase">
          {{ d.name }}
        </div>
        <div class="mb-[9px] h-[5px] overflow-hidden border border-line bg-black/50">
          <div
            class="h-full"
            :style="{
              width: (store.char.stats[d.key] ?? 0) * 10 + '%',
              background: 'var(--color-accent)',
              boxShadow: '0 0 6px var(--color-accent-glow)',
            }"
          ></div>
        </div>
        <div class="flex gap-1.5">
          <button
            class="flex-1 cursor-pointer border border-line bg-black/40 py-1 font-mono text-sm font-semibold text-txt hover:border-accent hover:text-accent"
            @click="store.setStat(d.key, -1)"
          >
            −
          </button>
          <button
            class="flex-1 cursor-pointer border border-line bg-black/40 py-1 font-mono text-sm font-semibold text-txt hover:border-accent hover:text-accent"
            @click="store.setStat(d.key, 1)"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
