import TransitionLink from '@/components/TransitionLink'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page non trouvée',
  description: '404 - Page non trouvée',
}

const NotFound = () => (
  <div className="min-w-screen min-h-screen relative flex justify-center items-center">
    <div className="cards-effect absolute top-0 left-0 w-full h-full"></div>
    <div className="flex flex-col items-center z-10 pointer-events-none">
      <h1 className="text-[6.25vw] text-custom font-black mb-5">
        Page non trouvée
      </h1>
      <p className="mb-8 text-[1.6vw]">
        Impossible de trouver la ressource demandée
      </p>
      <Button asChild>
        <TransitionLink
          className="text-[1.6vw] px-4 py-6 rounded-xl pointer-events-auto"
          href="/"
        >
          Revenir à l&apos;accueil
        </TransitionLink>
      </Button>
    </div>
  </div>
)

export default NotFound
