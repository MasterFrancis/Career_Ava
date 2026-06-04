export type DimensionKey = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'

export const DIMENSION_ORDER: DimensionKey[] = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
]

export type DimensionMeta = {
  key: DimensionKey
  name: string
  shortName: string
  oneLiner: string
}

export const DIMENSIONS: Record<DimensionKey, DimensionMeta> = {
  A: {
    key: 'A',
    name: '结构化',
    shortName: '拆解',
    oneLiner: '把模糊问题拆成边界清晰的步骤，并推动对齐。',
  },
  B: {
    key: 'B',
    name: '深挖',
    shortName: '追问',
    oneLiner: '对动机与机制保持好奇，愿意追到更底层的解释。',
  },
  C: {
    key: 'C',
    name: '协作',
    shortName: '共创',
    oneLiner: '通过讨论整合观点，把分歧变成可执行的共识。',
  },
  D: {
    key: 'D',
    name: '表达影响',
    shortName: '影响',
    oneLiner: '把洞察讲成决策材料，让对方愿意行动并能复盘。',
  },
  E: {
    key: 'E',
    name: '证据测量',
    shortName: '证据',
    oneLiner: '偏好可复核的证据链，愿意用指标与复盘验证观点。',
  },
  F: {
    key: 'F',
    name: '节奏压力',
    shortName: '交付',
    oneLiner: '在不完整信息与快节奏里交付可用版本并快速迭代。',
  },
  G: {
    key: 'G',
    name: '价值取向',
    shortName: '公共',
    oneLiner: '对公平、伦理与公共利益更敏感，愿意对齐长期外部性。',
  },
  H: {
    key: 'H',
    name: '商业目标',
    shortName: '目标',
    oneLiner: '关注资源约束与结果，把目标拆成可衡量的里程碑。',
  },
}

export function createEmptyDimensionScores(): Record<DimensionKey, number> {
  return { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0 }
}

