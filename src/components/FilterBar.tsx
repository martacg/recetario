import { useId } from 'react'
import type { Difficulty } from '../types'

export type Filters = {
  q: string
  maxMinutes?: number
  difficulty?: Difficulty | 'todas'
  includeIngredients: string[]
}

type Props = {
  value: Filters
  onChange: (next: Filters) => void
}

export function FilterBar({ value, onChange }: Props) {
  const idQ = useId();
  const idM = useId();
  const idD = useId();
  const idI = useId();

  const setDifficulty = (d: Filters['difficulty']) => onChange({ ...value, difficulty: d })
  const setMax = (m?: number) => onChange({ ...value, maxMinutes: m })

  return (
    <section className="card p-4 space-y-4">
      <div className="grid gap-4 md:grid-cols-4 items-end">
        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor={idQ} className="text-sm font-medium">Buscar</label>
          <input id={idQ} value={value.q}
            onChange={e => onChange({ ...value, q: e.target.value })}
            placeholder="título o descripción"
            className="rounded-xl border px-3 py-2 ring-1 ring-inset ring-black/10 focus:outline-none focus:ring-2 focus:ring-basil" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={idM} className="text-sm font-medium">Tiempo máx. (min)</label>
          <input id={idM} type="number" min={0} value={value.maxMinutes ?? ''}
            onChange={e => setMax(e.target.value ? Number(e.target.value) : undefined)}
            placeholder="ej: 30"
            className="rounded-xl border px-3 py-2 ring-1 ring-inset ring-black/10 focus:outline-none focus:ring-2 focus:ring-basil" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={idD} className="text-sm font-medium">Dificultad</label>
          <select id={idD} value={value.difficulty ?? 'todas'}
            onChange={e => setDifficulty(e.target.value as any)}
            className="rounded-xl border px-3 py-2 ring-1 ring-inset ring-black/10 focus:outline-none focus:ring-2 focus:ring-basil">
            <option value="todas">Todas</option>
            <option value="facil">Fácil</option>
            <option value="media">Media</option>
            <option value="dificil">Difícil</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className={`chip ${value.maxMinutes === 15 ? 'chip-active' : ''}`} onClick={() => setMax(15)}>⏱️ ≤ 15 min</button>
        <button className={`chip ${value.maxMinutes === 30 ? 'chip-active' : ''}`} onClick={() => setMax(30)}>⏱️ ≤ 30 min</button>
        <button className={`chip ${value.maxMinutes === 60 ? 'chip-active' : ''}`} onClick={() => setMax(60)}>⏱️ ≤ 60 min</button>
        <button className={`chip ${!value.maxMinutes ? 'chip-active' : ''}`} onClick={() => setMax(undefined)}>Borrar tiempo</button>

        <span className="mx-2 opacity-40">•</span>

        <button className={`chip ${value.difficulty === 'facil' ? 'chip-active' : ''}`} onClick={() => setDifficulty('facil')}>Fácil</button>
        <button className={`chip ${value.difficulty === 'media' ? 'chip-active' : ''}`} onClick={() => setDifficulty('media')}>Media</button>
        <button className={`chip ${value.difficulty === 'dificil' ? 'chip-active' : ''}`} onClick={() => setDifficulty('dificil')}>Difícil</button>
        <button className={`chip ${!value.difficulty || value.difficulty === 'todas' ? 'chip-active' : ''}`} onClick={() => setDifficulty('todas')}>Todas</button>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={idI} className="text-sm font-medium">Ingredientes (separados por coma)</label>
        <input id={idI} value={value.includeIngredients.join(', ')}
          onChange={e => onChange({ ...value, includeIngredients: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
          placeholder="pasta, ajo"
          className="rounded-xl border px-3 py-2 ring-1 ring-inset ring-black/10 focus:outline-none focus:ring-2 focus:ring-basil" />
      </div>
    </section>
  )
}