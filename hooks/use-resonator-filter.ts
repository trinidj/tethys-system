import { useState, useMemo, useDeferredValue } from "react" // Added useDeferredValue
import { Resonator } from "@/types/resonator"
import { ResonatorFilters } from "@/src/app/pages/resonators/resonator-filter-dialog"

export function useResonatorFilters(resonators: Resonator[]) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<ResonatorFilters>({
    rarities: [],
    attributes: [],
    weaponTypes: [],
  })

  const deferredQuery = useDeferredValue(searchQuery)
  const deferredFilters = useDeferredValue(filters)

  const filteredResonators = useMemo(() => {
    return resonators.filter((resonator) => {
      const matchesSearch = resonator.name.toLowerCase().includes(deferredQuery.toLowerCase())
      const matchesRarity = deferredFilters.rarities.length === 0 || deferredFilters.rarities.includes(String(resonator.rarity))
      const matchesAttribute = deferredFilters.attributes.length === 0 || deferredFilters.attributes.includes(resonator.attribute.toLowerCase())
      
      const matchesWeaponType = deferredFilters.weaponTypes.length === 0 ||
        deferredFilters.weaponTypes.some((weapon) => {
          const normalized = weapon.endsWith("s") ? weapon.slice(0, -1) : weapon
          return normalized === resonator.weaponType.toLowerCase()
        })

      return matchesSearch && matchesRarity && matchesAttribute && matchesWeaponType
    })
  }, [resonators, deferredQuery, deferredFilters])
  return { 
    searchQuery, 
    setSearchQuery, 
    filters, 
    setFilters, 
    filteredResonators,
  }
}