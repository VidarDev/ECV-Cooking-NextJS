import { Recipe } from '@/types/recipe'

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
}

const revalidate: number = parseInt(
  process.env.NEXT_PUBLIC_API_REVALIDATE || '0',
  10,
)

export async function getRecipeAll(): Promise<Recipe[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes/`, {
    ...options,
  })

  if (!res.ok) {
    throw new Error('Failed to fetch recipe')
  }

  return res.json()
}

export async function getRecipeBySlug(slug: string): Promise<Recipe> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/${slug}`,
    {
      next: { revalidate },
      ...options,
    },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch recipe')
  }

  return response.json()
}
