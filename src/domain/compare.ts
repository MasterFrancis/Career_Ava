import { DIMENSIONS, DIMENSION_ORDER, type DimensionKey } from './dimensions'
import { PATH_WEIGHTS, type PathId } from './paths'

export type MatchInsight = {
  advantage: DimensionKey[]
  risk: DimensionKey[]
}

export function normalize15(v: number): number {
  return Math.max(0, Math.min(1, v / 15))
}

export function getMatchInsight(
  userScores: Record<DimensionKey, number>,
  roleProfile: Record<DimensionKey, number>,
  pathId: PathId,
): MatchInsight {
  const weights = PATH_WEIGHTS[pathId]

  const deltas = DIMENSION_ORDER.map((k) => {
    const user = normalize15(userScores[k])
    const role = normalize15(roleProfile[k])
    return {
      key: k,
      user,
      role,
      delta: user - role,
      weight: weights[k],
      pressure: role * weights[k],
    }
  })

  const advantage = deltas
    .filter((d) => d.delta >= 0.15 || (d.weight >= 2 && d.user >= 0.8))
    .sort((a, b) => b.delta + b.weight - (a.delta + a.weight))
    .slice(0, 2)
    .map((d) => d.key)

  const risk = deltas
    .filter((d) => d.delta <= -0.15 && (d.weight >= 2 || d.role >= 0.65))
    .sort((a, b) => b.pressure - a.pressure)
    .slice(0, 2)
    .map((d) => d.key)

  return { advantage, risk }
}

export function buildMatchExplanation(
  insight: MatchInsight,
): { advantageLine: string; riskLine: string } {
  const advantageLine =
    insight.advantage.length === 0
      ? '未见明显短板：属于均衡适配，可优先考虑。'
      : `核心优势：在${insight.advantage.map(k => DIMENSIONS[k].name).join('与')}维度上表现突出，与该岗位高要求极度吻合。`

  const riskLine =
    insight.risk.length === 0
      ? '画像匹配度高：能力倾向与岗位需求基本对齐。'
      : `潜在风险：该岗位较看重${insight.risk.map(k => DIMENSIONS[k].name).join('与')}，可能在相关工作流中感到费力或需要额外精力适应。`

  return {
    advantageLine,
    riskLine,
  }
}

