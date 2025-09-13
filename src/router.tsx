// src/router.tsx
import { createHashRouter } from 'react-router-dom'
import App from './App'
import { RecipeList } from './pages/RecipeList'
import { RecipeDetail } from './pages/RecipeDetail'

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <RecipeList /> },
      { path: 'recetas/:slug', element: <RecipeDetail /> },
    ],
  },
])
