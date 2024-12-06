import { Metadata } from 'next'
import { Suspense } from 'react'
import Image from 'next/image'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Loading from './loading'
import TransitionLink from '@/components/TransitionLink'
import IngredientsList from '@/components/IngredientsList/IngredientsList'

import { Recipe } from '@/types/recipe'
import { getRecipeAll, getRecipeBySlug } from '@/services/api/recipes'
import { PageCustomLayout } from '@/components/PageLayout'
import { ChevronLeft, Flame } from 'lucide-react'

export async function generateStaticParams() {
  const recipes: Recipe[] = await getRecipeAll()
  return recipes.map((recipe) => ({ slug: recipe.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const recipe: Recipe = await getRecipeBySlug(params.slug)
  return { title: recipe.title, description: recipe.title }
}

const RecipeInfo = ({ recipe }: { recipe: Recipe }) => (
  <div className="flex flex-wrap gap-2 items-center w-full md:w-1/2 mb-2">
    {recipe.type && (
      <div className="flex items-center space-x-2 text-lg border-2 px-2 py-1 rounded-xl border-purple-500 bg-purple-50">
        <span>{recipe.type}</span>
      </div>
    )}
    {recipe.difficulty && (
      <div className="flex items-center space-x-2 text-lg border-2 px-2 py-1 rounded-xl border-red-500 bg-red-50">
        <Flame className="w-6 h-6 text-red-500" />
        <span>Difficulté: {recipe.difficulty}</span>
      </div>
    )}
    {recipe.category && (
      <div className="flex items-center space-x-2 text-lg border-2 px-2 py-1 rounded-xl border-cyan-500 bg-cyan-50">
        <span>{recipe.category}</span>
      </div>
    )}
    {recipe.license && (
      <div className="flex items-center space-x-2 text-lg border-2 px-2 py-1 rounded-xl border-custom bg-custom-background">
        <span>{recipe.license}</span>
      </div>
    )}
  </div>
)

const RecipeTimes = ({ recipe }: { recipe: Recipe }) => (
  <div className="w-full md:w-1/2 mb-6">
    {recipe.prepTime && (
      <div className="flex items-center space-x-2 text-lg">
        <span>Temps de préparation: {recipe.prepTime}</span>
      </div>
    )}
    {recipe.cookingTime && (
      <div className="flex items-center space-x-2 text-lg">
        <span>Temps de cuisson: {recipe.cookingTime}</span>
      </div>
    )}
    {recipe.restTime && (
      <div className="flex items-center space-x-2 text-lg">
        <span>Temps de repos: {recipe.restTime}</span>
      </div>
    )}
  </div>
)

const RecipePageContent = ({ recipe }: { recipe: Recipe }) => (
  <>
    <Image
      src={recipe.images[0] ?? `https://picsum.photos/300/300`}
      alt={recipe.title}
      width={500}
      height={300}
      className="w-[20vw] md:w-[30vw] h-auto max-h-[75vh] mb-4 object-cover rounded-lg absolute md:bottom-[calc(100%-18vw)]
        bottom-[calc(100%-100px)] left-1/2 -translate-x-1/2 md:left-3/4 z-10
        rotate-3 min-w-[300px] border-2 border-black"
    />
    <TransitionLink
      className="absolute top-6 left-6 text-font-semibold text-md flex items-center gap-2"
      href={`/recettes`}
    >
      <ChevronLeft className="w-4 h-4" />
      Voir les recettes
    </TransitionLink>
    <div className="flex justify-between w-full md:w-1/2">
      <h1 className="text-4xl mt-16 mb-10 font-semibold text-center md:text-left">
        {recipe.title}
      </h1>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
      <RecipeInfo recipe={recipe} />
      <RecipeTimes recipe={recipe} />
    </div>
    <p className="text-lg w-full mb-12">{recipe.desc}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="h-fit border-2 border-black">
        <CardHeader className="flex">
          <CardTitle className="text-xl text-custom">Ingredients</CardTitle>
        </CardHeader>
        <CardContent>
          <IngredientsList
            ingredients={recipe.ingredients}
            defaultPersons={recipe.defaultPersons}
          />
        </CardContent>
      </Card>
      <Card className="h-fit border-2 border-black">
        <CardHeader>
          <CardTitle className="text-xl text-custom">Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          {recipe.dressing && (
            <p className="font-medium mb-4 text-gray-500">
              Dréssage: {recipe.dressing}
            </p>
          )}
          <ol className="list-decimal list-inside space-y-4">
            {recipe.steps.map((step, index) => (
              <li key={index} className="pl-2 mb-2">
                {step.trim()}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  </>
)

export default async function RecipePage({
  params,
}: {
  params: { slug: string }
}) {
  const recipe: Recipe = await getRecipeBySlug(params.slug)
  return (
    <PageCustomLayout>
      <Suspense fallback={<Loading />}>
        <RecipePageContent recipe={recipe} />
      </Suspense>
    </PageCustomLayout>
  )
}
