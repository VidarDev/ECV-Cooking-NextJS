import { Metadata } from 'next'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { getRecipeAll } from '@/services/api/recipes'
import { Recipe } from '@/types/recipe'
import TransitionLink from '@/components/Atoms/TransitionLink'
import { Flame, Hourglass } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { PageDefaultLayout } from '@/components/templates/PageLayout'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Gastronogeek - Recettes inspirées de la pop culture',
  description:
    'Découvrez des recettes uniques inspirées de vos films, séries et jeux vidéo préférés.',
}

export default async function HomePage() {
  const featuredRecipes: Recipe[] = await getRecipeAll()

  return (
    <PageDefaultLayout>
      {/* Hero Section */}
      <section className="w-full flex flex-col justify-center items-center min-h-[calc(80vh)] cards-effect relative z-20">
        <div className="cards-effect absolute top-0 left-0 w-full -z-10 h-full"></div>
        <div className="flex flex-col items-center justify-end h-[80vh]">
          <h1 className="text-[13vw] text-custom font-black">Gastronogeek</h1>
        </div>
      </section>

      {/* About Section */}
      <section className="px-4 my-8 -mt-8 z-10">
        <div className="py-24 rounded-[2.8vw] bg-white border-2 border-black">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">À Propos</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Bienvenue dans l&apos;univers où la gastronomie rencontre la
                culture geek ! Nous créons des recettes uniques inspirées de vos
                œuvres favorites, transformant des plats fictifs en délicieuses
                réalités.
              </p>
              <Button className="text-md px-4 py-6 rounded-xl" asChild>
                <Link href="/recettes">Découvrir nos recettes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="px-4 my-8 -mt-8 z-10">
        <div className="py-24">
          <div className="mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Recettes en vedette
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <Suspense>
                {featuredRecipes.slice(0, 3).map((recipe) => (
                  <Card
                    className="max-w-92 border-2 border-black flex flex-col"
                    key={recipe.slug}
                  >
                    <CardHeader className="relative p-0">
                      <div className="w-full flex justify-end flex-wrap gap-2 absolute right-0 top-0 p-6">
                        <Badge className="border-2 border-black">
                          {recipe.type}
                        </Badge>
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
                      {recipe.difficulty && (
                        <div className="flex items-center space-x-2 px-6">
                          <Flame className="w-4 h-4 text-red-500" />
                          <span>Difficulté: {recipe.difficulty}</span>
                        </div>
                      )}
                      {recipe.prepTime && (
                        <div className="flex items-center space-x-2 px-6">
                          <Hourglass className="w-4 h-4 text-custom" />
                          <span>Temps de preparation: {recipe.prepTime}</span>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="h-full mt-6">
                      <CardDescription className="line-clamp-3">
                        {recipe.desc}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex">
                      <Button
                        className="w-full text-md px-4 py-6 rounded-xl"
                        asChild
                      >
                        <TransitionLink href={`/recette/${recipe.slug}`}>
                          Voir la recette
                        </TransitionLink>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </PageDefaultLayout>
  )
}
