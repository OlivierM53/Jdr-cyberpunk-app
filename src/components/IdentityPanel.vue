<script setup lang="ts">
import { useCharacterStore } from '@/stores/character'

const store = useCharacterStore()
</script>

<template>
  <div class="relative border border-line bg-panel p-[18px]">
    <div class="edge-accent"></div>
    <div class="mb-4 flex items-center gap-2">
      <span class="font-mono text-xs font-bold text-accent">▸</span>
      <h2 class="m-0 font-display text-[13px] font-semibold tracking-[0.22em] uppercase">
        Identité
      </h2>
      <div class="h-px flex-1" style="background: linear-gradient(90deg, var(--color-accent), transparent)"></div>
    </div>

    <div class="grid grid-cols-2 gap-x-4 gap-y-3.5">
      <label class="col-span-2 block">
        <span class="font-mono text-[10px] tracking-[0.16em] text-dim uppercase">Nom complet</span>
        <input
          v-model="store.char.nom"
          placeholder="Inconnu·e"
          class="mt-[5px] w-full border border-line bg-black/35 px-[11px] py-[9px] font-display text-lg font-semibold text-txt outline-none focus:border-accent"
        />
      </label>
      <label class="block">
        <span class="font-mono text-[10px] tracking-[0.16em] text-dim uppercase">Alias / Handle</span>
        <input
          v-model="store.char.alias"
          placeholder="@street_name"
          class="mt-[5px] w-full border border-line bg-black/35 px-[11px] py-[9px] font-mono text-[15px] font-semibold text-accent outline-none focus:border-accent"
        />
      </label>
      <label class="block">
        <span class="font-mono text-[10px] tracking-[0.16em] text-dim uppercase">Rôle</span>
        <input
          v-model="store.char.role"
          placeholder="Solo / Netrunner…"
          class="mt-[5px] w-full border border-line bg-black/35 px-[11px] py-[9px] font-display text-[15px] font-medium text-txt outline-none focus:border-accent"
        />
      </label>
      <label class="block">
        <span class="font-mono text-[10px] tracking-[0.16em] text-dim uppercase">Origine</span>
        <input
          v-model="store.char.origine"
          placeholder="Corpo / Nomade / Rue…"
          class="mt-[5px] w-full border border-line bg-black/35 px-[11px] py-[9px] font-display text-[15px] font-medium text-txt outline-none focus:border-accent"
        />
      </label>
      <label class="block">
        <span class="font-mono text-[10px] tracking-[0.16em] text-dim uppercase">Âge</span>
        <input
          v-model="store.char.age"
          placeholder="—"
          class="mt-[5px] w-full border border-line bg-black/35 px-[11px] py-[9px] font-mono text-[15px] font-medium text-txt outline-none focus:border-accent"
        />
      </label>
    </div>
  </div>
</template>
