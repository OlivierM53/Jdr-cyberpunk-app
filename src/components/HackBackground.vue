<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { ACCENTS, ACCENTS_LIGHT } from '@/data/cyberpunk'

const store = useCharacterStore()
const canvas = ref<HTMLCanvasElement | null>(null)

let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let cols = 0
let drops: number[] = []
type NetNode = { x: number; y: number; r: number; ph: number; tier: 'core' | 'mid' | 'small' }
type Segment = { ax: number; ay: number; bx: number; by: number; width: number; alpha: number }

let netNodes: NetNode[] = []
let segments: Segment[] = []
let segmentWeights: number[] = []
let pulses: { seg: number; t: number; s: number }[] = []
let t = 0
let hackColor = ACCENTS.cyan.a
let fadeRainColor = 'rgba(6,8,12,0.085)'
let fadeGridColor = 'rgba(6,8,12,0.14)'
let solidColor = '#06080c'
let flashColor = '#ffffff'

const CHARS = 'ｱｲｳｴｵｶｷｸｹｺ0123456789ABCDEF<>/\\[]{}#$%&*+=:;'

function refreshThemeColors() {
  const light = store.theme === 'light'
  const palette = light ? ACCENTS_LIGHT : ACCENTS
  hackColor = palette[store.accent]?.a || palette.cyan.a
  fadeRainColor = light ? 'rgba(238,241,245,0.085)' : 'rgba(6,8,12,0.085)'
  fadeGridColor = light ? 'rgba(238,241,245,0.14)' : 'rgba(6,8,12,0.14)'
  solidColor = light ? '#eef1f5' : '#06080c'
  flashColor = light ? '#0d141b' : '#ffffff'
}

watch(() => store.accent, refreshThemeColors, { immediate: true })
watch(() => store.theme, refreshThemeColors)

watch(
  () => store.bgMode,
  () => {
    const cv = canvas.value
    if (cv && ctx) ctx.clearRect(0, 0, cv.width, cv.height)
  },
)

function setup() {
  const cv = canvas.value
  if (!cv || !ctx) return
  cv.width = window.innerWidth
  cv.height = window.innerHeight

  cols = Math.floor(cv.width / 14)
  drops = Array.from({ length: cols }, () => Math.random() * -60)

  buildNetwork(cv)
}

type NodeDef = { xPct: number; yPct: number; r: number }

// Positions fixes (% de la largeur/hauteur du canvas) - noeuds moyens collés aux bords.
const MID_LEFT: NodeDef[] = [
  { xPct: 4, yPct: 9, r: 11 },
  { xPct: 9, yPct: 24, r: 8 },
  { xPct: 5, yPct: 39, r: 12 },
  { xPct: 10, yPct: 55, r: 9 },
  { xPct: 5, yPct: 71, r: 10 },
  { xPct: 9, yPct: 88, r: 8 },
]
const MID_RIGHT: NodeDef[] = [
  { xPct: 96, yPct: 7, r: 10 },
  { xPct: 91, yPct: 22, r: 9 },
  { xPct: 95, yPct: 37, r: 12 },
  { xPct: 90, yPct: 53, r: 8 },
  { xPct: 95, yPct: 69, r: 11 },
  { xPct: 91, yPct: 86, r: 9 },
]
const MID_LEFT_COMPACT: NodeDef[] = [
  { xPct: 6, yPct: 14, r: 9 },
  { xPct: 8, yPct: 41, r: 10 },
  { xPct: 5, yPct: 67, r: 8 },
  { xPct: 9, yPct: 90, r: 9 },
]
const MID_RIGHT_COMPACT: NodeDef[] = [
  { xPct: 94, yPct: 12, r: 9 },
  { xPct: 92, yPct: 39, r: 10 },
  { xPct: 95, yPct: 65, r: 8 },
  { xPct: 91, yPct: 87, r: 9 },
]
const MID_BOTTOM: NodeDef[] = [
  { xPct: 28, yPct: 96, r: 9 },
  { xPct: 50, yPct: 98, r: 12 },
  { xPct: 72, yPct: 96, r: 9 },
]
const MID_BOTTOM_COMPACT: NodeDef[] = [
  { xPct: 35, yPct: 97, r: 9 },
  { xPct: 65, yPct: 97, r: 9 },
]

// Connexions moyen-moyen, en indices dans le tableau [...gauche, ...droite, ...bas].
const MID_LINKS: [number, number][] = [
  [0, 1],
  [2, 3],
  [4, 5],
  [6, 7],
  [8, 9],
  [10, 11],
  [0, 6],
  [12, 13],
  [13, 14],
  [5, 12],
  [11, 14],
]
const MID_LINKS_COMPACT: [number, number][] = [
  [0, 1],
  [2, 3],
  [4, 5],
  [6, 7],
  [0, 4],
  [8, 9],
  [3, 8],
  [7, 9],
]
const SMALL_ANGLE_OFFSETS = [-0.35, 0.35]
const EXIT_ANGLE_OFFSETS = [-0.25, 0.25]

function buildNetwork(cv: HTMLCanvasElement) {
  const w = cv.width
  const h = cv.height
  const cx = w / 2
  const cy = h / 2
  const compact = w < 700
  const minDim = Math.min(w, h)

  netNodes = []
  segments = []

  const coreR = Math.min(Math.max(minDim * 0.045, 22), 40)
  netNodes.push({ x: cx, y: cy, r: coreR, ph: 0, tier: 'core' })

  const leftDefs = compact ? MID_LEFT_COMPACT : MID_LEFT
  const rightDefs = compact ? MID_RIGHT_COMPACT : MID_RIGHT
  const bottomDefs = compact ? MID_BOTTOM_COMPACT : MID_BOTTOM
  const links = compact ? MID_LINKS_COMPACT : MID_LINKS

  const midNodes: NetNode[] = [...leftDefs, ...rightDefs, ...bottomDefs].map((def, i) => ({
    x: (def.xPct / 100) * w,
    y: (def.yPct / 100) * h,
    r: def.r,
    ph: i * 0.9,
    tier: 'mid',
  }))
  for (const node of midNodes) {
    netNodes.push(node)
    segments.push({ ax: cx, ay: cy, bx: node.x, by: node.y, width: 3, alpha: 0.45 })
  }

  for (const [a, b] of links) {
    const na = midNodes[a]
    const nb = midNodes[b]
    if (na && nb) segments.push({ ax: na.x, ay: na.y, bx: nb.x, by: nb.y, width: 2, alpha: 0.3 })
  }

  const smallDist = minDim * 0.05
  midNodes.forEach((mid, idx) => {
    const outAngle = Math.atan2(mid.y - cy, mid.x - cx)
    SMALL_ANGLE_OFFSETS.forEach((offset, oi) => {
      const angle = outAngle + offset
      const sx = mid.x + Math.cos(angle) * smallDist
      const sy = mid.y + Math.sin(angle) * smallDist
      const sNode: NetNode = { x: sx, y: sy, r: 3, ph: idx + oi * 1.3, tier: 'small' }
      netNodes.push(sNode)
      segments.push({ ax: mid.x, ay: mid.y, bx: sx, by: sy, width: 1, alpha: 0.2 })

      const exitDist = Math.max(w, h)
      EXIT_ANGLE_OFFSETS.forEach((eOff) => {
        const exitAngle = angle + eOff
        const ex = sx + Math.cos(exitAngle) * exitDist
        const ey = sy + Math.sin(exitAngle) * exitDist
        segments.push({ ax: sx, ay: sy, bx: ex, by: ey, width: 1, alpha: 0.15 })
      })
    })
  })

  segmentWeights = []
  segments.forEach((s, idx) => {
    const weight = s.width >= 3 ? 4 : s.width >= 2 ? 2 : 1
    for (let k = 0; k < weight; k++) segmentWeights.push(idx)
  })

  const pulseCount = Math.round(segments.length * 0.5)
  pulses = Array.from({ length: pulseCount }, () => ({
    seg: segmentWeights[Math.floor(Math.random() * segmentWeights.length)] ?? 0,
    t: Math.random(),
    s: 0.006 + Math.random() * 0.024,
  }))
}

function drawRain() {
  const cv = canvas.value
  if (!cv || !ctx) return
  ctx.fillStyle = fadeRainColor
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
      ctx.fillStyle = flashColor
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
  ctx.fillStyle = fadeGridColor
  ctx.fillRect(0, 0, cv.width, cv.height)
  t += 0.05

  ctx.strokeStyle = hackColor
  ctx.lineCap = 'round'
  for (const s of segments) {
    ctx.globalAlpha = s.alpha
    ctx.lineWidth = s.width
    ctx.beginPath()
    ctx.moveTo(s.ax, s.ay)
    ctx.lineTo(s.bx, s.by)
    ctx.stroke()
  }
  ctx.globalAlpha = 1
  ctx.lineWidth = 1

  ctx.fillStyle = hackColor
  for (const n of netNodes) {
    const baseAlpha = n.tier === 'core' ? 0.55 : n.tier === 'mid' ? 0.35 : 0.22
    const amp = n.tier === 'core' ? 0.12 : n.tier === 'small' ? 0.08 : 0.2
    ctx.globalAlpha = baseAlpha + amp * Math.sin(t + n.ph)
    ctx.shadowColor = hackColor
    ctx.shadowBlur = n.tier === 'core' ? 24 : n.tier === 'mid' ? 8 : 0
    ctx.beginPath()
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.shadowBlur = 0
  ctx.globalAlpha = 1

  ctx.shadowColor = hackColor
  for (const p of pulses) {
    const s = segments[p.seg]
    if (!s) continue
    const x = s.ax + (s.bx - s.ax) * p.t
    const y = s.ay + (s.by - s.ay) * p.t
    ctx.shadowBlur = 8
    ctx.fillStyle = Math.random() < 0.4 ? flashColor : hackColor
    ctx.fillRect(x - 2, y - 2, 4, 4)
    p.t += p.s
    if (p.t > 1) {
      p.seg = segmentWeights[Math.floor(Math.random() * segmentWeights.length)] ?? 0
      p.t = 0
      p.s = 0.006 + Math.random() * 0.024
    }
  }
  ctx.shadowBlur = 0
}

function drawSolid() {
  const cv = canvas.value
  if (!cv || !ctx) return
  ctx.fillStyle = solidColor
  ctx.fillRect(0, 0, cv.width, cv.height)
}

function loop() {
  if (store.bgMode === 'grid') drawGrid()
  else if (store.bgMode === 'solid') drawSolid()
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
    class="scanlines animate-scan pointer-events-none fixed inset-0 z-[9999] mix-blend-multiply"
  ></div>
</template>
