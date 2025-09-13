export type Difficulty = 'facil' | 'media' | 'dificil'

export type Recipe = {
  id: string
  slug: string
  title: string
  description: string
  minutes: number
  difficulty: Difficulty
  ingredients: string[]
  steps: string[]
  tags?: string[]
  image?: string
}