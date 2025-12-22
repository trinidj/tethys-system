"use client"

import { Search } from "lucide-react"

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon
} from "@/components/ui/input-group"

import FilterDialog from "@/app/resonators/filter-dialog"
import { ResonatorCard } from "@/app/resonators/resonator-card"
import data from "@/data/resonators/index.json"
import type { Resonator } from "@/types/resonator"
import { useResonatorFilters } from "@/hooks/use-resonator-filter"

export default function ResonatorsPage() {
  const resonators = (data.resonators as Resonator[]).flatMap(r => {
    if (r.variants && r.variants.length > 0) {
      return r.variants.map(v => ({ ...r, ...v }))
    }
    return r
  })
  const { searchQuery, setSearchQuery, filters, setFilters, filteredResonators } = useResonatorFilters(resonators)

  return (
    <div className="min-h-screen flex flex-col gap-6">
      <section className="container flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">Resonators</h1>
          <p className="text-sm text-muted-foreground sm:text-base md:text-lg">Browse all Resonators in Wuthering Waves</p>
        </div>

        <div className="flex gap-2">
          <InputGroup>
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search Resonators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>

          <FilterDialog value={filters} onApply={setFilters} />
        </div>
      </section>

      <section className="container">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {filteredResonators.map((resonator) => (
            <ResonatorCard key={resonator.id} resonator={resonator} />
          ))}

          {filteredResonators.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No resonators found
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
