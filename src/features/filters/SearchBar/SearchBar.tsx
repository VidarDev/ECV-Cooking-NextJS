'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Loader2, X } from 'lucide-react'

import { useDebounce } from '@/hooks/useDebounce'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import { SearchResults } from '@/features/filters/SearchResults'
import { Input } from '@/components/ui/input'

import { Recipe } from '@/types/recipe'
import { MIN_SEARCH_LENGTH } from '@/config/constants'

export function SearchBar() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const debouncedSearch = useDebounce(search, 300)
  const containerRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(containerRef, () => setIsOpen(false))

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedSearch.length < MIN_SEARCH_LENGTH) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const res = await fetch(`/api/search/recipes?q=${debouncedSearch}`)
        const data = await res.json()
        setResults(data)
        setIsOpen(true)
      } catch (error) {
        console.error('Failed to fetch search results:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [debouncedSearch])

  const handleClearSearch = () => setSearch('')

  return (
    <>
      <div className="relative w-full max-w-60">
        <div className="relative">
          <Input
            type="text"
            value={search}
            placeholder="Rechercher une recette..."
            onChange={(e) => setSearch(e.target.value)}
            className="text-xs px-10 md:py-6 rounded-full bg-custom-background font-semibold"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-black" />
          </div>
          {isLoading ? (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
            </div>
          ) : (
            search && (
              <button
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-red-500 hover:text-red-700" />
              </button>
            )
          )}
        </div>
      </div>
      {isOpen &&
        (results.length > 0 || debouncedSearch.length >= MIN_SEARCH_LENGTH) && (
          <SearchResults
            ref={containerRef}
            results={results}
            isLoading={isLoading}
            query={debouncedSearch}
          />
        )}
    </>
  )
}
