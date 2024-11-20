import { Recipe } from '@/types/recipe'
import { getApiConfig } from '@/utils/config'

export async function getRecipeAll(): Promise<Recipe[]> {
  const { headers } = getApiConfig()

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/recipes`, {
    method: 'GET',
    headers,
  })

  if (!res.ok) throw new Error(`Failed to fetch recipes : ${res.status}`)
  return res.json()
}

export async function getRecipeBySlug(slug: string): Promise<Recipe> {
  const { headers, revalidate } = getApiConfig()

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/recipe/${slug}`,
    {
      method: 'GET',
      headers,
      next: { revalidate },
    },
  )

  if (!res.ok) throw new Error(`Failed to fetch recipe : ${res.status}`)
  return res.json()
}
