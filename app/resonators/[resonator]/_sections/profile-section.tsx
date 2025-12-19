import { Resonator } from "@/types/resonator"
import { getResonatorAssets } from "@/utils/resonator-assets"
import { getRarityColor } from "@/lib/color-utils"
import Image from "next/image"
import SplashArtDialog from "../splash-art-dialog"

import {
  Card,
  CardContent
} from "@/components/ui/card"

interface ProfileSectionProps {
  resonator: Resonator
}

export default function Profile({ resonator }: ProfileSectionProps) {
  const assets = getResonatorAssets(resonator)
  const rarityColor = getRarityColor(resonator.rarity)

  return (
    <section id="profile" className="flex lg:flex-row">
      {/* Sprite */}
      <div>
        <Card className="p-0 gap-0 overflow-hidden border-transparent">
          <CardContent className="relative p-0">
            <Image
              src={assets.sprite}
              alt={resonator.name}
              width={400}
              height={600}
              quality={100}
              className="object-cover"
            />

            <div
              className="h-15 bg-accent flex items-center justify-center border-t-2"
              style={{
                borderColor: `var(--${rarityColor})`,
                boxShadow: `0 -4px 80px -2px var(--${rarityColor})`
              }}
            >
              <SplashArtDialog resonator={resonator} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div>

      </div>
    </section>
  )
}