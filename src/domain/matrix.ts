import { PATHS, type PathId } from './paths'

export type MatrixColumnId =
  | 'interest'
  | 'transfer'
  | 'learningCost'
  | 'entryBarrier'
  | 'wlb'
  | 'market'
  | 'values'

export type MatrixColumn = {
  id: MatrixColumnId
  name: string
}

export const MATRIX_COLUMNS: { id: MatrixColumnId; name: string; desc?: string }[] = [
  { id: 'interest', name: '兴趣', desc: '做这件事的投入感与热情' },
  { id: 'transfer', name: '迁移度', desc: '已有优势或经验的可复用程度' },
  { id: 'learningCost', name: '学习成本', desc: '需要补齐的短板与时间精力' },
  { id: 'entryBarrier', name: '门槛', desc: '作品、学历或经验的硬性要求' },
  { id: 'wlb', name: 'WLB', desc: '工作生活平衡与压力可承受度' },
  { id: 'market', name: '市场', desc: '相关岗位数量与市场需求热度' },
  { id: 'values', name: '价值观', desc: '工作意义与个人价值观的对齐程度' },
]

export type MatrixWeight = 1 | 2 | 3
export type MatrixScore = 1 | 2 | 3 | 4 | 5

export type MatrixState = {
  columnWeights: Record<MatrixColumnId, MatrixWeight>
  scores: Record<PathId, Record<MatrixColumnId, MatrixScore>>
}

export function createDefaultMatrix(): MatrixState {
  const columnWeights: MatrixState['columnWeights'] = {
    interest: 2,
    transfer: 2,
    learningCost: 2,
    entryBarrier: 2,
    wlb: 2,
    market: 2,
    values: 2,
  }

  const scores = Object.fromEntries(
    PATHS.map((p) => [
      p.id,
      {
        interest: 3,
        transfer: 3,
        learningCost: 3,
        entryBarrier: 3,
        wlb: 3,
        market: 3,
        values: 3,
      },
    ]),
  ) as MatrixState['scores']

  return { columnWeights, scores }
}

export function computeMatrixTotal(
  matrix: MatrixState,
  pathId: PathId,
): number {
  let total = 0
  for (const col of MATRIX_COLUMNS) {
    total += matrix.columnWeights[col.id] * matrix.scores[pathId][col.id]
  }
  return total
}

export function computeMatrixRanking(matrix: MatrixState): Array<{
  pathId: PathId
  total: number
}> {
  const rows = PATHS.map((p) => ({
    pathId: p.id,
    total: computeMatrixTotal(matrix, p.id),
  }))
  rows.sort((a, b) => b.total - a.total)
  return rows
}

