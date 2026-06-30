<script setup lang="ts">
import { onMounted } from 'vue'
import { useCharacterStore } from '@/stores/character'

import HackBackground from '@/components/HackBackground.vue'
import IntroOverlay from '@/components/IntroOverlay.vue'
import AppHeader from '@/components/AppHeader.vue'
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

onMounted(() => store.applyAccent(store.accent))
</script>

<template>
  <HackBackground />
  <IntroOverlay />

  <div class="relative z-1 mx-auto max-w-335 px-6 pt-5.5 pb-20">
    <AppHeader />

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

    <div class="mt-6.5 text-center font-mono text-[9px] tracking-[0.3em] text-dim">
      CHARGEN // SAUVEGARDE AUTOMATIQUE LOCALE // SESSION SÉCURISÉE
    </div>
  </div>
</template>
