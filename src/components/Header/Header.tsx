import Link from 'next/link'

import { SearchBar } from '@/features/filters/components/SearchBar'

export function Header() {
  return (
    <header className="relative top-0 w-full bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">Logo</Link>
        <SearchBar />
      </nav>
    </header>
  )
}
