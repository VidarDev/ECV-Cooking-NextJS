import { Metadata } from 'next'

import TransitionLink from '@/components/TransitionLink'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Home',
  description: '...',
}
export default function HomePage() {
  return (
    <div className="w-screen flex flex-col justify-center items-center min-h-[calc(100vh-200px)]">
      <h1 className="mb-8 font-semibold text-2xl">Welcome to Recipe App</h1>
      <Button asChild>
        <TransitionLink href="/recipes">View All Recipes</TransitionLink>
      </Button>
    </div>
  )
}
