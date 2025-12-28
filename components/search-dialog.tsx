"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

import resonatorsIndex from "@/data/resonators/index.json"
import weaponsIndex from "@/data/weapons/index.json"
import { getResonatorAssets } from "@/utils/resonator-assets"
import { getWeaponAssets } from "@/utils/weapon-assets"
import type { Resonator } from "@/types/resonator"
import type { Weapon } from "@/types/weapon"

type SearchResult = 
  | { type: "resonator"; data: Resonator }
  | { type: "weapon"; data: Weapon }

export default function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (!open) {
      const id = setTimeout(() => setQuery(""), 0)
      return () => clearTimeout(id)
    }
  }, [open])

  const resonators = useMemo(() => {
    return resonatorsIndex.resonators as Resonator[]
  }, [])

  const weapons = useMemo(() => {
    return weaponsIndex.weapons as Weapon[]
  }, [])

  const filteredResults = useMemo(() => {
    if (!query.trim()) return []
    
    const lowerQuery = query.toLowerCase()
    
    const matchedResonators: SearchResult[] = resonators
      .filter((resonator) => resonator.name.toLowerCase().includes(lowerQuery))
      .map((resonator) => ({ type: "resonator" as const, data: resonator }))
    
    const matchedWeapons: SearchResult[] = weapons
      .filter((weapon) => weapon.name.toLowerCase().includes(lowerQuery))
      .map((weapon) => ({ type: "weapon" as const, data: weapon }))
    
    return [...matchedResonators, ...matchedWeapons]
  }, [query, resonators, weapons])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="shrink-0 cursor-pointer"
          aria-label="Search"
          title="Search"
        >
          <Search />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4 border-4 gap-0">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <InputGroup className="mb-4">
          <InputGroupInput 
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-lg"
            autoFocus
          />
          <InputGroupAddon>
            <Search className="h-4 w-4 text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>

        <ScrollArea className="h-[400px] pr-4">
          <div className="flex flex-col gap-2">
            {query.trim() && filteredResults.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                No results found.
              </div>
            )}

            {filteredResults.map((result) => {
              if (result.type === "resonator") {
                const resonator = result.data
                const assets = getResonatorAssets(resonator)
                
                return (
                  <Link
                    key={`resonator-${resonator.id}`}
                    href={`/resonators/${resonator.id}`}
                    onClick={() => setOpen(false)}
                  >
                    <Item className="hover:bg-accent/50">
                      <ItemMedia>
                        <div className="overflow-hidden border-2 border-primary rounded-xl">
                          <Image 
                            src={assets.icon}
                            alt={resonator.name}
                            width={64}
                            height={64}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024) 25vw, 150px"
                          />
                        </div>
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>{resonator.name}</ItemTitle>
                        <ItemDescription>{resonator.weaponType} • {resonator.rarity}★</ItemDescription>
                      </ItemContent>
                    </Item>
                  </Link>
                )
              } else {
                const weapon = result.data
                const assets = getWeaponAssets(weapon)
                
                return (
                  <Link
                    key={`weapon-${weapon.id}`}
                    href={`/weapons/${weapon.id}`}
                    onClick={() => setOpen(false)}
                  >
                    <Item className="hover:bg-accent/50">
                      <ItemMedia>
                        <div className="overflow-hidden border-2 border-primary rounded-xl">
                          <Image 
                            src={assets.icon}
                            alt={weapon.name}
                            width={64}
                            height={64}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024) 25vw, 150px"
                          />
                        </div>
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>{weapon.name}</ItemTitle>
                        <ItemDescription>{weapon.weaponType} • {weapon.rarity}★</ItemDescription>
                      </ItemContent>
                    </Item>
                  </Link>
                )
              }
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
