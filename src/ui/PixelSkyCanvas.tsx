import { useEffect, useRef } from 'react'

type Cluster = {
  x: number
  y: number
  w: number
  h: number
}

type CloudSpec = {
  id: string
  baseX: number
  yRatio: number
  speed: number
  gap: number
  pixel: number
  clusters: Cluster[]
  shadowBias?: number
}

type PreparedCloud = CloudSpec & {
  width: number
  height: number
  cells: Set<string>
  minX: number
  maxX: number
  minY: number
  maxY: number
  topByColumn: Map<number, number>
  bottomByColumn: Map<number, number>
}

const HIGHLIGHT = '#f4d9ef'
const CORE = '#e7b5e1'
const SHADOW = '#e58ad6'

const SKY_STOPS = [
  { t: 0, color: '#4421a6' },
  { t: 0.35, color: '#6f42c1' },
  { t: 0.65, color: '#9c68d9' },
  { t: 0.85, color: '#d1a8f0' },
  { t: 1, color: '#e8daf9' },
]

const CLOUD_SPECS: CloudSpec[] = [
  {
    id: 'thin-drifter',
    baseX: 120,
    yRatio: 0.1,
    speed: 0.12,
    gap: 320,
    pixel: 8,
    clusters: [
      { x: 0, y: 8, w: 6, h: 2 },
      { x: 3, y: 5, w: 7, h: 4 },
      { x: 8, y: 2, w: 7, h: 5 },
      { x: 13, y: 3, w: 6, h: 4 },
      { x: 17, y: 5, w: 6, h: 3 },
      { x: 22, y: 7, w: 6, h: 1 },
      { x: 28, y: 7, w: 4, h: 1 },
    ],
    shadowBias: 0.8,
  },
  {
    id: 'small-puff',
    baseX: 620,
    yRatio: 0.18,
    speed: -0.08,
    gap: 300,
    pixel: 8,
    clusters: [
      { x: 1, y: 7, w: 6, h: 2 },
      { x: 4, y: 4, w: 6, h: 4 },
      { x: 9, y: 1, w: 7, h: 5 },
      { x: 14, y: 3, w: 8, h: 4 },
      { x: 20, y: 5, w: 6, h: 3 },
    ],
    shadowBias: 1,
  },
  {
    id: 'medium-left',
    baseX: 260,
    yRatio: 0.32,
    speed: 0.06,
    gap: 340,
    pixel: 9,
    clusters: [
      { x: 1, y: 8, w: 8, h: 2 },
      { x: 5, y: 5, w: 8, h: 4 },
      { x: 10, y: 2, w: 9, h: 6 },
      { x: 17, y: 1, w: 8, h: 6 },
      { x: 23, y: 4, w: 7, h: 4 },
      { x: 28, y: 7, w: 5, h: 2 },
    ],
    shadowBias: 1,
  },
  {
    id: 'right-mass',
    baseX: 760,
    yRatio: 0.46,
    speed: -0.05,
    gap: 380,
    pixel: 10,
    clusters: [
      { x: 1, y: 10, w: 8, h: 2 },
      { x: 5, y: 6, w: 9, h: 5 },
      { x: 11, y: 3, w: 10, h: 6 },
      { x: 18, y: 0, w: 11, h: 8 },
      { x: 26, y: 3, w: 8, h: 6 },
      { x: 31, y: 7, w: 6, h: 3 },
    ],
    shadowBias: 1.15,
  },
  {
    id: 'wide-bottom-left',
    baseX: 160,
    yRatio: 0.58,
    speed: 0.05,
    gap: 420,
    pixel: 10,
    clusters: [
      { x: 0, y: 12, w: 7, h: 2 },
      { x: 4, y: 8, w: 9, h: 5 },
      { x: 10, y: 5, w: 9, h: 6 },
      { x: 17, y: 1, w: 11, h: 8 },
      { x: 26, y: 4, w: 10, h: 6 },
      { x: 34, y: 9, w: 7, h: 3 },
    ],
    shadowBias: 1.1,
  },
  {
    id: 'bottom-right',
    baseX: 960,
    yRatio: 0.72,
    speed: -0.04,
    gap: 420,
    pixel: 11,
    clusters: [
      { x: 1, y: 11, w: 7, h: 2 },
      { x: 5, y: 7, w: 9, h: 5 },
      { x: 11, y: 4, w: 10, h: 6 },
      { x: 18, y: 0, w: 10, h: 8 },
      { x: 25, y: 4, w: 9, h: 6 },
      { x: 32, y: 8, w: 7, h: 3 },
    ],
    shadowBias: 1.05,
  },
  {
    id: 'hero-bottom',
    baseX: 420,
    yRatio: 0.84,
    speed: 0.03,
    gap: 520,
    pixel: 12,
    clusters: [
      { x: 0, y: 13, w: 8, h: 2 },
      { x: 5, y: 9, w: 10, h: 5 },
      { x: 12, y: 5, w: 11, h: 7 },
      { x: 20, y: 0, w: 12, h: 9 },
      { x: 29, y: 4, w: 11, h: 7 },
      { x: 38, y: 10, w: 8, h: 3 },
    ],
    shadowBias: 1.2,
  },
]

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '')
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  }
}

function mixColor(a: string, b: string, t: number) {
  const from = hexToRgb(a)
  const to = hexToRgb(b)
  const amt = clamp(t, 0, 1)
  const r = Math.round(from.r + (to.r - from.r) * amt)
  const g = Math.round(from.g + (to.g - from.g) * amt)
  const bValue = Math.round(from.b + (to.b - from.b) * amt)
  return `rgb(${r}, ${g}, ${bValue})`
}

function getSkyColor(yRatio: number) {
  const t = clamp(yRatio, 0, 1)
  for (let i = 0; i < SKY_STOPS.length - 1; i += 1) {
    const start = SKY_STOPS[i]
    const end = SKY_STOPS[i + 1]
    if (t >= start.t && t <= end.t) {
      const local = (t - start.t) / (end.t - start.t)
      return mixColor(start.color, end.color, local)
    }
  }
  return SKY_STOPS[SKY_STOPS.length - 1].color
}

function prepareCloud(spec: CloudSpec): PreparedCloud {
  const cells = new Set<string>()
  let minX = Number.POSITIVE_INFINITY
  let maxX = Number.NEGATIVE_INFINITY
  let minY = Number.POSITIVE_INFINITY
  let maxY = Number.NEGATIVE_INFINITY
  const topByColumn = new Map<number, number>()
  const bottomByColumn = new Map<number, number>()

  for (const cluster of spec.clusters) {
    for (let gx = cluster.x; gx < cluster.x + cluster.w; gx += 1) {
      for (let gy = cluster.y; gy < cluster.y + cluster.h; gy += 1) {
        const key = `${gx},${gy}`
        cells.add(key)
        minX = Math.min(minX, gx)
        maxX = Math.max(maxX, gx)
        minY = Math.min(minY, gy)
        maxY = Math.max(maxY, gy)
        topByColumn.set(gx, Math.min(topByColumn.get(gx) ?? gy, gy))
        bottomByColumn.set(gx, Math.max(bottomByColumn.get(gx) ?? gy, gy))
      }
    }
  }

  return {
    ...spec,
    cells,
    minX,
    maxX,
    minY,
    maxY,
    topByColumn,
    bottomByColumn,
    width: (maxX - minX + 1) * spec.pixel,
    height: (maxY - minY + 1) * spec.pixel,
  }
}

function fillPixel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
) {
  ctx.fillStyle = color
  ctx.fillRect(Math.round(x), Math.round(y), size, size)
}

function drawCloud(
  ctx: CanvasRenderingContext2D,
  cloud: PreparedCloud,
  originX: number,
  originY: number,
  viewportHeight: number,
) {
  const { pixel } = cloud

  for (let gx = cloud.minX; gx <= cloud.maxX; gx += 1) {
    const top = cloud.topByColumn.get(gx)
    const bottom = cloud.bottomByColumn.get(gx)
    if (top === undefined || bottom === undefined) continue

    for (let gy = top; gy <= bottom; gy += 1) {
      const key = `${gx},${gy}`
      if (!cloud.cells.has(key)) continue

      const px = originX + (gx - cloud.minX) * pixel
      const py = originY + (gy - cloud.minY) * pixel
      const topDepth = gy - top
      const bottomDepth = bottom - gy
      const height = bottom - top + 1
      const yRatio = (py + pixel * 0.5) / viewportHeight
      const skyColor = getSkyColor(yRatio)
      const shadowBias = cloud.shadowBias ?? 1
      const columnHeight = height
      const columnCenter = (top + bottom) * 0.5
      const softnessBand = Math.max(2, Math.floor(columnHeight * 0.22))

      let color = CORE

      // Keep the top cap clean and bright like the reference.
      if (topDepth === 0) {
        color = HIGHLIGHT
      } else if (topDepth === 1) {
        color = (gx + gy) % 2 === 0 ? HIGHLIGHT : CORE
      } else if (topDepth <= softnessBand && gy < columnCenter) {
        color = (gx + gy) % 4 === 0 ? HIGHLIGHT : CORE
      } else {
        // The belly holds together as a soft core, with the shadow staying attached
        // to the bottom edge rather than dripping downward.
        if (bottomDepth >= 3) {
          color = CORE
        } else if (bottomDepth === 2) {
          color = (gx + gy) % 3 === 0 ? SHADOW : CORE
        } else if (bottomDepth === 1) {
          color = (gx + gy) % 2 === 0 ? SHADOW : CORE
        } else {
          color = (gx + gy + Math.floor(shadowBias * 2)) % 3 === 0 ? skyColor : SHADOW
        }
      }

      if (height <= 4 && topDepth === 0) {
        color = HIGHLIGHT
      }

      fillPixel(ctx, px, py, pixel, color)
    }

    // Dissolve the bottom edge into the sky with a decreasing-density matrix.
    for (let spill = 1; spill <= 3; spill += 1) {
      const py = originY + (bottom - cloud.minY + spill) * pixel
      const px = originX + (gx - cloud.minX) * pixel
      const parity = (gx + bottom + spill) % 2
      const sparse = (gx * 3 + bottom + spill) % 5
      const verySparse = (gx * 5 + bottom + spill) % 8

      if (spill === 1 && parity === 0) {
        fillPixel(ctx, px, py, pixel, SHADOW)
      } else if (spill === 2 && sparse === 0) {
        fillPixel(ctx, px, py, pixel, SHADOW)
      } else if (spill === 3 && verySparse === 0) {
        fillPixel(ctx, px, py, pixel, SHADOW)
      }
    }
  }
}

export function PixelSkyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const clouds = CLOUD_SPECS.map(prepareCloud)
    let frameId = 0

    const resize = () => {
      const ratio = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(ratio, ratio)
      ctx.imageSmoothingEnabled = false
    }

    const draw = (time: number) => {
      const width = window.innerWidth
      const height = window.innerHeight
      ctx.clearRect(0, 0, width, height)

      for (const cloud of clouds) {
        const travelWidth = width + cloud.width + cloud.gap
        const offset = ((cloud.baseX + time * cloud.speed) % travelWidth + travelWidth) % travelWidth
        const x = offset - cloud.width
        const y = Math.round(height * cloud.yRatio)

        drawCloud(ctx, cloud, x, y, height)
        drawCloud(ctx, cloud, x - travelWidth, y, height)
        drawCloud(ctx, cloud, x + travelWidth, y, height)
      }

      frameId = window.requestAnimationFrame(draw)
    }

    resize()
    frameId = window.requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="pixelSkyCanvas" aria-hidden="true" />
}
