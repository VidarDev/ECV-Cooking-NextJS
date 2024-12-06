import { FC } from 'react'
import { RecipeGridProps } from './types'
import CardRecipe from '@/components/CardRecipe'

const Loading: FC = () => <div>Loading all recipes...</div>

const RecipeGrid: FC<RecipeGridProps> = ({ recipes }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
    {recipes.map((recipe) => (
      <CardRecipe recipe={recipe} key={recipe.slug} />
    ))}
  </div>
)

export { Loading, RecipeGrid }
