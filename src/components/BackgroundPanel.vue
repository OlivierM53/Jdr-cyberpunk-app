<script setup lang="ts">
import { useCharacterStore } from '@/stores/character'
import { BG_FIELDS } from '@/data/cyberpunk'

const store = useCharacterStore()
</script>

<template>
  <div class="relative border border-line bg-panel px-5 py-[18px]">
    <div class="edge-accent-2"></div>
    <div class="mb-3.5 flex items-center gap-2">
      <span class="font-mono text-xs font-bold text-accent-2">▸</span>
      <h2 class="m-0 font-display text-[13px] font-semibold tracking-[0.22em] uppercase">
        Background
      </h2>
      <div
        class="h-px flex-1"
        style="background: linear-gradient(90deg, var(--color-accent-2), transparent)"
      ></div>
    </div>

    <div class="grid grid-cols-1 gap-x-4 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-3">
      <label v-for="bf in BG_FIELDS" :key="bf.key" class="flex flex-col">
        <span class="mb-1.5 font-mono text-[10px] tracking-[0.14em] text-dim uppercase">{{
          bf.label
        }}</span>
        <textarea
          :value="store.char.bg[bf.key] || ''"
          class="min-h-[76px] resize-y border border-line bg-inset/35 px-3 py-2.5 font-display text-sm leading-relaxed text-txt outline-none focus:border-accent-2"
          @change="store.setBg(bf.key, ($event.target as HTMLTextAreaElement).value)"
        ></textarea>
      </label>
    </div>
  </div>
</template>
