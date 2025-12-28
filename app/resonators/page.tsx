"use client"

import { Search } from "lucide-react"
import dynamic from "next/dynamic"

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon
} from "@/components/ui/input-group"

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
  const ResonatorFilterDialog = dynamic(() => import("./resonator-filter-dialog"), {
    ssr: false
  })

  return (
    <div className="min-h-screen flex flex-col gap-4 md:gap-6">
      <section className="flex flex-col gap-3 md:gap-4 px-2 sm:px-0">
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

          <ResonatorFilterDialog value={filters} onApply={setFilters} />
        </div>
      </section>

      <section className="container">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
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
