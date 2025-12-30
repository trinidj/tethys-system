"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import type { AscensionMaterials, Resonator } from "@/types/resonator"
import { getResonatorAssets, getAttributeIcon, getCombatRoles } from "@/utils/resonator-assets"
import { getAttributeColor, getRarityColor, getDevelopmentMaterialRarityColor } from "@/lib/color-utils"
import Image from "next/image"
import StatCard from "../_components/stat-card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { getMaterialAssets } from "@/utils/development-material-assets"
import { motion, AnimatePresence } from "motion/react"

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

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface ProfileSectionProps {
  resonator: Resonator
  hasSplashArt: boolean
  resonatorAscensionMaterials: AscensionMaterials[]
}

const CombatRolesDialog = dynamic(() => import("../_components/combat-roles-dialog"), {
  ssr: false
})
const DetailsDialog = dynamic(() => import("../_components/details-dialog"), {
  ssr: false
})

export default function Profile({ resonator, hasSplashArt, resonatorAscensionMaterials }: ProfileSectionProps) {
  const [gender, setGender] = useState<"male" | "female">("female")
  const assets = getResonatorAssets(resonator, gender)
  const resonatorRarityColor = getRarityColor(resonator.rarity)
  const attributeIcon = getAttributeIcon(resonator.attribute)
  const attributeColor = getAttributeColor(resonator.attribute)
  const combatRoles = getCombatRoles(resonator)

  const totalMaterials = resonatorAscensionMaterials.flatMap((phase) =>
    phase.materials.map((material) => ({
      ...material,
    }))
  )

  const isRover = resonator.id.startsWith("rover")

  return (
    <section id="profile" className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-14 scroll-mt-8">
      {/* Sprite */}
      <Card className="relative h-[500px] sm:h-[600px] lg:h-[675px] w-full lg:w-[350px] xl:w-[400px] p-0 overflow-hidden shadow-none bg-linear-to-t from-background to-card mx-auto lg:mx-0">
        <CardContent className="h-full p-0">
          <div className="flex flex-col h-full">
            <div className="flex-1 flex overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={gender}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={assets.sprite}
                    alt={resonator.name}
                    width={696}
                    height={960}
                    priority
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              </AnimatePresence>

              {isRover && (
                <div className="absolute top-2 left-2">
                  <Tabs value={gender} onValueChange={(value) => setGender(value as "male" | "female")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="male">Male</TabsTrigger>
                      <TabsTrigger value="female">Female</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              )}
            </div>

            <div
              className="bg-card flex justify-center h-14 items-center border-t-2"
              style={{
                borderColor: `var(--${resonatorRarityColor})`,
                boxShadow: `0 -4px 100px -2px var(--${resonatorRarityColor})`
              }}
            >
              <DetailsDialog resonator={resonator} hasSplashArt={hasSplashArt} gender={gender} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-1 flex-col gap-6">
        <header className="flex flex-col items-center gap-3 md:gap-4 lg:flex-row lg:justify-between">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center">
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
                className="size-12 md:size-15"
              />
            </div>

            {!isRover && (
              <div className="text-center sm:text-left">
                <h1 className="font-bold text-2xl md:text-3xl">{resonator.name}</h1>
                <span className="text-muted-foreground font-medium text-xs md:text-sm">{resonator.description}</span>
              </div>
            )}

            {isRover && (
              <div className="text-center flex items-center sm:text-left">
                <h1 className="font-bold text-2xl md:text-3xl">{resonator.name}</h1>
              </div>
            )} 
          </div>

          <div className="flex gap-2 items-center justify-center">
            <Badge variant="secondary" className="h-8">
              <Image
                src={`/assets/rarity/${resonator.rarity}_star.png`}
                alt={`${resonator.rarity}`}
                width={90}
                height={40}
              />
            </Badge>

            <Badge variant="secondary" className="h-8">
              <Image
                src={assets.weaponType}
                alt={assets.weaponType}
                width={20}
                height={40}
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

        <Card className="p-6 h-full">
          <CardHeader className="px-0">
            <CardTitle className="text-xl">Ascension</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
              {totalMaterials.map((material) => (
                <Card key={material.item.name} className="p-0 overflow-hidden">
                  <CardContent className="px-0">
                    <div className="flex items-center justify-center">
                      <Image
                        src={`${getMaterialAssets(material.item.name, material.item.type)}`}
                        alt={material.item.name}
                        width={74}
                        height={74}
                        quality={100}
                        className="scale-80"
                      />
                    </div>

                    <div 
                      className="bg-black/20 to-card h-6 flex items-center justify-center border-t-2"
                      style={{
                        borderColor: `var(--${getDevelopmentMaterialRarityColor(material.item.rarity)})`,
                        boxShadow: `0 -4px 12px -2px var(--${getDevelopmentMaterialRarityColor(material.item.rarity)})`
                      }}
                    >
                      <CardTitle>{material.amount}</CardTitle>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {totalMaterials.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                Ascension Materials Unavailable
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section >
  )
}
