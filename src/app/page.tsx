import { Metadata } from 'next'

import TransitionLink from '@/components/Atoms/TransitionLink'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Home',
  description: '...',
}
export default function HomePage() {
  return (
    <div className="w-screen flex flex-col justify-center items-center min-h-[calc(100vh-200px)] cardreveal">
      <h1 className="mb-8 font-semibold text-2xl">Gastronogeek</h1>
      <Button asChild>
        <TransitionLink href="/recettes">View All Recipes</TransitionLink>
      </Button>
    </div>
  )
}
