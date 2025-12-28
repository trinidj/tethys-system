"use client"

import { Search } from "lucide-react"
import dynamic from "next/dynamic"

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon
} from "@/components/ui/input-group"

import { WeaponCard } from "@/app/weapons/weapon-card"
import data from "@/data/weapons/index.json"
import type { Weapon } from "@/types/weapon"
import { useWeaponFilters } from "@/hooks/use-weapon-filter"

export default function WeaponsPage() {
  const weapons = (data.weapons as Weapon[])

  const { searchQuery, setSearchQuery, filters, setFilters, filteredWeapons } = useWeaponFilters(weapons)
  const WeaponFilterDialog = dynamic(() => import("./weapon-filter-dialog"), {
    ssr: false
  })

  return (
    <div className="min-h-screen flex flex-col gap-4 md:gap-6">
      <section className="flex flex-col gap-3 md:gap-4 px-2 sm:px-0">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">Weapons</h1>
          <p className="text-sm text-muted-foreground sm:text-base md:text-lg">Browse all Weapons in Wuthering Waves</p>
        </div>

        <div className="flex gap-2">
          <InputGroup>
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput 
              placeholder="Search Weapons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>

          <WeaponFilterDialog value={filters} onApply={setFilters} />
        </div>
      </section>

      <section className="container">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          {filteredWeapons.map((weapon) => (
            <WeaponCard key={weapon.id} weapon={weapon} />
          ))}

          {filteredWeapons.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No Weapons found
            </div>
          )}
        </div>
      </section>
    </div>
  )
}