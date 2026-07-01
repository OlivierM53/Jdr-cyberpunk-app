<script setup lang="ts">
import { computed } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { GENDERS, ROLES, ROLE_KEYS, type RoleKey } from '@/data/cyberpunk'

const store = useCharacterStore()

const roleSummary = computed(() => {
  const role = ROLES[store.char.role as RoleKey]
  return role?.description ?? 'Sélectionnez un rôle pour afficher le résumé de la classe.'
})

function onRoleChange(e: Event) {
  const select = e.target as HTMLSelectElement
  const newRole = select.value
  const previousRole = store.char.role
  const roleDef = ROLES[newRole as RoleKey]
  if (roleDef && newRole !== previousRole) {
    const applyDefaults = confirm(
      `Appliquer les statistiques et compétences par défaut du rôle ${newRole} ? Annuler pour conserver les valeurs actuelles.`,
    )
    if (applyDefaults) store.applyRoleDefaults(newRole)
  }
  store.char.role = newRole
}
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
      <label class="block">
        <span class="font-mono text-[10px] tracking-[0.16em] text-dim uppercase">Nom complet</span>
        <input
          v-model="store.char.nom"
          placeholder="Inconnu·e"
          class="mt-[5px] w-full border border-line bg-black/35 px-[11px] py-[9px] font-display text-lg font-semibold text-txt outline-none focus:border-accent"
        />
      </label>
      <label class="block">
        <span class="font-mono text-[10px] tracking-[0.16em] text-dim uppercase">Genre</span>
        <select
          v-model="store.char.genre"
          class="mt-[5px] w-full border border-line bg-black/35 px-[11px] py-[9px] font-display text-[15px] font-medium text-txt outline-none focus:border-accent"
        >
          <option value="">—</option>
          <option v-for="g in GENDERS" :key="g.key" :value="g.key">{{ g.label }}</option>
        </select>
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
        <select
          :value="store.char.role"
          class="mt-[5px] w-full border border-line bg-black/35 px-[11px] py-[9px] font-display text-[15px] font-medium text-txt outline-none focus:border-accent"
          @change="onRoleChange"
        >
          <option value="">—</option>
          <option v-for="key in ROLE_KEYS" :key="key" :value="key">{{ key }}</option>
        </select>
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

      <div class="col-span-2 mt-1 border-t border-line pt-3">
        <span class="font-mono text-[10px] tracking-[0.16em] text-dim uppercase">Résumé de la classe</span>
        <p class="mt-1.5 font-display text-[13px] leading-snug text-txt/80">{{ roleSummary }}</p>
      </div>
    </div>
  </div>
</template>
