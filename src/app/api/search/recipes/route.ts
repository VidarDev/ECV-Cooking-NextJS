import { NextResponse } from 'next/server'
import { getRecipeAll } from '@/services/api/recipes'
import { Recipe } from '@/types/recipe'

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('q')?.toLowerCase() || ''

  if (!query) {
    return NextResponse.json([])
  }

  const recipes: Recipe[] = await getRecipeAll()
  const filteredRecipes = filterRecipes(recipes, query)

  return NextResponse.json(filteredRecipes)
}

function filterRecipes(recipes: Recipe[], query: string): Recipe[] {
  return recipes.filter(
    ({ title, desc }) =>
      title.toLowerCase().includes(query) || desc.toLowerCase().includes(query),
  )
}
