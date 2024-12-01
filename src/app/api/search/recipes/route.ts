// src/app/api/search/route.ts
import { NextResponse } from 'next/server'
import { getRecipeAll } from '@/services/api/recipes'
import { Recipe } from '@/types/recipe'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json([])
  }

  const recipes: Recipe[] = await getRecipeAll()
  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase()) ||
      recipe.desc.toLowerCase().includes(query.toLowerCase()),
  )

  return NextResponse.json(filteredRecipes)
}
