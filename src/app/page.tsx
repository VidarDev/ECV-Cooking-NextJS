import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Home',
  description: '...',
}
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Recipe App</h1>
      <Link href="/recipes">View All Recipes</Link>
    </div>
  )
}
