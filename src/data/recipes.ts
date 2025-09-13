import { Recipe } from '../types'

export const RECIPES: Recipe[] = [
  {
    id: 'r1',
    slug: 'pasta-al-pesto',
    title: 'Pasta al pesto',
    description: 'Clásica pasta con pesto de albahaca en 20 minutos.',
    minutes: 20,
    difficulty: 'facil',
    ingredients: ['pasta', 'albahaca', 'piñones', 'ajo', 'parmesano', 'aceite de oliva', 'sal'],
    steps: [
      'Cocer la pasta al dente.',
      'Triturar albahaca, piñones, ajo, parmesano y aceite.',
      'Mezclar con la pasta y rectificar de sal.'
    ],
    tags: ['italiana', 'rápida'],
    image: './img/pasta.svg'
  },
  {
    id: 'r2',
    slug: 'curry-de-garbanzos',
    title: 'Curry de garbanzos',
    description: 'Cremoso, especiado y reconfortante.',
    minutes: 35,
    difficulty: 'media',
    ingredients: ['garbanzos', 'cebolla', 'ajo', 'jengibre', 'curry', 'tomate', 'leche de coco', 'cilantro'],
    steps: [
      'Pochar cebolla, ajo y jengibre.',
      'Añadir curry y tomate; cocinar.',
      'Incorporar garbanzos y leche de coco; hervir suave.'
    ],
    tags: ['vegano', 'hindú'],
    image: './img/curry.svg'
  },
  {
    id: 'r3',
    slug: 'lasagna-clasica',
    title: 'Lasaña clásica',
    description: 'Capas de pasta con boloñesa y bechamel.',
    minutes: 75,
    difficulty: 'dificil',
    ingredients: ['placas de lasaña', 'carne picada', 'tomate', 'zanahoria', 'cebolla', 'leche', 'harina', 'mantequilla', 'queso'],
    steps: [
      'Preparar boloñesa.',
      'Hacer bechamel.',
      'Montar capas y hornear 35–40 min.'
    ],
    tags: ['horno', 'italiana'],
    image: './img/lasagna.svg'
  }
]