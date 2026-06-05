import { DIMENSION_ORDER, DIMENSIONS, type DimensionKey } from '../../domain/dimensions'

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
}

function pointsForValues(
  values: Record<DimensionKey, number>,
  maxValue: number,
  size: number,
  radius: number,
) {
  const cx = size / 2
  const cy = size / 2
  const step = (Math.PI * 2) / DIMENSION_ORDER.length
  const start = -Math.PI / 2

  return DIMENSION_ORDER.map((k, i) => {
    const v = Math.max(0, Math.min(maxValue, values[k]))
    const rr = (v / maxValue) * radius
    return polarToCartesian(cx, cy, rr, start + i * step)
  })
}

function toPath(points: Array<{ x: number; y: number }>) {
  if (points.length === 0) return ''
  return `M ${points.map((p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' L ')} Z`
}

export function RadarChart({
  size,
  values,
  compareValues,
  maxValue = 15,
  showLabels = true,
}: {
  size: number
  values: Record<DimensionKey, number>
  compareValues?: Record<DimensionKey, number>
  maxValue?: number
  showLabels?: boolean
}) {
  const labelFontSize = size >= 240 ? 13 : 12
  const labelOffset = size >= 240 ? 22 : 20
  const paddingX = showLabels ? 70 : 10
  const paddingY = showLabels ? 30 : 10
  const cx = size / 2
  const cy = size / 2
  const rx = Math.max(10, size / 2 - paddingX)
  const ry = Math.max(10, size / 2 - paddingY)
  const r = showLabels ? Math.min(rx, ry) + 12 : rx
  const step = (Math.PI * 2) / DIMENSION_ORDER.length
  const start = -Math.PI / 2

  const gridLevels = 4
  const userPath = toPath(pointsForValues(values, maxValue, size, r))
  const rolePath = compareValues
    ? toPath(pointsForValues(compareValues, maxValue, size, r))
    : null

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="uFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--chart-user-fill-1)" />
          <stop offset="1" stopColor="var(--chart-user-fill-2)" />
        </linearGradient>
        <linearGradient id="uStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--chart-user-stroke-1)" />
          <stop offset="1" stopColor="var(--chart-user-stroke-2)" />
        </linearGradient>
        <linearGradient id="rFill" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--chart-role-fill-1)" />
          <stop offset="1" stopColor="var(--chart-role-fill-2)" />
        </linearGradient>
        <linearGradient id="rStroke" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--chart-role-stroke-1)" />
          <stop offset="1" stopColor="var(--chart-role-stroke-2)" />
        </linearGradient>
      </defs>

      {Array.from({ length: gridLevels }, (_, i) => {
        const rr = r * ((i + 1) / gridLevels)
        const pts = DIMENSION_ORDER.map((_, idx) =>
          polarToCartesian(cx, cy, rr, start + idx * step),
        )
        const d = toPath(pts)
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="var(--chart-grid)"
            strokeWidth="1"
          />
        )
      })}

      {DIMENSION_ORDER.map((_, idx) => {
        const p = polarToCartesian(cx, cy, r, start + idx * step)
        return (
          <path
            key={idx}
            d={`M ${cx} ${cy} L ${p.x} ${p.y}`}
            stroke="var(--chart-axis)"
            strokeWidth="1"
          />
        )
      })}

      {rolePath && (
        <>
          <path d={rolePath} fill="url(#rFill)" stroke="url(#rStroke)" strokeWidth="1.6" />
        </>
      )}
      <path d={userPath} fill="url(#uFill)" stroke="url(#uStroke)" strokeWidth="1.8" />

      {showLabels &&
        DIMENSION_ORDER.map((k, idx) => {
          const p = polarToCartesian(cx, cy, r + labelOffset, start + idx * step)
          const label = DIMENSIONS[k].shortName
          const anchor = p.x < cx - 12 ? 'end' : p.x > cx + 12 ? 'start' : 'middle'
          return (
            <text
              key={k}
              x={p.x}
              y={p.y}
              textAnchor={anchor}
              dominantBaseline="middle"
              fill="var(--chart-label)"
              fontSize={labelFontSize}
              fontFamily="Recursive, system-ui, sans-serif"
            >
              {label}
            </text>
          )
        })}
    </svg>
  )
}
