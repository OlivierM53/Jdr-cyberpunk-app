<script setup lang="ts">
import { useCharacterStore } from '@/stores/character'

const store = useCharacterStore()

function onHumanityInput(e: Event) {
  store.setHumanityVal((e.target as HTMLInputElement).value)
}
function onEddiesInput(e: Event) {
  store.setEddies((e.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="relative border border-line bg-panel p-[18px]">
    <div class="edge-accent-2"></div>
    <div class="mb-4 flex items-center gap-2">
      <span class="font-mono text-xs font-bold text-accent-2">▸</span>
      <h2 class="m-0 font-display text-[13px] font-semibold tracking-[0.22em] uppercase">
        Constantes
      </h2>
      <div
        class="h-px flex-1"
        style="background: linear-gradient(90deg, var(--color-accent-2), transparent)"
      ></div>
    </div>

    <!-- HP -->
    <div class="mb-4">
      <div class="mb-1.5 flex items-end justify-between">
        <span class="font-mono text-[10px] tracking-[0.16em] text-dim">POINTS DE VIE</span>
        <span class="font-mono text-base font-bold text-accent-2">
          {{ store.char.hp }}<span class="text-xs text-dim"> / {{ store.hpMax }}</span>
        </span>
      </div>
      <div class="relative h-[9px] overflow-hidden border border-line bg-inset/50">
        <div
          class="absolute inset-y-0 left-0"
          :style="{
            width: store.hpPct + '%',
            background: 'linear-gradient(90deg, var(--color-accent-2), #ff7ab0)',
            boxShadow: '0 0 10px var(--color-accent-2)',
          }"
        ></div>
      </div>
      <div class="mt-2 flex gap-1.5">
        <button
          class="flex-1 cursor-pointer border border-line bg-inset/40 py-1.5 font-mono text-sm font-semibold text-txt hover:border-accent-2 hover:text-accent-2"
          @click="store.setHp(-1)"
        >
          −
        </button>
        <button
          class="flex-1 cursor-pointer border border-line bg-inset/40 py-1.5 font-mono text-sm font-semibold text-txt hover:border-accent-2 hover:text-accent-2"
          @click="store.setHp(1)"
        >
          +
        </button>
        <button
          class="flex-[2] cursor-pointer border border-line bg-inset/40 py-1.5 font-display text-[10px] font-semibold tracking-[0.12em] text-dim uppercase hover:border-accent-2 hover:text-accent-2"
          @click="store.fullHeal()"
        >
          Soin total
        </button>
      </div>
    </div>

    <!-- HUMANITÉ -->
    <div class="mb-4">
      <div class="mb-1.5 flex items-end justify-between">
        <span class="font-mono text-[10px] tracking-[0.16em] text-dim">HUMANITÉ</span>
        <span class="flex items-baseline font-mono text-base font-bold text-accent">
          <input
            :value="store.humanityNow"
            class="w-[42px] border-0 bg-transparent text-right font-mono text-base font-bold text-accent outline-none"
            @change="onHumanityInput"
          /><span class="text-xs text-dim"> / {{ store.humanityMax }}</span>
        </span>
      </div>
      <div class="relative h-[9px] overflow-hidden border border-line bg-inset/50">
        <div
          class="absolute inset-y-0 left-0"
          :style="{
            width: store.humanityPct + '%',
            background: 'linear-gradient(90deg, var(--color-accent), #9af3ff)',
            boxShadow: '0 0 10px var(--color-accent-glow)',
          }"
        ></div>
      </div>
      <div class="mt-2 flex gap-1.5">
        <button
          class="flex-1 cursor-pointer border border-line bg-inset/40 py-1.5 font-mono text-sm font-semibold text-txt hover:border-accent hover:text-accent"
          @click="store.setHumanity(-1)"
        >
          −
        </button>
        <button
          class="flex-1 cursor-pointer border border-line bg-inset/40 py-1.5 font-mono text-sm font-semibold text-txt hover:border-accent hover:text-accent"
          @click="store.setHumanity(1)"
        >
          +
        </button>
      </div>
    </div>

    <!-- ARMURE -->
    <div class="grid grid-cols-2 gap-2.5">
      <div class="border border-line bg-inset/25 px-2.5 py-2">
        <div class="font-mono text-[9px] tracking-[0.14em] text-dim">ARMURE · TÊTE</div>
        <div class="mt-1.5 flex items-center gap-2">
          <button
            class="h-6 w-6 cursor-pointer border border-line bg-inset/40 font-mono text-[13px] font-semibold text-txt hover:border-accent"
            @click="store.setArmor('armorHead', -1)"
          >
            −
          </button>
          <span class="flex-1 text-center font-mono text-xl font-bold text-txt">{{
            store.char.armorHead
          }}</span>
          <button
            class="h-6 w-6 cursor-pointer border border-line bg-inset/40 font-mono text-[13px] font-semibold text-txt hover:border-accent"
            @click="store.setArmor('armorHead', 1)"
          >
            +
          </button>
        </div>
      </div>
      <div class="border border-line bg-inset/25 px-2.5 py-2">
        <div class="font-mono text-[9px] tracking-[0.14em] text-dim">ARMURE · CORPS</div>
        <div class="mt-1.5 flex items-center gap-2">
          <button
            class="h-6 w-6 cursor-pointer border border-line bg-inset/40 font-mono text-[13px] font-semibold text-txt hover:border-accent"
            @click="store.setArmor('armorBody', -1)"
          >
            −
          </button>
          <span class="flex-1 text-center font-mono text-xl font-bold text-txt">{{
            store.char.armorBody
          }}</span>
          <button
            class="h-6 w-6 cursor-pointer border border-line bg-inset/40 font-mono text-[13px] font-semibold text-txt hover:border-accent"
            @click="store.setArmor('armorBody', 1)"
          >
            +
          </button>
        </div>
      </div>
    </div>

    <!-- EDDIES -->
    <div
      class="mt-3.5 flex items-center justify-between border border-accent bg-accent-soft px-[13px] py-2.5"
    >
      <span class="font-mono text-[10px] tracking-[0.2em] text-dim">EDDIES</span>
      <div class="flex items-baseline gap-1">
        <span class="font-mono text-sm font-bold text-accent">€$</span>
        <input
          :value="store.char.eddies"
          class="w-[120px] border-0 bg-transparent text-right font-mono text-[22px] font-bold text-accent outline-none"
          @change="onEddiesInput"
        />
      </div>
    </div>
  </div>
</template>
