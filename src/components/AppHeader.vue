<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCharacterStore } from '@/stores/character'
import { ACCENTS, type AccentName } from '@/data/cyberpunk'

const store = useCharacterStore()
const route = useRoute()

const accentList = Object.keys(ACCENTS) as AccentName[]
const importInput = ref<HTMLInputElement | null>(null)

function onReset() {
  if (!confirm('Réinitialiser toute la fiche ? Cette action est irréversible.')) return
  store.reset()
}

function onExport() {
  const json = store.exportCharacter()
  const slug = (store.char.alias || store.char.nom || 'personnage')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `fiche-${slug || 'personnage'}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function onImportClick() {
  importInput.value?.click()
}

async function onImportChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  try {
    store.importCharacter(await file.text())
  } catch {
    alert('Ce fichier ne contient pas une fiche de personnage JSON valide.')
  }
}
</script>

<template>
  <div
    class="mb-[22px] flex flex-wrap items-center gap-[18px] border-b border-line pb-4"
  >
    <div class="flex items-center gap-3">
      <div
        class="grid h-[34px] w-[34px] place-items-center border border-accent font-mono text-lg font-bold text-accent"
        style="
          clip-path: polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%);
          box-shadow: inset 0 0 12px var(--color-accent-glow);
        "
      >
        ◢
      </div>
      <div>
        <div class="font-display text-[22px] leading-none font-bold tracking-[0.24em] uppercase">
          CHAR<span class="text-accent">GEN</span>
        </div>
        <div class="mt-[3px] font-mono text-[9px] leading-[1.4] tracking-[0.28em] text-dim">
          FICHE OPÉRATEUR // PROTOCOLE NEON-DIST
        </div>
      </div>
    </div>

    <div class="flex border border-line">
      <RouterLink
        to="/character"
        class="cursor-pointer px-4 py-2 font-display text-[11px] font-semibold tracking-[0.16em] uppercase"
        :class="
          route.path === '/character'
            ? 'bg-accent-soft text-accent'
            : 'text-dim hover:text-accent'
        "
      >
        Fiche
      </RouterLink>
      <RouterLink
        to="/lore"
        class="cursor-pointer border-l border-line px-4 py-2 font-display text-[11px] font-semibold tracking-[0.16em] uppercase"
        :class="
          route.path === '/lore' ? 'bg-accent-soft text-accent' : 'text-dim hover:text-accent'
        "
      >
        Lore
      </RouterLink>
    </div>

    <div class="flex-1"></div>

    <div class="flex items-center gap-2">
      <span
        class="animate-blink h-2 w-2 rounded-full bg-[#46e08a]"
        style="box-shadow: 0 0 8px #46e08a"
      ></span>
      <span class="font-mono text-[10px] tracking-[0.2em] text-dim">SYNCHRONISÉ</span>
    </div>

    <button
      title="Changer l'animation de fond"
      class="min-w-[104px] cursor-pointer border border-line bg-transparent px-3 py-2 text-center font-mono text-[11px] font-semibold tracking-[0.12em] text-dim hover:border-accent hover:text-accent"
      @click="store.toggleBgMode()"
    >
      {{ store.bgMode === 'rain' ? '≋ PLUIE' : '⬡ RÉSEAU' }}
    </button>

    <div class="flex border border-line">
      <button
        v-for="name in accentList"
        :key="name"
        :title="name"
        class="relative h-[30px] w-[30px] cursor-pointer border-0 border-r border-line last:border-r-0 hover:brightness-140"
        :style="{ background: store.accent === name ? 'rgba(255,255,255,.06)' : 'transparent' }"
        @click="store.setAccent(name)"
      >
        <span
          class="absolute inset-2 rounded-full"
          :style="{ background: ACCENTS[name].a, boxShadow: `0 0 8px ${ACCENTS[name].a}` }"
        ></span>
      </button>
    </div>

    <button
      title="Exporter la fiche en fichier JSON"
      class="cursor-pointer border border-line bg-transparent px-3 py-2 font-mono text-[11px] font-semibold tracking-[0.12em] text-dim hover:border-accent hover:text-accent"
      @click="onExport"
    >
      Exporter
    </button>

    <button
      title="Importer une fiche depuis un fichier JSON"
      class="cursor-pointer border border-line bg-transparent px-3 py-2 font-mono text-[11px] font-semibold tracking-[0.12em] text-dim hover:border-accent hover:text-accent"
      @click="onImportClick"
    >
      Importer
    </button>
    <input
      ref="importInput"
      type="file"
      accept="application/json,.json"
      hidden
      @change="onImportChange"
    />

    <button
      class="cursor-pointer border border-line bg-transparent px-[14px] py-2 font-display text-[11px] font-semibold tracking-[0.18em] text-dim uppercase hover:border-accent-2 hover:text-accent-2"
      style="clip-path: polygon(0 0, 100% 0, 100% 60%, 90% 100%, 0 100%)"
      @click="onReset"
    >
      Réinitialiser
    </button>
  </div>
</template>
