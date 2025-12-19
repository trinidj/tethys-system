"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon
} from "@/components/ui/input-group"

import FilterDialog from "@/components/filter-dialog"
import Image from "next/image"
import Link from "next/link"

import data from "@/data/resonators/index.json"
import type { Resonator } from "@/types/resonator"
import { getResonatorAssets } from "@/utils/resonator-assets"
import { getRarityColor } from "@/lib/color-utils"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function ResonatorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const resonators = data.resonators as Resonator[]

  const filteredResonators = resonators.filter((resonator) => {
    return resonator.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

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

          <FilterDialog />
        </div>
      </section>

      <section className="container">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {filteredResonators.map((resonator) => {
            const assets = getResonatorAssets(resonator)
            const rarityColor = getRarityColor(resonator.rarity)

            return (
              <Link key={resonator.id} href={`/resonators/${resonator.id}`}>
                <Card className="overflow-hidden gap-0 p-0">
                  <CardContent className="px-0">
                    <div className="relative h-32 w-full flex justify-center items-center">
                      <Image 
                        src={assets.icon} 
                        alt={resonator.name} 
                        width={256}
                        height={256}
                        quality={100}
                        className="object-contain overflow-hidden hover:scale-110 transition-transform will-change-transform duration-300"
                      />
                    </div>
                    <div 
                      className="bg-accent relative h-8 w-full flex items-center justify-center border-t-2 " 
                      style={{ 
                        borderColor: `var(--${rarityColor})`,
                        boxShadow: `0 -4px 35px -2px var(--${rarityColor})`
                      }}
                    >
                      <Label className="font-semibold">{resonator.name}</Label>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}

          {filteredResonators.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No resonators found matching &quot;{searchQuery}&quot;
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
