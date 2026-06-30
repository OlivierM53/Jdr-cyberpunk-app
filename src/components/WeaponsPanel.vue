<script setup lang="ts">
import { useCharacterStore } from '@/stores/character'

const store = useCharacterStore()
</script>

<template>
  <div class="relative mb-[18px] border border-line bg-panel px-5 py-[18px]">
    <div class="edge-accent-2"></div>
    <div class="mb-3.5 flex items-center gap-2">
      <span class="font-mono text-xs font-bold text-accent-2">▸</span>
      <h2 class="m-0 font-display text-[13px] font-semibold tracking-[0.22em] uppercase">
        Armement
      </h2>
      <div
        class="h-px flex-1"
        style="background: linear-gradient(90deg, var(--color-accent-2), transparent)"
      ></div>
    </div>

    <div
      class="grid grid-cols-[1fr_108px_108px_34px] gap-2.5 px-0.5 pb-[7px] font-mono text-[9px] tracking-[0.14em] text-dim uppercase"
    >
      <span>Arme</span><span class="text-center">Dégâts</span
      ><span class="text-center">Atq / tour</span><span></span>
    </div>

    <div class="mb-3 flex flex-col gap-[7px]">
      <div
        v-for="wp in store.char.weapons"
        :key="wp.id"
        class="grid grid-cols-[1fr_108px_108px_34px] items-center gap-2.5"
      >
        <input
          :value="wp.name"
          placeholder="Désignation de l'arme…"
          class="border border-line bg-black/30 px-[11px] py-2 font-display text-sm font-medium text-txt outline-none focus:border-accent"
          @change="store.updateWeapon(wp.id, { name: ($event.target as HTMLInputElement).value })"
        />
        <input
          :value="wp.dmg"
          placeholder="2d6"
          class="border border-line bg-black/40 px-2 py-2 text-center font-mono text-[15px] font-bold text-accent-2 outline-none focus:border-accent-2"
          @change="store.updateWeapon(wp.id, { dmg: ($event.target as HTMLInputElement).value })"
        />
        <input
          :value="wp.atk"
          placeholder="1"
          class="border border-line bg-black/40 px-2 py-2 text-center font-mono text-[15px] font-bold text-txt outline-none focus:border-accent"
          @change="
            store.updateWeapon(wp.id, { atk: parseInt(($event.target as HTMLInputElement).value) || 0 })
          "
        />
        <button
          class="h-[34px] w-[34px] cursor-pointer border border-line bg-transparent font-mono text-[13px] leading-none text-dim hover:border-accent-2 hover:text-accent-2"
          @click="store.removeWeapon(wp.id)"
        >
          ✕
        </button>
      </div>
    </div>

    <button
      class="w-full cursor-pointer border border-dashed border-line bg-transparent py-2.5 font-display text-[11px] font-semibold tracking-[0.16em] text-dim uppercase hover:border-accent-2 hover:text-accent-2"
      @click="store.addWeapon()"
    >
      + Ajouter une arme
    </button>
  </div>
</template>
