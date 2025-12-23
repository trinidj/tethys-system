import { Resonator } from "@/types/resonator";
import { getForteAssets } from "@/utils/resonator-assets";
import { getResonatorForte } from "../_lib/data";
import { getAttributeColor } from "@/lib/color-utils";
import { parseForteMarkdown } from "../_lib/data";
import Image from "next/image";
import parse from "html-react-parser";

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
}

export function Forte({ resonator }: ForteSectionProps) {
  const assets = getForteAssets(resonator)
  const forte = getResonatorForte(resonator)
  const attributeColor = getAttributeColor(resonator.attribute)

  const activeForteSkills = [
    "normalAttack",
    "resonanceSkill",
    "forteCircuit",
    "resonanceLiberation",
    "introSkill",
    "outroSkill"
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
        <CardContent className="px-0">
          <Tabs defaultValue="normalAttack" className="w-full gap-6">
            <TabsList className="bg-transparent h-auto flex-wrap justify-center gap-6">
              {activeForteSkills.map((key) => {
                const skillData = forte?.[key];
                if (!skillData) return null;

                return (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="
                      data-[state=active]:shadow-[0_0_15px_var(--glow-color)] data-[state=active]:border-(--glow-color) border-transparent border-2 rounded-xl p-0 relative transition-all duration-300"
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
                  <div className="flex flex-col gap-4">
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
                      className="forte-description"
                      style={{ "--attribute-glow": "var(--rarity-5)" } as React.CSSProperties}
                    >
                      {parse(parseForteMarkdown(skillData.description))}
                    </div>
                  </div>
                </TabsContent>
              )
            })}
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              {inherentForteSkills.map((key) => {
                const skillData = forte?.[key]
                if (!skillData) return null;

                return (
                  <Card key={key} className="flex flex-col gap-4 bg-accent">
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
                        {parse(parseForteMarkdown(skillData.description))}
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