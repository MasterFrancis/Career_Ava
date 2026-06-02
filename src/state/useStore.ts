import { useContext } from 'react'
import { StoreContext, type StoreValue } from './storeContext'

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('StoreProvider is missing')
  return ctx
}

