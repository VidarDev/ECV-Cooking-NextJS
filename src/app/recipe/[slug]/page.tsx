import { Metadata } from 'next'
import { Suspense } from 'react'

import { Card } from '@/components/Card'
import { Recipe } from '@/types/recipe'
import Loading from './loading'
import { getRecipeAll, getRecipeBySlug } from '@/services/api/recipes'
import Link from 'next/link'

export async function generateStaticParams() {
  const recipes: Recipe[] = await getRecipeAll()

  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const recipe: Recipe = await getRecipeBySlug(params.slug)

  return {
    title: recipe.title,
    description: recipe.title,
  }
}

export default async function RecipePage({
  params,
}: {
  params: { slug: string }
}) {
  const recipe: Recipe = await getRecipeBySlug(params.slug)

  return (
    <div>
      <Link href={'/recipe'}>
        <h1>{recipe.title}</h1>
      </Link>
      <Suspense fallback={<Loading />}>
        <Card
          title={recipe.title}
          difficulty={recipe.difficulty}
          slug={recipe.slug}
        />
      </Suspense>
    </div>
  )
}
