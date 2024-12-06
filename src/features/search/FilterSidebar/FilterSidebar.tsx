'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'
import { FilterSidebarProps } from './types'
import { cn } from '@/lib/utils'

const FilterSection = ({
  title,
  items,
  selectedItems,
  updateFilters,
  filterType,
}: {
  title: string
  items: string[]
  selectedItems: string[]
  updateFilters: (type: 'types' | 'licenses', value: string) => void
  filterType: 'types' | 'licenses'
}) => (
  <section className="mb-6">
    <h3 className="font-semibold text-lg text-custom mb-4">{title}</h3>
    <div className="space-y-3">
      {items.map((item) => (
        <label
          key={item}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <Checkbox
            checked={selectedItems.includes(item)}
            onCheckedChange={() => updateFilters(filterType, item)}
          />
          <span className="text-sm">{item}</span>
        </label>
      ))}
    </div>
  </section>
)

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
        <FilterSection
          title="Catégories"
          items={types}
          selectedItems={selectedTypes}
          updateFilters={updateFilters}
          filterType="types"
        />
        <FilterSection
          title="Licenses"
          items={licenses}
          selectedItems={selectedLicenses}
          updateFilters={updateFilters}
          filterType="licenses"
        />
      </div>
    </div>
  )
}
