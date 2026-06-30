<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { ACCENTS } from '@/data/cyberpunk'

const store = useCharacterStore()
const canvas = ref<HTMLCanvasElement | null>(null)

let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let cols = 0
let drops: number[] = []
let nodes: { x: number; y: number; ph: number }[] = []
let edges: { a: number; b: number }[] = []
let pulses: { e: number; t: number; s: number }[] = []
let t = 0
let hackColor = ACCENTS.cyan.a

const CHARS = 'ｱｲｳｴｵｶｷｸｹｺ0123456789ABCDEF<>/\\[]{}#$%&*+=:;'

watch(
  () => store.accent,
  (name) => {
    hackColor = ACCENTS[name]?.a || ACCENTS.cyan.a
  },
  { immediate: true },
)

function setup() {
  const cv = canvas.value
  if (!cv || !ctx) return
  cv.width = window.innerWidth
  cv.height = window.innerHeight

  cols = Math.floor(cv.width / 14)
  drops = Array.from({ length: cols }, () => Math.random() * -60)

  const n = Math.max(26, Math.round((cv.width * cv.height) / 42000))
  nodes = Array.from({ length: n }, () => ({
    x: Math.random() * cv.width,
    y: Math.random() * cv.height,
    ph: Math.random() * Math.PI * 2,
  }))
  edges = []
  for (let i = 0; i < n; i++) {
    const current = nodes[i]
    if (!current) continue
    const near = nodes
      .map((node, j) => ({ j, d: (node.x - current.x) ** 2 + (node.y - current.y) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
    near.forEach((o) => {
      if (!edges.some((e) => (e.a === o.j && e.b === i) || (e.a === i && e.b === o.j))) {
        edges.push({ a: i, b: o.j })
      }
    })
  }
  pulses = Array.from({ length: Math.round(edges.length * 0.45) }, () => ({
    e: Math.floor(Math.random() * edges.length),
    t: Math.random(),
    s: 0.006 + Math.random() * 0.024,
  }))
}

function drawRain() {
  const cv = canvas.value
  if (!cv || !ctx) return
  ctx.fillStyle = 'rgba(6,8,12,0.085)'
  ctx.fillRect(0, 0, cv.width, cv.height)
  ctx.font = "13px 'Share Tech Mono', monospace"
  for (let i = 0; i < cols; i++) {
    const drop = drops[i]
    if (drop === undefined) continue
    const ch = CHARS[Math.floor(Math.random() * CHARS.length)] ?? '0'
    const x = i * 14
    const y = drop * 14
    if (Math.random() < 0.02) {
      ctx.globalAlpha = 1
      ctx.fillStyle = '#ffffff'
    } else {
      ctx.globalAlpha = 0.32
      ctx.fillStyle = hackColor
    }
    ctx.fillText(ch, x, y)
    ctx.globalAlpha = 1
    drops[i] =
      y > cv.height && Math.random() > 0.972
        ? Math.random() * -20
        : drop + 0.6 + (Math.random() < 0.4 ? Math.random() * 1.4 : 0)
  }
  if (Math.random() < 0.03) {
    ctx.globalAlpha = 0.07
    ctx.fillStyle = hackColor
    ctx.fillRect(0, Math.random() * cv.height, cv.width, 2)
    ctx.globalAlpha = 1
  }
}

function drawGrid() {
  const cv = canvas.value
  if (!cv || !ctx) return
  ctx.fillStyle = 'rgba(6,8,12,0.14)'
  ctx.fillRect(0, 0, cv.width, cv.height)
  t += 0.05

  ctx.strokeStyle = hackColor
  ctx.lineWidth = 1
  ctx.globalAlpha = 0.09
  ctx.beginPath()
  for (const e of edges) {
    const a = nodes[e.a]
    const b = nodes[e.b]
    if (!a || !b) continue
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
  }
  ctx.stroke()
  ctx.globalAlpha = 1

  for (const n of nodes) {
    const a = 0.28 + 0.22 * Math.sin(t + n.ph)
    ctx.globalAlpha = a
    ctx.fillStyle = hackColor
    ctx.fillRect(n.x - 1.5, n.y - 1.5, 3, 3)
  }
  ctx.globalAlpha = 1

  ctx.shadowColor = hackColor
  for (const p of pulses) {
    const e = edges[p.e]
    if (!e) {
      p.t = 1
      continue
    }
    const a = nodes[e.a]
    const b = nodes[e.b]
    if (!a || !b) continue
    const x = a.x + (b.x - a.x) * p.t
    const y = a.y + (b.y - a.y) * p.t
    ctx.shadowBlur = 8
    ctx.fillStyle = Math.random() < 0.4 ? '#ffffff' : hackColor
    ctx.fillRect(x - 2, y - 2, 4, 4)
    p.t += p.s
    if (p.t > 1) {
      p.e = Math.floor(Math.random() * edges.length)
      p.t = 0
      p.s = 0.006 + Math.random() * 0.024
    }
  }
  ctx.shadowBlur = 0
}

function loop() {
  if (store.bgMode === 'grid') drawGrid()
  else drawRain()
  raf = requestAnimationFrame(loop)
}

function onResize() {
  setup()
}

onMounted(() => {
  ctx = canvas.value?.getContext('2d') ?? null
  setup()
  window.addEventListener('resize', onResize)
  loop()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <canvas
    ref="canvas"
    class="pointer-events-none fixed inset-0 z-0 h-screen w-screen opacity-50"
  ></canvas>
  <div
    class="animate-scan pointer-events-none fixed inset-0 z-[9999] mix-blend-multiply"
    style="
      background: repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0) 0px,
        rgba(0, 0, 0, 0) 2px,
        rgba(0, 0, 0, 0.12) 3px,
        rgba(0, 0, 0, 0) 4px
      );
    "
  ></div>
  <div
    class="pointer-events-none fixed inset-0 z-[9998]"
    style="
      background: radial-gradient(
        ellipse 120% 80% at 50% 0%,
        transparent 55%,
        rgba(0, 0, 0, 0.55) 100%
      );
    "
  ></div>
</template>
