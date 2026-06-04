import {
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import {
  createDefaultState,
  deriveState,
  loadState,
  saveState,
  type AppStateV1,
} from './storage'
import { StoreContext } from './storeContext'
import type { Action } from './actions'

function reducer(state: AppStateV1, action: Action): AppStateV1 {
  switch (action.type) {
    case 'quiz/setAnswer': {
      const next = { ...state, quizAnswers: [...state.quizAnswers] }
      next.quizAnswers[action.index] = action.answer
      return deriveState(next)
    }
    case 'quiz/clearAnswer': {
      const next = { ...state, quizAnswers: [...state.quizAnswers] }
      next.quizAnswers[action.index] = null
      return deriveState(next)
    }
    case 'notes/set': {
      return deriveState({
        ...state,
        notes: { ...state.notes, [action.pathId]: action.text },
      })
    }
    case 'ui/setTheme': {
      return { ...state, uiPrefs: { ...state.uiPrefs, theme: action.theme } }
    }
    case 'ui/setLastRoute': {
      return { ...state, uiPrefs: { ...state.uiPrefs, lastRoute: action.route } }
    }
    case 'matrix/setWeight': {
      return {
        ...state,
        matrix: {
          ...state.matrix,
          columnWeights: {
            ...state.matrix.columnWeights,
            [action.columnId]: action.weight,
          },
        },
      }
    }
    case 'matrix/setScore': {
      return {
        ...state,
        matrix: {
          ...state.matrix,
          scores: {
            ...state.matrix.scores,
            [action.pathId]: {
              ...state.matrix.scores[action.pathId],
              [action.columnId]: action.score,
            },
          },
        },
      }
    }
    case 'reset': {
      return deriveState(createDefaultState())
    }
    default:
      return state
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => loadState())

  useEffect(() => {
    saveState(state)
  }, [state])

  const value = useMemo(() => ({ state, dispatch }), [state])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
