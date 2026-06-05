import { useEffect, useRef } from 'react'

const SCENE_W = 320
const SCENE_H = 180

function fillCell(
  ctx: CanvasRenderingContext2D,
  ox: number,
  oy: number,
  unit: number,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
) {
  ctx.fillStyle = color
  ctx.fillRect(ox + x * unit, oy + y * unit, w * unit, h * unit)
}

function pointInPolygon(x: number, y: number, points: Array<[number, number]>) {
  let inside = false
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [xi, yi] = points[i]
    const [xj, yj] = points[j]
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }
  return inside
}

function fillPolygon(
  ctx: CanvasRenderingContext2D,
  ox: number,
  oy: number,
  unit: number,
  points: Array<[number, number]>,
  color: string,
) {
  let minX = SCENE_W
  let maxX = 0
  let minY = SCENE_H
  let maxY = 0

  for (const [x, y] of points) {
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    minY = Math.min(minY, y)
    maxY = Math.max(maxY, y)
  }

  for (let y = Math.floor(minY); y <= Math.ceil(maxY); y += 1) {
    for (let x = Math.floor(minX); x <= Math.ceil(maxX); x += 1) {
      if (pointInPolygon(x + 0.5, y + 0.5, points)) {
        fillCell(ctx, ox, oy, unit, x, y, 1, 1, color)
      }
    }
  }
}

function drawSky(ctx: CanvasRenderingContext2D, ox: number, oy: number, unit: number) {
  fillCell(ctx, ox, oy, unit, 0, 0, SCENE_W, SCENE_H, '#4a3a82')
  fillCell(ctx, ox, oy, unit, 0, 18, SCENE_W, 26, '#5c4795')
  fillCell(ctx, ox, oy, unit, 0, 44, SCENE_W, 34, '#78539f')
  fillCell(ctx, ox, oy, unit, 0, 78, SCENE_W, 28, '#4a4da0')

  fillPolygon(
    ctx,
    ox,
    oy,
    unit,
    [
      [0, 22], [28, 20], [50, 22], [70, 18], [92, 20], [120, 24], [148, 30], [176, 28],
      [210, 22], [246, 24], [280, 20], [320, 18], [320, 34], [0, 34],
    ],
    '#6b63b7',
  )

  fillPolygon(
    ctx,
    ox,
    oy,
    unit,
    [
      [0, 32], [20, 38], [40, 36], [62, 42], [88, 36], [114, 44], [138, 40], [162, 48],
      [188, 44], [214, 40], [238, 44], [264, 38], [288, 44], [320, 40], [320, 56], [0, 56],
    ],
    '#ff7f8b',
  )

  fillPolygon(
    ctx,
    ox,
    oy,
    unit,
    [
      [10, 40], [36, 46], [58, 44], [84, 54], [112, 46], [136, 58], [160, 50], [186, 60],
      [212, 52], [240, 58], [270, 50], [298, 56], [320, 52], [320, 74], [10, 74],
    ],
    '#f36c8c',
  )

  fillPolygon(
    ctx,
    ox,
    oy,
    unit,
    [
      [118, 34], [136, 30], [154, 32], [170, 28], [188, 30], [206, 26], [222, 30], [240, 28],
      [256, 32], [248, 40], [228, 38], [206, 42], [184, 38], [164, 40], [142, 36], [124, 40],
    ],
    '#ffd27e',
  )

  fillPolygon(
    ctx,
    ox,
    oy,
    unit,
    [
      [100, 46], [116, 50], [136, 48], [154, 52], [172, 46], [190, 50], [208, 46], [228, 50],
      [244, 46], [258, 50], [246, 56], [224, 54], [202, 58], [176, 54], [152, 58], [126, 54],
      [108, 58], [96, 54],
    ],
    '#ffb071',
  )
}

function drawMountains(ctx: CanvasRenderingContext2D, ox: number, oy: number, unit: number) {
  fillPolygon(
    ctx,
    ox,
    oy,
    unit,
    [
      [0, 106], [0, 82], [22, 68], [40, 62], [58, 60], [78, 66], [92, 76], [104, 90], [116, 106],
    ],
    '#1f295d',
  )
  fillPolygon(
    ctx,
    ox,
    oy,
    unit,
    [
      [0, 106], [16, 98], [34, 94], [54, 96], [74, 88], [86, 90], [100, 104],
    ],
    '#30417d',
  )

  fillPolygon(
    ctx,
    ox,
    oy,
    unit,
    [
      [88, 106], [112, 92], [138, 84], [160, 88], [182, 82], [204, 92], [224, 106],
    ],
    '#352768',
  )

  fillPolygon(
    ctx,
    ox,
    oy,
    unit,
    [
      [170, 106], [190, 84], [214, 70], [244, 60], [274, 58], [300, 64], [320, 76], [320, 106],
    ],
    '#1e2b66',
  )
  fillPolygon(
    ctx,
    ox,
    oy,
    unit,
    [
      [192, 104], [208, 94], [230, 92], [252, 86], [276, 84], [300, 88], [320, 94], [320, 106],
    ],
    '#34498b',
  )
}

function drawForest(ctx: CanvasRenderingContext2D, ox: number, oy: number, unit: number) {
  for (let x = 0; x < SCENE_W; x += 4) {
    const baseY = 118 + ((x * 7) % 5)
    const height = 12 + ((x * 13) % 16)
    const crown = 2 + ((x * 11) % 3)
    for (let i = 0; i < crown; i += 1) {
      const rowWidth = 1 + i * 2
      fillCell(ctx, ox, oy, unit, x + 2 - i, baseY - height + i * 3, rowWidth, 3, '#16273d')
    }
    fillCell(ctx, ox, oy, unit, x + 1, baseY - 4, 1, 6, '#16273d')
  }
}

function drawLandAndWater(ctx: CanvasRenderingContext2D, ox: number, oy: number, unit: number) {
  fillPolygon(
    ctx,
    ox,
    oy,
    unit,
    [
      [0, 124], [28, 126], [56, 124], [86, 120], [116, 122], [144, 120], [174, 122], [204, 118],
      [234, 120], [266, 118], [296, 120], [320, 118], [320, 136], [0, 136],
    ],
    '#575727',
  )
  fillPolygon(
    ctx,
    ox,
    oy,
    unit,
    [
      [0, 130], [36, 132], [68, 130], [100, 128], [134, 130], [166, 126], [200, 128], [236, 126],
      [272, 128], [320, 126], [320, 140], [0, 140],
    ],
    '#6e6a2c',
  )

  fillCell(ctx, ox, oy, unit, 0, 136, SCENE_W, 22, '#27345f')
  fillCell(ctx, ox, oy, unit, 0, 138, SCENE_W, 6, '#364788')
  fillCell(ctx, ox, oy, unit, 0, 144, SCENE_W, 7, '#6c62b4')

  fillPolygon(
    ctx,
    ox,
    oy,
    unit,
    [
      [78, 144], [102, 142], [124, 144], [146, 142], [168, 144], [188, 142], [210, 144], [230, 142],
      [228, 150], [206, 152], [184, 150], [162, 152], [138, 150], [114, 152], [92, 150], [76, 148],
    ],
    '#ff9c8f',
  )
  fillPolygon(
    ctx,
    ox,
    oy,
    unit,
    [
      [110, 146], [126, 144], [140, 146], [154, 144], [166, 146], [176, 144], [174, 148], [160, 150],
      [144, 148], [128, 150], [112, 148],
    ],
    '#ffd27e',
  )

  const sparkleXs = [12, 18, 22, 94, 98, 102, 108, 204, 208, 214, 222, 246, 252]
  for (const x of sparkleXs) {
    fillCell(ctx, ox, oy, unit, x, 131 + (x % 2), 1, 1, '#ffb890')
  }
}

function drawForeground(ctx: CanvasRenderingContext2D, ox: number, oy: number, unit: number) {
  fillPolygon(
    ctx,
    ox,
    oy,
    unit,
    [
      [0, 156], [18, 162], [34, 152], [56, 164], [74, 154], [96, 162], [118, 150], [140, 160],
      [164, 152], [184, 164], [206, 152], [228, 162], [248, 154], [270, 166], [292, 154], [320, 162],
      [320, 180], [0, 180],
    ],
    '#19293b',
  )

  for (let x = 0; x < SCENE_W; x += 6) {
    const bladeHeight = 10 + ((x * 9) % 18)
    const baseY = 180 - ((x * 5) % 4)
    fillCell(ctx, ox, oy, unit, x, baseY - bladeHeight, 1, bladeHeight, '#15273a')
    if (x % 18 === 0) {
      fillCell(ctx, ox, oy, unit, x + 1, baseY - bladeHeight - 4, 1, 6, '#15273a')
    }
  }

  const flowers: Array<[number, number]> = [
    [26, 166], [44, 160], [78, 168], [112, 162], [242, 164], [266, 170], [292, 160],
  ]
  for (const [x, y] of flowers) {
    fillCell(ctx, ox, oy, unit, x, y, 1, 1, '#ffb6d8')
    fillCell(ctx, ox, oy, unit, x - 1, y + 1, 1, 1, '#c98cff')
    fillCell(ctx, ox, oy, unit, x + 1, y + 1, 1, 1, '#c98cff')
    fillCell(ctx, ox, oy, unit, x, y + 2, 1, 1, '#ff7fbe')
  }
}

function drawScene(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const unit = Math.ceil(Math.max(width / SCENE_W, height / SCENE_H))
  const drawW = SCENE_W * unit
  const drawH = SCENE_H * unit
  const ox = Math.floor((width - drawW) / 2)
  const oy = Math.floor((height - drawH) / 2)

  ctx.clearRect(0, 0, width, height)
  drawSky(ctx, ox, oy, unit)
  drawMountains(ctx, ox, oy, unit)
  drawForest(ctx, ox, oy, unit)
  drawLandAndWater(ctx, ox, oy, unit)
  drawForeground(ctx, ox, oy, unit)
}

export function PixelSkyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const render = () => {
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
      drawScene(ctx, width, height)
    }

    render()
    window.addEventListener('resize', render)
    return () => {
      window.removeEventListener('resize', render)
    }
  }, [])

  return <canvas ref={canvasRef} className="pixelSkyCanvas" aria-hidden="true" />
}
