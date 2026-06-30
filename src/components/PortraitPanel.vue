<script setup lang="ts">
import { ref } from 'vue'
import { useCharacterStore } from '@/stores/character'

const store = useCharacterStore()
const fileInput = ref<HTMLInputElement | null>(null)
const dragOver = ref(false)

const MAX_DIM = 800
const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif']

async function toDataUrl(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file)
  try {
    const scale = Math.min(1, MAX_DIM / Math.max(bitmap.width, bitmap.height))
    const w = Math.max(1, Math.round(bitmap.width * scale))
    const h = Math.max(1, Math.round(bitmap.height * scale))
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0, w, h)
    return canvas.toDataURL('image/webp', 0.85)
  } finally {
    bitmap.close?.()
  }
}

async function ingest(file: File | undefined) {
  if (!file || !ACCEPT.includes(file.type)) return
  try {
    const url = await toDataUrl(file)
    store.setPortrait(url)
  } catch {
    /* unreadable image, ignore */
  }
}

function onDrop(e: DragEvent) {
  dragOver.value = false
  ingest(e.dataTransfer?.files?.[0])
}

function onPick() {
  fileInput.value?.click()
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  ingest(input.files?.[0])
  input.value = ''
}

function onRemove(e: Event) {
  e.stopPropagation()
  store.setPortrait(null)
}
</script>

<template>
  <div class="relative border border-line bg-panel p-3.5">
    <div class="edge-accent"></div>
    <div class="mb-2.5 font-mono text-[9px] tracking-[0.24em] text-dim">// PORTRAIT</div>

    <div
      class="group relative block h-[250px] w-full cursor-pointer border border-line bg-black/20 bg-cover bg-center"
      style="clip-path: polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)"
      :style="{
        outline: dragOver ? '2px solid var(--color-accent)' : 'none',
        backgroundImage: store.char.portrait ? `url(${store.char.portrait})` : 'none',
      }"
      @click="onPick"
      @dragover.prevent="dragOver = true"
      @dragleave.prevent="dragOver = false"
      @drop.prevent="onDrop"
    >
      <div
        v-if="!store.char.portrait"
        class="flex h-full w-full flex-col items-center justify-center gap-1.5 text-center font-mono text-[11px] tracking-[0.1em] text-dim"
      >
        <span>DÉPOSER UNE IMAGE</span>
        <span class="text-[10px] text-dim/70">ou cliquer pour parcourir</span>
      </div>
      <button
        v-else
        class="absolute right-2 bottom-2 cursor-pointer border border-line bg-black/65 px-2 py-1 font-mono text-[10px] text-txt opacity-0 transition-opacity group-hover:opacity-100 hover:border-accent-2 hover:text-accent-2"
        @click="onRemove"
      >
        Retirer
      </button>
    </div>
    <input
      ref="fileInput"
      type="file"
      accept="image/png,image/jpeg,image/webp,image/avif"
      hidden
      @change="onFileChange"
    />

    <div
      class="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.15em] text-dim"
    >
      <span>MATRICULE</span><span class="text-accent">{{ store.idCode }}</span>
    </div>
  </div>
</template>
