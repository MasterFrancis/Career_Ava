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

export const MATRIX_COLUMNS: MatrixColumn[] = [
  { id: 'interest', name: '兴趣/投入感' },
  { id: 'transfer', name: '能力迁移度（已有优势）' },
  { id: 'learningCost', name: '学习成本（需要补齐的短板）' },
  { id: 'entryBarrier', name: '进入门槛（作品/经验）' },
  { id: 'wlb', name: 'WLB/压力可承受度' },
  { id: 'market', name: '市场机会/岗位数量' },
  { id: 'values', name: '价值对齐（是否重要）' },
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

