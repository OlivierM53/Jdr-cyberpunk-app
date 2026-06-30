<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const showIntro = ref(true)
let timer = 0

onMounted(() => {
  timer = window.setTimeout(() => {
    showIntro.value = false
  }, 2200)
})

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div
    v-if="showIntro"
    class="animate-intro-fade pointer-events-none fixed inset-0 z-[10000] overflow-hidden"
  >
    <div
      class="animate-shutter-top absolute inset-x-0 top-0 h-1/2 border-b border-accent bg-bg"
      style="box-shadow: 0 4px 30px var(--color-accent-glow)"
    ></div>
    <div
      class="animate-shutter-bottom absolute inset-x-0 bottom-0 h-1/2 border-t border-accent bg-bg"
      style="box-shadow: 0 -4px 30px var(--color-accent-glow)"
    ></div>
    <div class="absolute inset-0 grid place-items-center">
      <div
        class="animate-intro-spin grid h-32 w-32 place-items-center border-2 border-accent"
        style="
          box-shadow:
            0 0 36px var(--color-accent-glow),
            inset 0 0 22px var(--color-accent-soft);
        "
      >
        <div
          class="animate-intro-inner h-16 w-16 border border-accent-2"
          style="box-shadow: 0 0 18px var(--color-accent-2)"
        ></div>
      </div>
      <div
        class="animate-blink-fast absolute bottom-[28%] font-mono text-[11px] uppercase tracking-[0.42em] text-accent"
      >
        Initialisation du profil…
      </div>
    </div>
  </div>
</template>
