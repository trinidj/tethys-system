import { Resonator } from "@/types/resonator";
import { getResonanceChain, parseForteMarkdown } from "../_lib/data";
import { getAttributeColor } from "@/lib/color-utils";
import Image from "next/image";
import parse from "html-react-parser";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getResonanceChainAssets } from "@/utils/resonance-chain-assets";

interface ResonanceChainProps {
  resonator: Resonator
}

export function ResonanceChain({ resonator }: ResonanceChainProps) {
  const assets = getResonanceChainAssets(resonator) as Record<string, string>
  const resonanceChain = getResonanceChain(resonator)
  const attributeColor = getAttributeColor(resonator.attribute)

  return (
    <section id="resonance-chain" className="flex flex-col gap-6 scroll-mt-8">
      <header>
        <h2 className="font-bold text-3xl">Resonance Chain</h2>
      </header>

      <Card className="p-6">
        <CardContent className="px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resonanceChain.map((node, index) => {
              const assetKey = `sequenceNode${index + 1}`
              const assetUrl = assets[assetKey]

              return (
                <Card key={index} className="flex flex-col gap-4 bg-muted border-0 shadow-none">
                  <CardHeader className="flex gap-4">
                    <div 
                      className="border-2 flex items-center justify-center rounded-xl shrink-0"
                      style={{
                        borderColor: `var(--${attributeColor})`,
                      }}
                    >
                      {assetUrl && (
                        <Image
                          src={assetUrl}
                          alt={node.name}
                          className="object-contain p-1"
                          width={48}
                          height={48}
                        />
                      )}
                    </div>

                    <div>
                      <CardTitle className="font-semibold text-xl">{node.name}</CardTitle>
                      <CardDescription className="text-muted-foreground font-medium text-sm">Sequence Node {index + 1}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="forte-description opacity-80"
                      style={{ "--attribute-glow": "var(--rarity-5)" } as React.CSSProperties}
                    >
                      {node.description && parse(parseForteMarkdown(node.description))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}