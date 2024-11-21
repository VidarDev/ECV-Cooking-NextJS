import { Metadata } from 'next'
import { Suspense } from 'react'

import { RecipeGrid } from '@/features/search/components/RecipeGrid'
import { FilterSidebar } from '@/features/search/components/FilterSidebar'
import { ActiveFilters } from '@/features/search/components/ActiveFilters'
import Loading from './loading'

import { getRecipeAll } from '@/services/recipes'
import { Recipe } from '@/types/recipe'

export const metadata: Metadata = {
  title: 'Recipes',
  description: '...',
}
interface RecipesPageProps {
  searchParams: {
    types?: string
    licenses?: string
  }
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const recipes: Recipe[] = await getRecipeAll()

  const selectedTypes = searchParams.types?.split(',') || []
  const selectedLicenses = searchParams.licenses?.split(',') || []

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesTypes =
      selectedTypes.length === 0 || selectedTypes.includes(recipe.type)
    const matchesLicense =
      selectedLicenses.length === 0 || selectedLicenses.includes(recipe.license)
    return matchesTypes && matchesLicense
  })

  // Get unique types and licenses for filters
  const allTypes = Array.from(new Set(recipes.flatMap((r) => r.type)))
  const allLicenses = Array.from(new Set(recipes.map((r) => r.license)))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Toutes nos recettes</h1>

      <div className="flex gap-8">
        <FilterSidebar
          types={allTypes}
          licenses={allLicenses}
          selectedTypes={selectedTypes}
          selectedLicenses={selectedLicenses}
        />

        <div className="flex-1">
          <ActiveFilters
            selectedTypes={selectedTypes}
            selectedLicenses={selectedLicenses}
          />

          <Suspense fallback={<Loading />}>
            <RecipeGrid recipes={filteredRecipes} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
