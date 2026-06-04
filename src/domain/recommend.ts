import { DIMENSION_ORDER, type DimensionKey } from './dimensions'
import { PATHS, PATH_WEIGHTS, type PathId, type PathWeight } from './paths'

export type MatchBreakdownItem = {
  key: DimensionKey
  dimScore: number
  weight: PathWeight
  contribution: number
}

export type Recommendation = {
  pathId: PathId
  pathName: string
  matchScore: number
  breakdown: MatchBreakdownItem[]
  highlightDims: DimensionKey[]
}

/*
推荐算法（透明、可复现）：
matchScore = Σ(dimScore * weight[path][dim])
其中 dimScore ∈ [0..15]，weight ∈ [0..3]
*/
export function computeMatchScore(
  dimScores: Record<DimensionKey, number>,
  weights: Record<DimensionKey, PathWeight>,
): { score: number; breakdown: MatchBreakdownItem[] } {
  const breakdown: MatchBreakdownItem[] = []
  let score = 0

  for (const key of DIMENSION_ORDER) {
    const contribution = dimScores[key] * weights[key]
    score += contribution
    breakdown.push({
      key,
      dimScore: dimScores[key],
      weight: weights[key],
      contribution,
    })
  }

  breakdown.sort((a, b) => b.contribution - a.contribution)
  return { score, breakdown }
}

export function computeHighlightDims(
  breakdown: MatchBreakdownItem[],
): DimensionKey[] {
  const highSignal = breakdown
    .filter((b) => b.weight >= 2 && b.dimScore >= 11)
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, 3)
    .map((b) => b.key)

  if (highSignal.length > 0) return highSignal
  return breakdown.slice(0, 2).map((b) => b.key)
}

export function computeRecommendations(
  dimScores: Record<DimensionKey, number>,
  topN: number = 3,
): Recommendation[] {
  const results: Recommendation[] = PATHS.map((p) => {
    const { score, breakdown } = computeMatchScore(dimScores, PATH_WEIGHTS[p.id])
    return {
      pathId: p.id,
      pathName: p.name,
      matchScore: score,
      breakdown,
      highlightDims: computeHighlightDims(breakdown),
    }
  })

  results.sort((a, b) => b.matchScore - a.matchScore)
  return results.slice(0, topN)
}

