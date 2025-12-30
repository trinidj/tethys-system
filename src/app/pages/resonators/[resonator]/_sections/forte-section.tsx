"use client"

import { Resonator, ForteAscensionMaterials } from "@/types/resonator";
import { getForteAssets } from "@/utils/forte-assets";
import { getMaterialAssets } from "@/utils/development-material-assets";
import { getAttributeColor, getDevelopmentMaterialRarityColor } from "@/lib/color-utils";
import Image from "next/image";
import parse from "html-react-parser";
import { motion } from "framer-motion";
import { Forte as ForteData } from "@/types/forte";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";

interface ForteSectionProps {
  resonator: Resonator
  forteAscensionMaterials: ForteAscensionMaterials[]
  forte: Record<string, ForteData> | null
}

export function Forte({ resonator, forteAscensionMaterials, forte }: ForteSectionProps) {
  const assets = getForteAssets(resonator)
  const attributeColor = getAttributeColor(resonator.attribute)

  const totalMaterials = forteAscensionMaterials.flatMap((phase) => 
    phase.materials.map((material) => ({
      ...material
    }))
  )

  const activeForteSkills = [
    "normalAttack",
    "resonanceSkill",
    "forteCircuit",
    "resonanceLiberation",
    "introSkill",
    "outroSkill",
    "tuneBreak"
  ] as const;

  const inherentForteSkills = [
    "inheritSkill1", 
    "inheritSkill2"
  ] as const;

  return (
    <section id="forte" className="flex flex-col gap-6">
      <header>
        <h2 className="font-bold text-3xl">Forte</h2>
      </header>

      <Card className="p-6">
        <CardContent className="px-0 flex flex-col gap-6">
          {/* Forte Skills */}
          <Tabs defaultValue="normalAttack" className="w-full gap-6">
            <TabsList className="p-0 bg-transparent h-auto flex-wrap justify-center gap-3 md:gap-4 lg:gap-6">
              {activeForteSkills.map((key) => {
                const skillData = forte?.[key];
                if (!skillData) return null;

                return (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="
                      data-[state=active]:shadow-[0_0_15px_var(--glow-color)] data-[state=active]:border-(--glow-color) cursor-pointer border-transparent border-2 rounded-xl p-0 relative transition-all duration-300"
                    style={{
                      "--glow-color": `var(--${attributeColor})`,
                      borderColor: `var(--${attributeColor})`
                    } as React.CSSProperties}
                  >
                    <Image
                      src={assets[key]}
                      alt={skillData.name}
                      className="object-contain p-1"
                      width={48}
                      height={48}
                    />
                  </TabsTrigger>
                )
              })}
            </TabsList>

            <Separator />

            {activeForteSkills.map((key) => {
              const skillData = forte?.[key]
              if (!skillData) return null;

              return (
                <TabsContent key={key} value={key}>
                  <motion.div 
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <header className="flex items-center gap-4">
                      <div 
                        className="border-2 flex items-center justify-center rounded-xl"
                        style={{
                          borderColor: `var(--${attributeColor})`,
                        }}
                      >
                        <Image
                          src={assets[key]}
                          alt={skillData.name}
                          className="object-contain p-1"
                          width={48}
                          height={48}
                        />
                      </div>

                      <div>
                        <h2 className="font-semibold text-xl">{skillData.name}</h2>
                        <span className="text-muted-foreground font-medium text-sm">{skillData.type}</span>
                      </div>
                    </header>

                    <div 
                      className="description"
                      style={{ "--attribute-glow": "var(--rarity-5)" } as React.CSSProperties}
                    >
                      {parse(skillData.description)}
                    </div>
                  </motion.div>
                </TabsContent>
              )
            })}

            <Card className="p-6 border-0 bg-muted shadow-none">
              <CardHeader className="px-0">
                <CardTitle className="font-semibold text-xl">Ascension</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-11">
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

            <Separator />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {inherentForteSkills.map((key) => {
                const skillData = forte?.[key]
                if (!skillData) return null;

                return (
                  <Card key={key} className="flex flex-col gap-4 bg-muted border-0 shadow-none">
                    <CardHeader className="flex gap-4">
                      <div 
                        className="border-2 flex items-center justify-center rounded-xl"
                        style={{
                          borderColor: `var(--${attributeColor})`,
                        }}
                      >
                        <Image
                          src={assets[key]}
                          alt={skillData.name}
                          className="object-contain p-1"
                          width={48}
                          height={48}
                        />
                      </div>

                      <div>
                        <CardTitle className="font-semibold text-xl">{skillData.name}</CardTitle>
                        <CardDescription className="text-muted-foreground font-medium text-sm">{skillData.type}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="forte-description"
                        style={{ "--attribute-glow": "var(--rarity-5)" } as React.CSSProperties}
                      >
                        {parse(skillData.description)}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}