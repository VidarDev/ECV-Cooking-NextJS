'use client'

import TransitionLink from '@/components/Atoms/TransitionLink'
import { Button } from '@/components/ui/button'

export default function Error() {
  return (
    <div className="min-w-screen min-h-screen relative flex justify-center items-center">
      <div className="cards-effect absolute top-0 left-0 w-full h-full"></div>
      <div className="flex flex-col items-center z-10 pointer-events-none ">
        <h1 className="text-[6.25vw] text-custom font-black mb-5">
          Pas de recette
        </h1>
        <p className="mb-8 text-[1.6vw]">
          Il n&apos;y a pas de recette avec ce nom
        </p>
        <Button asChild>
          <TransitionLink
            className="text-[1.6vw] px-4 py-6 rounded-xl pointer-events-auto"
            href={'/'}
          >
            Revenir à l&apos;accueil
          </TransitionLink>
        </Button>
      </div>
    </div>
  )
}
