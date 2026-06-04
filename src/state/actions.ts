import type { AppStateV1 } from './storage'
import type { PathId } from '../domain/paths'
import type { MatrixColumnId, MatrixScore, MatrixWeight } from '../domain/matrix'
import type { QuizAnswer } from '../domain/quiz'

export type Action =
  | { type: 'quiz/setAnswer'; index: number; answer: QuizAnswer }
  | { type: 'quiz/clearAnswer'; index: number }
  | { type: 'notes/set'; pathId: PathId; text: string }
  | { type: 'ui/setTheme'; theme: AppStateV1['uiPrefs']['theme'] }
  | { type: 'ui/setLastRoute'; route: string }
  | { type: 'matrix/setWeight'; columnId: MatrixColumnId; weight: MatrixWeight }
  | {
      type: 'matrix/setScore'
      pathId: PathId
      columnId: MatrixColumnId
      score: MatrixScore
    }
  | { type: 'reset' }

