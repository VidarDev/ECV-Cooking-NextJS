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

  const renderFilterButton = (
    type: 'types' | 'licenses',
    value: string,
    bgColor: string,
    textColor: string,
    borderColor: string,
  ) => (
    <button
      key={value}
      onClick={() => removeFilter(type, value)}
      className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold ${bgColor} ${textColor} border-2 ${borderColor}`}
    >
      {value}
      <X className="ml-2 h-4 w-4" />
    </button>
  )

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {selectedTypes.map((type) =>
          renderFilterButton(
            'types',
            type,
            'bg-blue-100',
            'text-blue-800',
            'border-blue-800',
          ),
        )}
        {selectedLicenses.map((license) =>
          renderFilterButton(
            'licenses',
            license,
            'bg-green-100',
            'text-green-800',
            'border-green-800',
          ),
        )}
      </div>
    </div>
  )
}
