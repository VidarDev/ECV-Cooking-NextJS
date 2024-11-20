import { Suspense } from 'react'
import { Metadata } from 'next'

import { Card } from '@/components/Card'
import { Recipe } from '@/types/recipe'
import { getRecipeAll } from '@/services/api/recipes'
import Loading from './loading'

export const metadata: Metadata = {
  title: 'Recipes',
  description: '...',
}

export default async function RecipesPage() {
  const recipes: Recipe[] = await getRecipeAll()

  return (
    <div>
      <h1>All Recipes</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Suspense fallback={<Loading />}>
          {recipes?.map((recipe) => (
            <Card
              key={recipe.slug}
              title={recipe.title}
              slug={recipe.slug}
              difficulty={recipe.difficulty}
            />
          ))}
        </Suspense>
      </div>
    </div>
  )
}
