import Image from 'next/image'
import Link from 'next/link'

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

import { RecipeGridProps } from './types'

export function Loading() {
  return <div>Loading all recipes...</div>
}

export function RecipeGrid({ recipes }: RecipeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <Card className="max-w-80" key={recipe.slug}>
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
              className="w-full h-auto mb-3 object-cover max-h-32"
            />
            <CardTitle>{recipe.title}</CardTitle>
            <CardDescription className="line-clamp-4">
              {recipe.desc}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-auto">
            <p>difficulty : {recipe.difficulty}</p>
            <p>prep time : {recipe.prepTime}</p>
          </CardContent>
          <CardFooter className="flex">
            <Button className="w-full" asChild>
              <Link href={`/recipe/${recipe.slug}`}>Visite</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
