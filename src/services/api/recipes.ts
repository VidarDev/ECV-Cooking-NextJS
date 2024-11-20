import { Recipe } from '@/types/recipe'
import { getApiConfig } from '@/utils/config'

export async function getRecipeAll(): Promise<Recipe[]> {
  const { headers } = getApiConfig()

  try {
    const res = await fetch(`${process.env.API_URL}/api/recipes`, {
      method: 'GET',
      headers,
    })
    if (!res.ok) throw new Error(`Error: ${res.status}`)
    return res.json()
  } catch (error) {
    console.error('Failed to fetch recipes:', error)
    throw error
  }
}

export async function getRecipeBySlug(slug: string): Promise<Recipe> {
  const { headers, revalidate } = getApiConfig()

  try {
    const res = await fetch(`${process.env.API_URL}/api/recipes/${slug}`, {
      method: 'GET',
      headers,
      next: { revalidate },
    })
    if (!res.ok) throw new Error(`Error: ${res.status}`)
    return res.json()
  } catch (error) {
    console.error('Failed to fetch recipe:', error)
    throw error
  }
}
