import { Link } from 'react-router-dom'
import { Recipe } from '../types'
import { Tag } from './Tag'
import { useFavorites } from '../hooks/useFavorites'

const DICT = { facil: 'Fácil', media: 'Media', dificil: 'Difícil' }

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { toggle, isFav } = useFavorites()
  const fav = isFav(recipe.id)

  return (
    <article className="group bg-white rounded-2xl shadow-card ring-1 ring-black/5 overflow-hidden transition transform hover:-translate-y-0.5 hover:shadow-lg ease-swift">
      {recipe.image && (
        <Link to={`/recetas/${recipe.slug}`} aria-label={recipe.title}>
          <img src={recipe.image} alt={recipe.title} className="h-40 w-full object-cover" />
        </Link>
      )}
      <div className="p-4 flex flex-col gap-3">
        <header className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">
              <Link to={`/recetas/${recipe.slug}`} className="hover:underline">
                {recipe.title}
              </Link>
            </h3>
            <p className="text-sm text-gray-600">{recipe.description}</p>
          </div>
          <div className="text-right min-w-[7rem]">
            <div className="badge">⏱️ {recipe.minutes} min</div>
            <div className="badge mt-1">⚙️ {DICT[recipe.difficulty]}</div>
          </div>
        </header>

        <div className="flex flex-wrap gap-2">
          {recipe.tags?.map(t => <Tag key={t}>{t}</Tag>)}
        </div>

        <footer className="mt-2 flex items-center gap-2">
          <Link to={`/recetas/${recipe.slug}`} className="btn btn-primary">Ver receta</Link>
          <button
            className={`btn ${fav ? 'text-lemon' : ''}`}
            title={fav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            onClick={() => toggle(recipe.id)}
            aria-pressed={fav}
          >
            {fav ? '★ Favorito' : '☆ Favorito'}
          </button>
        </footer>
      </div>
    </article>
  )
}