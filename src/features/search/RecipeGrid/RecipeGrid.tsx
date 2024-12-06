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
import TransitionLink from '@/components/Atoms/TransitionLink'

import { RecipeGridProps } from './types'
import { Flame, Hourglass } from 'lucide-react'

export function Loading() {
  return <div>Loading all recipes...</div>
}

export function RecipeGrid({ recipes }: RecipeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <Card
          className="max-w-92 border-2 border-black flex flex-col"
          key={recipe.slug}
        >
          <CardHeader className="relative p-0">
            <div className="w-full flex justify-end flex-wrap gap-2 absolute right-0 top-0 p-6">
              <Badge className="border-2 border-black">{recipe.type}</Badge>
              <Badge
                className="border-2 border-black bg-white"
                variant="outline"
              >
                {recipe.license}
              </Badge>
            </div>
            <Image
              src={
                recipe.images[0]
                  ? recipe.images[0]
                  : `https://picsum.photos/300/300`
              }
              alt={recipe.title}
              width={200}
              height={200}
              className="w-full h-auto mb-3 object-cover max-h-48 !mt-0 rounded-t-lg"
            />
            <CardTitle className="p-6 pb-3 font-bold text-xl">
              {recipe.title}
            </CardTitle>
            <div className="flex items-center space-x-2 px-6">
              <Flame className="w-4 h-4 text-red-500" />
              <span>Difficulté: {recipe.difficulty}</span>
            </div>
            <div className="flex items-center space-x-2 px-6">
              <Hourglass className="w-4 h-4 text-custom" />
              <span>Temps: {recipe.prepTime}</span>
            </div>
          </CardHeader>
          <CardContent className="h-full mt-6">
            <CardDescription className="line-clamp-3">
              {recipe.desc}
            </CardDescription>
          </CardContent>
          <CardFooter className="flex">
            <Button className="w-full text-md px-4 py-6 rounded-xl" asChild>
              <TransitionLink href={`/recette/${recipe.slug}`}>
                Voir la recette
              </TransitionLink>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
