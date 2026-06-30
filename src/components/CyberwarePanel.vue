<script setup lang="ts">
import { useCharacterStore } from '@/stores/character'

const store = useCharacterStore()
</script>

<template>
  <div class="relative border border-line bg-panel px-5 py-[18px]">
    <div class="edge-accent-2"></div>
    <div class="mb-3.5 flex items-center gap-2">
      <span class="font-mono text-xs font-bold text-accent-2">▸</span>
      <h2 class="m-0 font-display text-[13px] font-semibold tracking-[0.22em] uppercase">
        Cyberware
      </h2>
      <div
        class="h-px flex-1"
        style="background: linear-gradient(90deg, var(--color-accent-2), transparent)"
      ></div>
      <span class="font-mono text-[10px] text-dim">COÛT HUM.</span>
    </div>

    <div class="mb-3 flex flex-col gap-[7px]">
      <div
        v-for="cw in store.char.cyberware"
        :key="cw.id"
        class="flex items-center gap-2 border border-line bg-black/25 px-2 py-1.5"
      >
        <span class="font-mono text-[11px] font-bold text-accent-2">⬡</span>
        <input
          :value="cw.name"
          placeholder="Implant…"
          class="flex-1 border-0 bg-transparent font-display text-sm font-medium text-txt outline-none"
          @change="store.updateCyber(cw.id, { name: ($event.target as HTMLInputElement).value })"
        />
        <input
          :value="cw.cost"
          class="w-[42px] border border-line bg-black/40 p-[3px] text-center font-mono text-[13px] font-bold text-accent-2 outline-none focus:border-accent-2"
          @change="
            store.updateCyber(cw.id, { cost: parseInt(($event.target as HTMLInputElement).value) || 0 })
          "
        />
        <button
          class="h-6 w-6 cursor-pointer border border-line bg-transparent font-mono text-[13px] leading-none text-dim hover:border-accent-2 hover:text-accent-2"
          @click="store.removeCyber(cw.id)"
        >
          ✕
        </button>
      </div>
    </div>

    <button
      class="w-full cursor-pointer border border-dashed border-line bg-transparent py-2.5 font-display text-[11px] font-semibold tracking-[0.16em] text-dim uppercase hover:border-accent-2 hover:text-accent-2"
      @click="store.addCyber()"
    >
      + Ajouter un implant
    </button>
  </div>
</template>
