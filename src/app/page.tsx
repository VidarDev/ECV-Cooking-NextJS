import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Home',
  description: '...',
}
export default function HomePage() {
  return (
    <div className="w-screen flex flex-col justify-center items-center min-h-[calc(100vh-200px)]">
      <h1 className="mb-8 font-semibold text-2xl">Welcome to Recipe App</h1>
      <Button asChild>
        <Link href="/recipes">View All Recipes</Link>
      </Button>
    </div>
  )
}
