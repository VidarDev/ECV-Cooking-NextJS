import { NextResponse } from 'next/server'
import { apiConfig } from '@/config/api'
import { API_URL } from '@/config/env'

async function fetchRecipe(slug: string) {
  const { headers, revalidate } = apiConfig()
  const res = await fetch(`${API_URL}/api/recipes/${slug}`, {
    method: 'GET',
    headers,
    next: { revalidate },
  })
  if (!res.ok) throw new Error(`Failed to fetch recipe: ${res.status}`)
  return res.json()
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params
    const recipes = await fetchRecipe(slug)
    return NextResponse.json(recipes)
  } catch (error) {
    console.error('Error fetching recipe:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recipe' },
      { status: 500 },
    )
  }
}
