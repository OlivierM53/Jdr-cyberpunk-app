<script setup lang="ts">
import { ref } from 'vue'
import { useCharacterStore } from '@/stores/character'
import PortraitPanel from '@/components/PortraitPanel.vue'
import IdentityPanel from '@/components/IdentityPanel.vue'
import VitalsPanel from '@/components/VitalsPanel.vue'
import StatsPanel from '@/components/StatsPanel.vue'
import SkillsPanel from '@/components/SkillsPanel.vue'
import WeaponsPanel from '@/components/WeaponsPanel.vue'
import CyberwarePanel from '@/components/CyberwarePanel.vue'
import EquipmentPanel from '@/components/EquipmentPanel.vue'
import BackgroundPanel from '@/components/BackgroundPanel.vue'

const store = useCharacterStore()
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
  <div class="mb-4.5 flex flex-wrap justify-end gap-2">
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

  <div class="mb-4.5 grid grid-cols-[248px_1fr_312px] gap-4.5">
    <PortraitPanel />
    <IdentityPanel />
    <VitalsPanel />
  </div>

  <StatsPanel />
  <SkillsPanel />
  <WeaponsPanel />

  <div class="mb-4.5 grid grid-cols-2 gap-4.5">
    <CyberwarePanel />
    <EquipmentPanel />
  </div>

  <BackgroundPanel />
</template>
