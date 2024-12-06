import { NextResponse } from 'next/server'
import { apiConfig } from '@/config/api'
import { API_URL } from '@/config/env'

async function fetchRecipes() {
  const { headers } = apiConfig()
  const response = await fetch(`${API_URL}/api/recipes`, {
    method: 'GET',
    headers,
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch recipes: ${response.status}`)
  }
  return response.json()
}

export async function GET() {
  try {
    const recipes = await fetchRecipes()
    return NextResponse.json(recipes)
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 },
    )
  }
}
