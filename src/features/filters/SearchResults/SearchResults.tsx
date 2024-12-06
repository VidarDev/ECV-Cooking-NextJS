'use client'
import Image from 'next/image'

import TransitionLink from '@/components/Atoms/TransitionLink'

import { forwardRef } from 'react'

import { SearchResultsProps } from './types'
import { MIN_SEARCH_LENGTH } from '@/config/constants'

export const SearchResults = forwardRef<HTMLDivElement, SearchResultsProps>(
  ({ results, isLoading, query }, ref) => {
    const renderResults = () => {
      if (isLoading) {
        return (
          <div className="p-4 text-center text-gray-500">
            Recherche en cours...
          </div>
        )
      }

      if (results.length === 0 && query.length >= MIN_SEARCH_LENGTH) {
        return (
          <div className="p-4 text-center text-gray-500">
            Aucune recette trouvée pour &quot;{query}&quot;
          </div>
        )
      }

      return (
        <ul className="py-2">
          {results.map((recipe) => (
            <li key={recipe.slug}>
              <TransitionLink
                href={`/recette/${recipe.slug}`}
                className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors"
              >
                <div className="relative h-12 w-12 rounded-md overflow-hidden">
                  <Image
                    src={
                      recipe.images[0]
                        ? recipe.images[0]
                        : `https://picsum.photos/300/300`
                    }
                    alt={recipe.title}
                    width={100}
                    height={100}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {recipe.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {recipe.prepTime ? `${recipe.prepTime} min - ` : ''}
                    {recipe.category ? recipe.category : ''}
                  </p>
                </div>
              </TransitionLink>
            </li>
          ))}
        </ul>
      )
    }

    return (
      <div
        ref={ref}
        className="absolute md:top-full md:bottom-auto bottom-full left-1/2 -translate-x-1/2 my-2 w-full bg-white rounded-xl shadow-lg border-2 border-black max-h-96 overflow-y-auto z-50"
      >
        {renderResults()}
      </div>
    )
  },
)

SearchResults.displayName = 'SearchResults'
