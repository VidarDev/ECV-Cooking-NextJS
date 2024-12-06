import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getRecipeAll } from '@/services/api/recipes'
import { Recipe } from '@/types/recipe'
import { PageDefaultLayout } from '@/components/PageLayout'
import { Suspense } from 'react'
import CardRecipe from '@/components/CardRecipe'

export const metadata: Metadata = {
  title: 'Gastronogeek - Recettes inspirées de la pop culture',
  description:
    'Découvrez des recettes uniques inspirées de vos films, séries et jeux vidéo préférés.',
}

const HeroSection = () => (
  <section className="w-full flex flex-col justify-center items-center min-h-[calc(80vh)] cards-effect relative z-20">
    <div className="cards-effect absolute top-0 left-0 w-full -z-10 h-full"></div>
    <div className="flex flex-col items-center justify-end h-[80vh]">
      <h1 className="text-[13vw] text-custom font-black">Gastronogeek</h1>
    </div>
  </section>
)

const AboutSection = () => (
  <section className="px-4 my-8 -mt-8 z-10">
    <div className="py-24 rounded-[2.8vw] bg-white border-2 border-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">À Propos</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Bienvenue dans l&apos;univers où la gastronomie rencontre la culture
            geek ! Nous créons des recettes uniques inspirées de vos œuvres
            favorites, transformant des plats fictifs en délicieuses réalités.
          </p>
          <Button className="text-md px-4 py-6 rounded-xl" asChild>
            <Link href="/recettes">Découvrir nos recettes</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
)

const FeaturedRecipesSection = ({ recipes }: { recipes: Recipe[] }) => (
  <section className="px-4 my-8 -mt-8 z-10">
    <div className="py-24">
      <div className="mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Recettes en vedette
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <Suspense>
            {recipes.slice(0, 3).map((recipe) => (
              <CardRecipe recipe={recipe} key={recipe.slug} />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  </section>
)

export default async function HomePage() {
  const featuredRecipes: Recipe[] = await getRecipeAll()

  return (
    <PageDefaultLayout>
      <HeroSection />
      <AboutSection />
      <FeaturedRecipesSection recipes={featuredRecipes} />
    </PageDefaultLayout>
  )
}
