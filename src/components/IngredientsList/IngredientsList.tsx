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
import { IngredientsListProps } from './types'

export default function IngredientsList({
  ingredients,
  defaultPersons,
}: IngredientsListProps) {
  const [persons, setPersons] = useState(defaultPersons)

  const calculateQuantity = (quantity: number | null) => {
    if (quantity === null) return ''
    return (quantity * persons) / defaultPersons
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
            {[...Array(8)].map((_, i) => (
              <SelectItem key={i + 1} value={(i + 1).toString()}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ul className="space-y-2">
        {ingredients.map(({ name, quantity, unit }) => (
          <li key={name} className="flex items-center gap-2">
            <span className="font-medium">
              {`${calculateQuantity(quantity)} ${unit || ''}`}
            </span>
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
}
