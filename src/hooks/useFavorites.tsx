import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Ctx = {
  favorites: Set<string>
  toggle: (id: string) => void
  isFav: (id: string) => boolean
}

const FavoritesContext = createContext<Ctx | null>(null)

const KEY = 'recetas:favorites'

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [setData, setSetData] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) setSetData(new Set(JSON.parse(raw)))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(Array.from(setData)))
    } catch {}
  }, [setData])

  const value = useMemo<Ctx>(() => ({
    favorites: setData,
    toggle: (id: string) => {
      setSetData(prev => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id); else next.add(id)
        return next
      })
    },
    isFav: (id: string) => setData.has(id),
  }), [setData])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}