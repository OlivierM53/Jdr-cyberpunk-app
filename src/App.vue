<script setup lang="ts">
import { onMounted } from 'vue'
import { useCharacterStore } from '@/stores/character'

import HackBackground from '@/components/HackBackground.vue'
import IntroOverlay from '@/components/IntroOverlay.vue'
import AppHeader from '@/components/AppHeader.vue'

const store = useCharacterStore()

onMounted(() => store.applyAccent(store.accent))
</script>

<template>
  <HackBackground />
  <IntroOverlay />

  <div class="relative z-1 mx-auto max-w-335 px-6 pt-5.5 pb-20">
    <AppHeader />

    <RouterView />

    <div class="mt-6.5 text-center font-mono text-[9px] tracking-[0.3em] text-dim">
      CHARGEN // SAUVEGARDE AUTOMATIQUE LOCALE // SESSION SÉCURISÉE
    </div>
  </div>
</template>
