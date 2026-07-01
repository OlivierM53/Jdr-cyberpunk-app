<script setup lang="ts">
import PortraitPanel from '@/components/PortraitPanel.vue'
import IdentityPanel from '@/components/IdentityPanel.vue'
import VitalsPanel from '@/components/VitalsPanel.vue'
import StatsPanel from '@/components/StatsPanel.vue'
import SkillsPanel from '@/components/SkillsPanel.vue'
import WeaponsPanel from '@/components/WeaponsPanel.vue'
import CyberwarePanel from '@/components/CyberwarePanel.vue'
import EquipmentPanel from '@/components/EquipmentPanel.vue'
import BackgroundPanel from '@/components/BackgroundPanel.vue'
</script>

<template>
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
