import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { RECIPES } from '../data/recipes'
import { RecipeCard } from '../components/RecipeCard'
import type { Recipe } from '../types'
import { FilterBar, type Filters } from '../components/FilterBar'

function applyFilters(data: Recipe[], f: Filters) {
  return data.filter(r => {
    const byQ = f.q
      ? (r.title + ' ' + r.description).toLowerCase().includes(f.q.toLowerCase())
      : true
    const byM = f.maxMinutes ? r.minutes <= f.maxMinutes : true
    const byD = f.difficulty && f.difficulty !== 'todas' ? r.difficulty === f.difficulty : true
    const byI = f.includeIngredients.length > 0
      ? f.includeIngredients.every(ing => r.ingredients.some(x => x.toLowerCase().includes(ing.toLowerCase())))
      : true
    return byQ && byM && byD && byI
  })
}

function fromParams(params: URLSearchParams): Filters {
  return {
    q: params.get('q') ?? '',
    maxMinutes: params.get('max') ? Number(params.get('max')) : undefined,
    difficulty: (params.get('d') as any) ?? 'todas',
    includeIngredients: params.get('ing')?.split(',').filter(Boolean) ?? []
  }
}

export function RecipeList() {
  const [params, setParams] = useSearchParams()
  const [filters, setFilters] = useState<Filters>(() => fromParams(params))

  useEffect(() => {
    const next = new URLSearchParams()
    if (filters.q) next.set('q', filters.q)
    if (filters.maxMinutes) next.set('max', String(filters.maxMinutes))
    if (filters.difficulty && filters.difficulty !== 'todas') next.set('d', filters.difficulty)
    if (filters.includeIngredients.length) next.set('ing', filters.includeIngredients.join(','))
    setParams(next, { replace: true })
  }, [filters, setParams])

  useEffect(() => {
    setFilters(fromParams(params))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.toString()])

  const filtered = useMemo(() => applyFilters(RECIPES, filters), [filters])

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Recetas</h1>
      <FilterBar value={filters} onChange={setFilters} />

      {filtered.length === 0 ? (
        <p className="text-gray-600">No hay recetas que coincidan con los filtros.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(r => <RecipeCard key={r.id} recipe={r} />)}
        </div>
      )}
    </section>
  )
}