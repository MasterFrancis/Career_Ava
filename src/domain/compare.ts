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
): { advantageLines: string[]; riskLines: string[] } {
  const advantageLines =
    insight.advantage.length === 0
      ? ['优势维度不突出：更像“均衡型适配”，需要用行动验证来确认。']
      : insight.advantage.map((k) => `优势：${DIMENSIONS[k].name}更贴近岗位倾向。`)

  const riskLines =
    insight.risk.length === 0
      ? ['风险维度较少：主要不适感更可能来自具体团队/行业，而非能力画像本身。']
      : insight.risk.map((k) => `风险：岗位更偏${DIMENSIONS[k].name}，低分时容易觉得费力。`)

  return {
    advantageLines: advantageLines.slice(0, 4),
    riskLines: riskLines.slice(0, 4),
  }
}

