import { createEmptyDimensionScores, type DimensionKey } from './dimensions'

export type QuizAnswer = 1 | 2 | 3 | 4 | 5

export type QuizQuestion = {
  index: number
  dimension: DimensionKey
  text: string
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    index: 1,
    dimension: 'A',
    text: '面对模糊的问题，我倾向先把目标、范围、假设和约束写清楚。',
  },
  {
    index: 2,
    dimension: 'A',
    text: '我喜欢把一个大问题拆成可执行的步骤或小问题逐个推进。',
  },
  {
    index: 3,
    dimension: 'A',
    text: '我更愿意在开始前把关键定义与边界对齐，而不是边做边想。',
  },
  {
    index: 4,
    dimension: 'B',
    text: '我会不断追问“为什么会这样”，直到找到更底层的解释。',
  },
  {
    index: 5,
    dimension: 'B',
    text: '我愿意花时间理解人的动机、语境与差异，而不是只看表层行为。',
  },
  {
    index: 6,
    dimension: 'B',
    text: '我对“机制/逻辑链条”比对“结论本身”更敏感。',
  },
  {
    index: 7,
    dimension: 'C',
    text: '我喜欢在讨论中逐步把想法磨出来，而不是独立完成后再交付。',
  },
  {
    index: 8,
    dimension: 'C',
    text: '我能在不同观点之间做整合，并推动团队形成可执行共识。',
  },
  {
    index: 9,
    dimension: 'C',
    text: '我愿意花时间做沟通与对齐，以减少后续返工。',
  },
  {
    index: 10,
    dimension: 'D',
    text: '我擅长把复杂内容讲清楚，并让对方愿意据此做决定。',
  },
  {
    index: 11,
    dimension: 'D',
    text: '我喜欢把研究/分析写成“建议与取舍”，而不仅是“发现”。',
  },
  {
    index: 12,
    dimension: 'D',
    text: '我对“是否产生影响”很在意，会追踪结果并迭代表达方式。',
  },
  {
    index: 13,
    dimension: 'E',
    text: '我愿意学习指标、数据与基本统计概念来验证观点。',
  },
  {
    index: 14,
    dimension: 'E',
    text: '我更信任可复核的证据（数据、记录、对照），而不是直觉。',
  },
  {
    index: 15,
    dimension: 'E',
    text: '我喜欢复盘：哪些动作带来效果，哪些没有，原因是什么。',
  },
  {
    index: 16,
    dimension: 'F',
    text: '在时间紧、信息不完整的情况下，我仍能产出可用的版本。',
  },
  {
    index: 17,
    dimension: 'F',
    text: '我能在多任务并行中保持推进，而不是被细节拖住。',
  },
  {
    index: 18,
    dimension: 'F',
    text: '我可以接受方案被快速推翻或重做，并及时调整。',
  },
  {
    index: 19,
    dimension: 'G',
    text: '我对伦理、公平、弱势群体与公共利益议题更敏感。',
  },
  {
    index: 20,
    dimension: 'G',
    text: '我做决策时会考虑长期影响与外部性，而不仅是短期收益。',
  },
  {
    index: 21,
    dimension: 'G',
    text: '我愿意把工作对齐到社会价值/公共服务质量的提升。',
  },
  {
    index: 22,
    dimension: 'H',
    text: '我会自然地关注资源约束（时间/预算/人力）并据此做取舍。',
  },
  {
    index: 23,
    dimension: 'H',
    text: '我愿意为结果负责，会把目标拆解成可衡量的里程碑。',
  },
  {
    index: 24,
    dimension: 'H',
    text: '我倾向把工作对齐到业务目标（增长/留存/口碑/效率等）。',
  },
]

export function createEmptyQuizAnswers(): Array<QuizAnswer | null> {
  return Array.from({ length: 24 }, () => null)
}

export function isQuizComplete(answers: Array<QuizAnswer | null>): boolean {
  return answers.length === 24 && answers.every((a) => a != null)
}

/*
计分规则（来自报告）：
- 24 题，每题 1–5 分
- 8 个维度 A–H，每维 3 题，按题号分组求和，得分范围 3–15
*/
export function computeDimensionScores(
  answers: Array<QuizAnswer | null>,
): Record<DimensionKey, number> {
  const scores = createEmptyDimensionScores()

  for (const q of QUIZ_QUESTIONS) {
    const answer = answers[q.index - 1]
    scores[q.dimension] += answer ?? 0
  }

  return scores
}

