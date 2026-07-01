<script setup lang="ts">
import { computed, ref } from 'vue'
import { LORE_ENTRIES } from '@/data/lore'

const selected = ref(0)
const current = computed(() => LORE_ENTRIES[selected.value])
const paragraphs = computed(() => current.value?.body.split('\n\n') ?? [])

const grouped = computed(() => {
  const groups: { category: string; items: { title: string; index: number }[] }[] = []
  LORE_ENTRIES.forEach((entry, index) => {
    let group = groups.find((g) => g.category === entry.category)
    if (!group) {
      group = { category: entry.category, items: [] }
      groups.push(group)
    }
    group.items.push({ title: entry.title, index })
  })
  return groups
})
</script>

<template>
  <div class="grid min-h-[560px] grid-cols-[280px_1fr] gap-4.5">
    <div class="relative border border-line bg-panel p-3.5">
      <div class="edge-accent"></div>
      <div class="mb-3 font-mono text-[9px] tracking-[0.24em] text-dim">// CODEX</div>

      <div v-for="group in grouped" :key="group.category" class="mb-4 last:mb-0">
        <div class="mb-1.5 px-1 font-mono text-[10px] tracking-[0.18em] text-dim uppercase">
          {{ group.category }}
        </div>
        <button
          v-for="item in group.items"
          :key="item.index"
          class="block w-full cursor-pointer border-l-2 px-3 py-2 text-left font-display text-[13px] leading-tight"
          :class="
            selected === item.index
              ? 'border-accent bg-accent-soft text-accent'
              : 'border-line text-txt hover:border-accent hover:text-accent'
          "
          @click="selected = item.index"
        >
          {{ item.title }}
        </button>
      </div>
    </div>

    <div class="relative border border-line bg-panel p-6">
      <div class="edge-accent-2"></div>
      <div class="mb-1 font-mono text-[9px] tracking-[0.24em] text-dim uppercase">
        {{ current?.category }}
      </div>
      <h2 class="mb-4 font-display text-2xl font-bold tracking-[0.06em] text-accent uppercase">
        {{ current?.title }}
      </h2>
      <p
        v-for="(para, i) in paragraphs"
        :key="i"
        class="mb-3 font-display text-[15px] leading-relaxed text-txt last:mb-0"
      >
        {{ para }}
      </p>
    </div>
  </div>
</template>
