<script setup lang="ts">
import { useCharacterStore } from '@/stores/character'
import { STAT_DEFS } from '@/data/cyberpunk'
import InfoTooltip from '@/components/InfoTooltip.vue'

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

    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <div
        v-for="d in STAT_DEFS"
        :key="d.key"
        class="border border-line bg-inset/25 p-3 pb-3.5 h-40 flex flex-col"
      >
        <div class="flex items-baseline justify-between">
          <span class="flex items-center gap-1.5">
            <span class="font-mono text-lg font-bold tracking-[0.05em] text-accent">{{ d.key }}</span>
            <InfoTooltip :text="d.description" />
          </span>
          <span class="font-display text-[30px] leading-none font-bold text-txt">{{
            store.char.stats[d.key]
          }}</span>
        </div>
        <div class="my-0.5 mb-[9px] font-display text-[11px] font-medium tracking-[0.1em] text-dim uppercase">
          {{ d.name }}
        </div>
        <div class="mb-[9px] h-[5px] overflow-hidden border border-line bg-inset/50">
          <div
            class="h-full"
            :style="{
              width: (store.char.stats[d.key] ?? 0) * 10 + '%',
              background: 'var(--color-accent)',
              boxShadow: '0 0 6px var(--color-accent-glow)',
            }"
          ></div>
        </div>
        <div
          v-if="d.key === 'CHA'"
          class="mb-[9px] flex items-center justify-between font-mono text-[10px] tracking-[0.1em] text-dim uppercase"
        >
          <span>Actuelle</span>
          <span class="flex items-center gap-1">
            <button
              class="h-4 w-4 cursor-pointer border border-line bg-inset/40 text-[10px] leading-none text-txt hover:border-accent hover:text-accent"
              @click="store.setChance(-1)"
            >
              −
            </button>
            <span class="w-4 text-center font-mono text-xs font-semibold text-txt">{{
              store.chanceNow
            }}</span>
            <button
              class="h-4 w-4 cursor-pointer border border-line bg-inset/40 text-[10px] leading-none text-txt hover:border-accent hover:text-accent"
              @click="store.setChance(1)"
            >
              +
            </button>
          </span>
        </div>
        <div
          v-else-if="d.key === 'EMP'"
          class="mb-[9px] flex items-center justify-between font-mono text-[10px] tracking-[0.1em] text-dim uppercase"
        >
          <span>Empathie réelle</span>
          <span class="font-mono text-xs font-semibold text-accent">{{ store.empathyEffective }}</span>
        </div>
        <div class="flex gap-1.5 mt-auto">
          <button
            class="flex-1 cursor-pointer border border-line bg-inset/40 py-1 font-mono text-sm font-semibold text-txt hover:border-accent hover:text-accent"
            @click="store.setStat(d.key, -1)"
          >
            −
          </button>
          <button
            class="flex-1 cursor-pointer border border-line bg-inset/40 py-1 font-mono text-sm font-semibold text-txt hover:border-accent hover:text-accent"
            @click="store.setStat(d.key, 1)"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
