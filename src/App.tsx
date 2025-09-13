import { Link, Outlet, useLocation } from 'react-router-dom'
import { FavoritesProvider } from './hooks/useFavorites'

export default function App() {
  const { pathname } = useLocation()
  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-paper text-ink">
        <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
          <div className="container-page flex items-center justify-between py-3">
            <Link to="/" className="text-2xl font-bold text-ink hover:text-tomato transition">🍴 Recetas</Link>
            <nav className="flex items-center gap-2">
              <Link to="/" className={`btn ${pathname === '/' ? 'bg-black/5' : ''}`}>Inicio</Link>
              <a className="btn" href="https://github.com/martacg" target="_blank" rel="noreferrer">Github</a>
            </nav>
          </div>
        </header>
        <main className="container-page py-6">
          <Outlet />
        </main>
        <footer className="mt-10 border-t bg-white">
          <div className="container-page py-6 text-sm text-gray-600">
            © 2025 Marta González | Desarrollo Front-end | www.martagonzalez.dev
          </div>
        </footer>
      </div>
    </FavoritesProvider>
  )
}