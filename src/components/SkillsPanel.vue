<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { SKILLS, STAT_DEFS, type Stat } from '@/data/cyberpunk'
import InfoTooltip from '@/components/InfoTooltip.vue'

const store = useCharacterStore()
const skillStat = ref('ALL')
const skillQuery = ref('')

const statNotDisplayed: Stat[] = ['CHA', 'COR', 'MOUV']

const filters = [{ key: 'ALL', label: 'TOUTES' }, ...STAT_DEFS.map((d) => ({ key: d.key, label: d.key })).filter(({ key }) => !statNotDisplayed.includes(key))]

const skillList = computed(() => {
  const q = skillQuery.value.toLowerCase()
  return SKILLS.filter(
    ([name, st]) =>
      (skillStat.value === 'ALL' || st === skillStat.value) &&
      (!q || name.toLowerCase().includes(q)),
  ).map(([name, st, description]) => {
    const base = store.char.stats[st] || 0
    const level = store.char.skills[name] || 0
    return {
      name, statKey: st, base, level, total: base + level, description,
    }
  })
})
</script>

<template>
  <div class="relative mb-[18px] border border-line bg-panel px-5 py-[18px]">
    <div class="edge-accent"></div>
    <div class="mb-3.5 flex items-center gap-2">
      <span class="font-mono text-xs font-bold text-accent">▸</span>
      <h2 class="m-0 font-display text-[13px] font-semibold tracking-[0.22em] uppercase">
        Compétences
      </h2>
      <span class="font-mono text-[10px] tracking-[0.1em] text-dim">{{ skillList.length }} · STAT + RANG</span>
      <div class="h-px flex-1" style="background: linear-gradient(90deg, var(--color-accent), transparent)"></div>
      <input v-model="skillQuery" placeholder="rechercher…"
        class="w-40 border border-line bg-black/40 px-2.5 py-1.5 font-mono text-xs font-medium text-txt outline-none focus:border-accent" />
    </div>

    <div class="mb-4 flex flex-wrap gap-1.5">
      <button v-for="f in filters" :key="f.key"
        class="cursor-pointer border px-[11px] py-[5px] font-mono text-[11px] font-semibold tracking-[0.08em] hover:border-accent"
        :style="{
          background: skillStat === f.key ? 'var(--color-accent-soft)' : 'rgba(0,0,0,.3)',
          borderColor: skillStat === f.key ? 'var(--color-accent)' : 'var(--color-line)',
          color: skillStat === f.key ? 'var(--color-accent)' : 'var(--color-dim)',
        }" @click="skillStat = f.key">
        {{ f.label }}
      </button>
    </div>

    <div class="grid grid-cols-3 gap-x-3.5 gap-y-2">
      <div v-for="sk in skillList" :key="sk.name" class="flex items-center gap-2 border-b border-line px-0.5 py-1.5">
        <span
          class="w-[34px] flex-none border border-line py-0.5 text-center font-mono text-[10px] font-bold text-accent-2">{{
            sk.statKey }}</span>
        <span class="flex flex-1 items-center gap-1.5 font-display text-[13px] leading-tight font-medium text-txt">
          {{ sk.name }}
          <InfoTooltip :text="sk.description" />
        </span>
        <span class="font-mono text-[11px] text-dim" title="base de stat">{{ sk.base }}</span>
        <span class="font-mono text-[11px] text-dim">+</span>
        <button
          class="h-5 w-5 cursor-pointer border border-line bg-black/40 font-mono text-[11px] leading-none font-semibold text-txt hover:border-accent"
          @click="store.setSkill(sk.name, -1)">
          −
        </button>
        <span class="w-4 text-center font-mono text-xs font-semibold text-txt">{{
          sk.level
        }}</span>
        <button
          class="h-5 w-5 cursor-pointer border border-line bg-black/40 font-mono text-[11px] leading-none font-semibold text-txt hover:border-accent"
          @click="store.setSkill(sk.name, 1)">
          +
        </button>
        <span class="w-[30px] bg-accent-soft py-0.5 text-center font-mono text-sm font-bold text-accent">{{
          sk.total
        }}</span>
      </div>
    </div>
  </div>
</template>
