'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { X } from 'lucide-react'

import { ActiveFiltersProps } from './types'

export function ActiveFilters({
  selectedTypes,
  selectedLicenses,
}: ActiveFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const removeFilter = (type: 'types' | 'licenses', value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const currentValues = params.get(type)?.split(',') || []
    const newValues = currentValues.filter((v) => v !== value)

    if (newValues.length > 0) {
      params.set(type, newValues.join(','))
    } else {
      params.delete(type)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  if (selectedTypes.length === 0 && selectedLicenses.length === 0) {
    return null
  }

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {selectedTypes.map((type) => (
          <button
            key={type}
            onClick={() => removeFilter('types', type)}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
          >
            {type}
            <X className="ml-2 h-4 w-4" />
          </button>
        ))}
        {selectedLicenses.map((license) => (
          <button
            key={license}
            onClick={() => removeFilter('licenses', license)}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
          >
            {license}
            <X className="ml-2 h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  )
}
