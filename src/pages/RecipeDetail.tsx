import { useParams, Link, useNavigate } from 'react-router-dom'
import { RECIPES } from '../data/recipes'
import { Tag } from '../components/Tag'
import { useFavorites } from '../hooks/useFavorites'

export function RecipeDetail() {
  const { slug } = useParams<{ slug: string }>()
  const nav = useNavigate()
  const recipe = RECIPES.find(r => r.slug === slug)
  const { isFav, toggle } = useFavorites()

  if (!recipe) {
    return (
      <div className="space-y-4">
        <p className="text-gray-700">Receta no encontrada.</p>
        <button className="btn" onClick={() => nav(-1)}>← Volver</button>
      </div>
    )
  }

  const fav = isFav(recipe.id)

  return (
    <article className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-card">
        {recipe.image && <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent text-white">
          <h1 className="text-3xl font-bold">{recipe.title}</h1>
          <p className="opacity-90">{recipe.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="btn btn-primary" onClick={() => toggle(recipe.id)} aria-pressed={fav}>
          {fav ? '★ Quitar favorito' : '☆ Añadir favorito'}
        </button>
        <Link to="/" className="btn">← Todas las recetas</Link>
      </div>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card p-4">
          <h2 className="text-xl font-semibold mb-2">Ingredientes</h2>
          <ul className="space-y-1">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-basil focus:ring-basil" />
                <span>{ing}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-4">
          <h2 className="text-xl font-semibold mb-2">Pasos</h2>
          <ol className="list-decimal list-inside space-y-2">
            {recipe.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      </section>
    </article>
  )
}