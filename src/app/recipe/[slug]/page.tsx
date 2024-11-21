import { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Loading from './loading'

import { Recipe } from '@/types/recipe'
import { getRecipeAll, getRecipeBySlug } from '@/services/recipes'

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
    <div className="p-4 flex flex-wrap">
      <Suspense fallback={<Loading />}>
        <Card className="max-w-80">
          <CardHeader>
            <div className="w-full flex justify-end flex-wrap gap-2">
              <Badge>{recipe.type}</Badge>
              <Badge variant="outline">{recipe.license}</Badge>
            </div>
            <Image
              src={
                recipe.images[0]
                  ? recipe.images[0]
                  : `https://picsum.photos/300/300`
              }
              alt={recipe.title}
              width={100}
              height={100}
              className="w-full h-auto mb-3 object-cover max-h-60"
            />
            <CardTitle>{recipe.title}</CardTitle>
            <CardDescription>{recipe.desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>difficulty : {recipe.difficulty}</p>
            <p>prep time : {recipe.prepTime}</p>
            <p>cooking time : {recipe.cookingTime}</p>
            <p>rest time : {recipe.restTime}</p>
            <p>dressing : {recipe.dressing}</p>
            <p>category : {recipe.category}</p>
            <p>license : {recipe.license}</p>
            <p>type : {recipe.type}</p>
            <p>default persons : {recipe.defaultPersons}</p>
            <p>steps : {recipe.steps}</p>
            <p>ingredients :</p>
            <ul>
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.name}>
                  {ingredient.quantity} {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex">
            <Button className="w-full" asChild>
              <Link href={'/recipe'}>Go Back</Link>
            </Button>
          </CardFooter>
        </Card>
      </Suspense>
    </div>
  )
}
