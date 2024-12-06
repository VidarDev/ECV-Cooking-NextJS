import { Metadata } from 'next'
import { Suspense } from 'react'

import { RecipeGrid } from '@/features/search/RecipeGrid'
import { FilterSidebar } from '@/features/search/FilterSidebar'
import { ActiveFilters } from '@/features/search/ActiveFilters'
import Loading from './loading'

import { getRecipeAll } from '@/services/api/recipes'
import { Recipe } from '@/types/recipe'
import { PageCustomLayout } from '@/components/PageLayout'

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

const filterRecipes = (
  recipes: Recipe[],
  selectedTypes: string[],
  selectedLicenses: string[],
) => {
  return recipes.filter((recipe) => {
    const matchesTypes =
      selectedTypes.length === 0 || selectedTypes.includes(recipe.type)
    const matchesLicense =
      selectedLicenses.length === 0 || selectedLicenses.includes(recipe.license)
    return matchesTypes && matchesLicense
  })
}

const getUniqueValues = (recipes: Recipe[], key: keyof Recipe): string[] => {
  return Array.from(new Set(recipes.map((recipe) => String(recipe[key]))))
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const recipes: Recipe[] = await getRecipeAll()

  const selectedTypes = searchParams.types?.split(',') || []
  const selectedLicenses = searchParams.licenses?.split(',') || []

  const filteredRecipes = filterRecipes(
    recipes,
    selectedTypes,
    selectedLicenses,
  )
  const allTypes = getUniqueValues(recipes, 'type')
  const allLicenses = getUniqueValues(recipes, 'license')

  return (
    <PageCustomLayout>
      <h1 className="text-4xl mb-12 font-semibold text-center md:text-left">
        Toutes nos recettes
      </h1>

      <FilterSidebar
        types={allTypes}
        licenses={allLicenses}
        selectedTypes={selectedTypes}
        selectedLicenses={selectedLicenses}
        className="absolute md:bottom-[calc(100%-100px)] bottom-[calc(100%-24px)] left-1/2 -translate-x-1/2 md:left-3/4 z-10 rotate-3 min-w-[300px]"
      />

      <ActiveFilters
        selectedTypes={selectedTypes}
        selectedLicenses={selectedLicenses}
      />

      <Suspense fallback={<Loading />}>
        <RecipeGrid recipes={filteredRecipes} />
      </Suspense>
    </PageCustomLayout>
  )
}
