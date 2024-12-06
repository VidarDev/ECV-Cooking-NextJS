import { Recipe } from '@/types/recipe'
import { apiConfig } from '@/config/api'

export async function getRecipeAll(): Promise<Recipe[]> {
  const { headers } = apiConfig()

  const res = await fetch(`${process.env.API_URL}/api/recipes`, {
    method: 'GET',
    headers,
  })
  if (!res.ok) throw new Error(`Failed to fetch recipes : ${res.status}`)
  return res.json()
}

export async function getRecipeBySlug(slug: string): Promise<Recipe> {
  const { headers, revalidate } = apiConfig()

  const res = await fetch(`${process.env.API_URL}/api/recipes/${slug}`, {
    method: 'GET',
    headers,
    next: { revalidate },
  })
  if (!res.ok) throw new Error(`Failed to fetch recipe : ${res.status}`)
  return res.json()
}
