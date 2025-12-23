import { useState, useMemo, useDeferredValue } from "react"
import { Weapon } from "@/types/weapon"
import { WeaponFilters } from "@/app/weapons/weapon-filter-dialog"

export function useWeaponFilters(weapons: Weapon[]) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<WeaponFilters>({
    rarities: [],
    weaponTypes: [],
  })

  const deferredQuery = useDeferredValue(searchQuery)
  const deferredFilters = useDeferredValue(filters)

  const filteredWeapons = useMemo(() => {
    return weapons.filter((weapon) => {
      const matchesSearch = weapon.name.toLowerCase().includes(deferredQuery.toLowerCase())
      const matchesRarity = deferredFilters.rarities.length === 0 || deferredFilters.rarities.includes(String(weapon.rarity))
      
      const matchesWeaponType = deferredFilters.weaponTypes.length === 0 ||
        deferredFilters.weaponTypes.includes(weapon.weaponType.toLowerCase())

      return matchesSearch && matchesRarity && matchesWeaponType
    })
  }, [weapons, deferredQuery, deferredFilters])

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredWeapons,
  }
}