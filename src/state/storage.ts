import { ROLE_PROFILES } from '../domain/paths'
import { computeDimensionScores, createEmptyQuizAnswers, isQuizComplete } from '../domain/quiz'
import { computeRecommendations } from '../domain/recommend'
import { createDefaultMatrix, type MatrixState } from '../domain/matrix'
import { createEmptyDimensionScores, type DimensionKey } from '../domain/dimensions'
import type { PathId, RoleProfile } from '../domain/paths'

export type AppTheme = 'dark' | 'light' | 'system'

export type RecommendationsState = {
  top: ReturnType<typeof computeRecommendations>
  computedAtISO: string
}

export type UiPrefs = {
  theme: AppTheme
  lastRoute: string
}

export type AppStateV1 = {
  version: 1
  quizAnswers: Array<1 | 2 | 3 | 4 | 5 | null>
  dimensionScores: Record<DimensionKey, number>
  recommendations: RecommendationsState | null
  roleProfiles: Record<PathId, RoleProfile>
  matrix: MatrixState
  notes: Record<PathId, string>
  uiPrefs: UiPrefs
}

const STORAGE_KEY = 'career-app:uk:v1'

export function createDefaultState(): AppStateV1 {
  return {
    version: 1,
    quizAnswers: createEmptyQuizAnswers(),
    dimensionScores: createEmptyDimensionScores(),
    recommendations: null,
    roleProfiles: ROLE_PROFILES,
    matrix: createDefaultMatrix(),
    notes: {
      'ux-research': '',
      'inhouse-insights': '',
      'agency-strategy': '',
      'research-consulting': '',
      'public-sector-research': '',
      measurement: '',
    },
    uiPrefs: {
      theme: 'system',
      lastRoute: '/',
    },
  }
}

export function deriveState(state: AppStateV1): AppStateV1 {
  const dimensionScores = computeDimensionScores(state.quizAnswers)

  const recommendations = isQuizComplete(state.quizAnswers)
    ? {
        top: computeRecommendations(dimensionScores, 3),
        computedAtISO: new Date().toISOString(),
      }
    : null

  return { ...state, dimensionScores, recommendations }
}

export function loadState(): AppStateV1 {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return deriveState(createDefaultState())
    const parsed = JSON.parse(raw) as Partial<AppStateV1>
    if (parsed.version !== 1) return deriveState(createDefaultState())
    const merged: AppStateV1 = {
      ...createDefaultState(),
      ...parsed,
      uiPrefs: { ...createDefaultState().uiPrefs, ...(parsed.uiPrefs ?? {}) },
      notes: { ...createDefaultState().notes, ...(parsed.notes ?? {}) },
      roleProfiles: ROLE_PROFILES,
      matrix: parsed.matrix ?? createDefaultMatrix(),
      quizAnswers: Array.isArray(parsed.quizAnswers)
        ? (parsed.quizAnswers.slice(0, 24) as AppStateV1['quizAnswers'])
        : createEmptyQuizAnswers(),
    }

    return deriveState(merged)
  } catch {
    return deriveState(createDefaultState())
  }
}

export function saveState(state: AppStateV1) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    return
  }
}

export function resetAll() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    return
  }
}

