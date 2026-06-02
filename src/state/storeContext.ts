import { createContext } from 'react'
import type { AppStateV1 } from './storage'
import type { Action } from './actions'

export type StoreValue = {
  state: AppStateV1
  dispatch: (action: Action) => void
}

export const StoreContext = createContext<StoreValue | null>(null)
