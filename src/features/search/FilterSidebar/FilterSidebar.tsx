'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import { Checkbox } from '@/components/ui/checkbox'
import { FilterSidebarProps } from './types'
import { cn } from '@/lib/utils'

export function FilterSidebar({
  types,
  licenses,
  selectedTypes,
  selectedLicenses,
  className,
}: FilterSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateFilters = (type: 'types' | 'licenses', value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const currentValues = params.get(type)?.split(',') || []

    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]

    if (newValues.length > 0) {
      params.set(type, newValues.join(','))
    } else {
      params.delete(type)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={cn('max-w-[90vw] flex-shrink-0', className)}>
      <div className="bg-white rounded-lg shadow p-6 border-2 border-black justify-between flex gap-6">
        <section className="mb-6">
          <h3 className="font-semibold text-lg text-custom mb-4">Catégories</h3>
          <div className="space-y-3">
            {types.map((type) => (
              <label
                key={type}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <Checkbox
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => updateFilters('types', type)}
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-semibold text-custom text-lg mb-4">Licenses</h3>
          <div className="space-y-3">
            {licenses.map((license) => (
              <label
                key={license}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <Checkbox
                  checked={selectedLicenses.includes(license)}
                  onCheckedChange={() => updateFilters('licenses', license)}
                />
                <span className="text-sm">{license}</span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
