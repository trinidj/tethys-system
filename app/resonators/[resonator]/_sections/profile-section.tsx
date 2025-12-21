import type { AscensionMaterials, Resonator } from "@/types/resonator"
import { getResonatorAssets, getAttributeIcon, getCombatRoles } from "@/utils/resonator-assets"
import { getAttributeColor } from "@/lib/color-utils"
import { getRarityColor } from "@/lib/color-utils"
import Image from "next/image"
import SplashArtDialog from "../splash-art-dialog"
import CombatRolesDialog from "../combat-roles-dialog"
import StatCard from "../stat-card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { getMaterialAssets } from "@/utils/resonator-assets"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ProfileSectionProps {
  resonator: Resonator
  hasSplashArt: boolean
  ascensionMaterials: AscensionMaterials[]
}

export default function Profile({ resonator, hasSplashArt, ascensionMaterials }: ProfileSectionProps) {
  const assets = getResonatorAssets(resonator)
  const rarityColor = getRarityColor(resonator.rarity)
  const attributeIcon = getAttributeIcon(resonator.attribute)
  const attributeColor = getAttributeColor(resonator.attribute)
  const combatRoles = getCombatRoles(resonator)
  const totalMaterials = ascensionMaterials.flatMap((phase) =>
    phase.materials.map((material) => ({
      ...material,
    }))
  )

  return (
    <section id="profile" className="flex h-[675px] flex-col lg:flex-row gap-8">
      {/* Sprite */}
      <Card className="h-full w-full lg:w-[400px] p-0 overflow-hidden shadow-none bg-linear-to-t from-background to-card/100">
        <CardContent className="h-full p-0">
          <div className="flex flex-col h-full">
            <div className="flex-1 flex overflow-hidden">
              <Image
                src={assets.sprite}
                alt={resonator.name}
                width={696}
                height={960}
                quality={100}
                priority
                className="object-cover w-full h-full"
              />
            </div>

            <div
              className="bg-card flex justify-center h-14 items-center border-t-2"
              style={{
                borderColor: `var(--${rarityColor})`,
                boxShadow: `0 -4px 100px -2px var(--${rarityColor})`
              }}
            >
              <SplashArtDialog resonator={resonator} hasSplashArt={hasSplashArt} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-1 flex-col gap-6">
        <header className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <div className="flex gap-4">
            <div
              className="border-2 flex items-center justify-center rounded-xl"
              style={{
                borderColor: `var(--${attributeColor})`,
              }}
            >
              <Image
                src={attributeIcon}
                alt={resonator.attribute}
                width={128}
                height={128}
                quality={100}
                className="size-15"
              />
            </div>

            <div className="text-center lg:text-left">
              <h1 className="font-bold text-3xl">{resonator.name}</h1>
              <span className="text-muted-foreground font-medium text-sm">{resonator.description}</span>
            </div>
          </div>

          <div className="flex gap-2 items-center justify-center">
            <Badge variant="secondary" className="h-8">
              <Image
                src={`/assets/rarity/${resonator.rarity}_star.png`}
                alt={`${resonator.rarity}`}
                width={90}
                height={40}
                quality={100}
              />
            </Badge>

            <Badge variant="secondary" className="h-8">
              <Image
                src={assets.weaponType}
                alt={assets.weaponType}
                width={20}
                height={40}
                quality={100}
              />
              <Label className="text-sm">{resonator.weaponType}</Label>
            </Badge>
          </div>
        </header>

        <Separator />

        <Card className="p-2">
          <CardContent className="flex flex-col justify-center items-center gap-2 px-0 lg:justify-between lg:flex-row">
            {combatRoles.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {combatRoles.map((role) => (
                  <TooltipProvider key={role.name}>
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <div className="rounded-xl p-1 hover:bg-accent transition-colors">
                          <Image
                            src={role.icon}
                            alt={role.name}
                            width={50}
                            height={50}
                            quality={100}
                            className="size-8.5"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-semibold text-xs">{role.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            )}

            <CombatRolesDialog resonator={resonator} />
          </CardContent>
        </Card>

        <StatCard resonator={resonator} />

        <Card className="p-6">
          <CardHeader className="px-0">
            <CardTitle className="text-xl">Ascension</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="grid grid-cols-7 gap-4">
              {totalMaterials.map((material) => (
                <Card key={material.name} className="p-0 overflow-hidden">
                  <CardContent className="px-0">
                    <div className="flex items-center justify-center">
                      <Image
                        src={`${getMaterialAssets(material.name, material.type)}`}
                        alt={material.name}
                        width={74}
                        height={74}
                        quality={100}
                        className="scale-80"
                      />
                    </div>

                    <div className="bg-accent h-6 flex items-center justify-center border-t-2 border-rarity-5">
                      <CardTitle>{material.amount}</CardTitle>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section >
  )
}
