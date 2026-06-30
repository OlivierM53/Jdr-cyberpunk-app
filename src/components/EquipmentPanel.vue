<script setup lang="ts">
import { useCharacterStore } from '@/stores/character'

const store = useCharacterStore()
</script>

<template>
  <div class="relative border border-line bg-panel px-5 py-[18px]">
    <div class="edge-accent"></div>
    <div class="mb-3.5 flex items-center gap-2">
      <span class="font-mono text-xs font-bold text-accent">▸</span>
      <h2 class="m-0 font-display text-[13px] font-semibold tracking-[0.22em] uppercase">
        Équipement
      </h2>
      <div
        class="h-px flex-1"
        style="background: linear-gradient(90deg, var(--color-accent), transparent)"
      ></div>
      <span class="font-mono text-[10px] text-dim">QTÉ</span>
    </div>

    <div class="mb-3 flex flex-col gap-[7px]">
      <div
        v-for="eq in store.char.equipment"
        :key="eq.id"
        class="flex items-center gap-2 border border-line bg-black/25 px-2 py-1.5"
      >
        <input
          :value="eq.type"
          placeholder="Type"
          class="w-16 border border-line bg-black/40 px-[5px] py-1 font-mono text-[10px] font-semibold tracking-[0.05em] text-accent uppercase outline-none focus:border-accent"
          @change="store.updateEquip(eq.id, { type: ($event.target as HTMLInputElement).value })"
        />
        <input
          :value="eq.name"
          placeholder="Objet…"
          class="flex-1 border-0 bg-transparent font-display text-sm font-medium text-txt outline-none"
          @change="store.updateEquip(eq.id, { name: ($event.target as HTMLInputElement).value })"
        />
        <input
          :value="eq.qty"
          class="w-[38px] border border-line bg-black/40 p-[3px] text-center font-mono text-[13px] font-bold text-txt outline-none focus:border-accent"
          @change="
            store.updateEquip(eq.id, { qty: parseInt(($event.target as HTMLInputElement).value) || 0 })
          "
        />
        <button
          class="h-6 w-6 cursor-pointer border border-line bg-transparent font-mono text-[13px] leading-none text-dim hover:border-accent-2 hover:text-accent-2"
          @click="store.removeEquip(eq.id)"
        >
          ✕
        </button>
      </div>
    </div>

    <button
      class="w-full cursor-pointer border border-dashed border-line bg-transparent py-2.5 font-display text-[11px] font-semibold tracking-[0.16em] text-dim uppercase hover:border-accent hover:text-accent"
      @click="store.addEquip()"
    >
      + Ajouter un objet
    </button>
  </div>
</template>
