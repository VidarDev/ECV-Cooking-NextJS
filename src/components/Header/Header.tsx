import { SearchBar } from '@/features/filters/components/SearchBar'
import TransitionLink from '../TransitionLink'

export function Header() {
  return (
    <header className="relative top-0 w-full bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <TransitionLink href="/">Logo</TransitionLink>
        <SearchBar />
      </nav>
    </header>
  )
}
