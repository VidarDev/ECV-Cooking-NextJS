import { Recipe } from '@/types/recipe'

export interface SearchResultsProps {
  results: Recipe[]
  isLoading: boolean
  query: string
}
