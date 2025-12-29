"use client"

import Link from "next/link"
import Image from "next/image"

import { Label } from "@/components/ui/label"
import { Weapon } from "@/types/weapon"
import { getWeaponAssets } from "@/utils/weapon-assets"
import { getRarityColor } from "@/lib/color-utils"
import { Badge } from "@/components/ui/badge"

import { Card, CardContent } from "@/components/ui/card"

export function WeaponCard({ weapon }: { weapon: Weapon }) {
  const assets = getWeaponAssets(weapon)
  const rarityColor = getRarityColor(weapon.rarity)

  const CardInner = (
    <Card className="overflow-hidden gap-0 p-0">
      <CardContent className="px-0">
        <div className="relative h-32 w-full flex justify-center items-center">
          <Image 
            src={assets.icon}
            alt={weapon.name}
            width={256}
            height={256}
            sizes="(max-width: 640px) 50vw, (max-width: 1024) 25vw, 150px"
            className="object-contain overflow-hidden hover:scale-110 transition-transform will-change-transform duration-300"
          />

          {weapon.isNew && (
            <div className="absolute right-1 top-1 transform-gpu">
              <Badge className="bg-red-600/80 text-xs">
                New
              </Badge>
            </div>
          )}
        </div>

        <div
          className="bg-accent relative h-6 w-full flex items-center justify-center border-t-2 px-1.5 overflow-hidden"
          style={{
            borderColor: `var(--${rarityColor})`,
            boxShadow: `0 -4px 35px -2px var(--${rarityColor})`
          }}
        >
          <span className="text-sm font-semibold truncate block w-full text-center">{weapon.name}</span>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Link key={weapon.id} href={`/weapons/${weapon.id}`}>
      {CardInner}
    </Link>
  )
}