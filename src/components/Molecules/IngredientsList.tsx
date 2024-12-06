'use client'

import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Ingredient } from '@/types/recipe'

interface IngredientsListProps {
  ingredients: Ingredient[]
  defaultPersons: number
}

export default function IngredientsList({
  ingredients,
  defaultPersons,
}: IngredientsListProps) {
  const [persons, setPersons] = useState(defaultPersons)

  const calculateQuantity = (quantity: number | null) => {
    if (quantity === null) return ''
    const ratio = persons / defaultPersons
    return quantity * ratio
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Label htmlFor="persons" className="text-lg font-semibold">
          Nombre de personnes :
        </Label>
        <Select
          value={persons.toString()}
          onValueChange={(value) => setPersons(parseInt(value))}
        >
          <SelectTrigger className="w-20">
            <SelectValue placeholder="Personnes" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ul className="space-y-2">
        {ingredients.map((ingredient) => (
          <li key={ingredient.name} className="flex items-center gap-2">
            <span className="font-medium">
              {`${calculateQuantity(ingredient.quantity)} ${ingredient.unit ? ingredient.unit : ''}`}
            </span>
            {ingredient.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
