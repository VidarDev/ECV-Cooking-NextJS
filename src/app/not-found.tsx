import TransitionLink from '@/components/Atoms/TransitionLink'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-w-screen min-h-screen relative flex justify-center items-center">
      <div className="cards-effect absolute top-0 left-0 w-full h-full"></div>
      <div className="flex flex-col items-center z-10">
        <h1 className="text-5xl">Page non trouvée</h1>
        <p>Impossible de trouver la ressource demandée</p>
        <Button asChild>
          <TransitionLink href={'/'}>Revenir à l&apos;accueil</TransitionLink>
        </Button>
      </div>
    </div>
  )
}
