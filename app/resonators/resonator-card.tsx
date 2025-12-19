import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { Label } from "@/components/ui/label";
import { Resonator } from "@/types/resonator";
import { getResonatorAssets, getAttributeIcon } from "@/utils/resonator-assets";
import { getRarityColor } from "@/lib/color-utils";
import { Badge } from "@/components/ui/badge";

import { 
  Card,
  CardContent, 
} from "@/components/ui/card";

export function ResonatorCard({ resonator }: { resonator: Resonator }) {
  const assets = getResonatorAssets(resonator)
  const rarityColor = getRarityColor(resonator.rarity)

  function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  const hasDetailData = Boolean(
    resonator.stats?.hp &&
    resonator.stats?.atk &&
    resonator.stats?.def
  )

  const CardInner = (
    <Card 
      className={cn(
        "overflow-hidden gap-0 p-0",
        !hasDetailData && "opacity-70 cursor-not-allowed select-none"
      )}
    >  
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

          <div className="absolute top-1 left-1 border-2 border-accent bg-card rounded-full">
            <Image 
              src={`${getAttributeIcon(resonator.attribute)}`}
              alt={resonator.attribute}
              width={28}
              height={28}
              quality={100}
              className="object-contain"
            />
          </div>

          {resonator.isNew && (
            <div className="absolute right-1 top-1 transform-gpu">
              <Badge className="bg-red-600/80 text-xs">
                New
              </Badge>
            </div>
          )}

          {!hasDetailData && (
            <div className="absolute right-1 top-1 transform-gpu">
              <Badge variant="outline" className="bg-background/80 text-xs">
                Unavailable
              </Badge>
            </div>
          )}    
        </div>

        <div 
          className="bg-accent relative h-6 w-full flex items-center justify-center border-t-2 " 
          style={{ 
            borderColor: `var(--${rarityColor})`,
            boxShadow: `0 -4px 35px -2px var(--${rarityColor})`
          }}
        >
          <Label className="font-semibold">{resonator.name}</Label>
        </div>
      </CardContent>
    </Card>
  )

  if (!hasDetailData) {
    return <div className="cursor-not-allowed">{CardInner}</div>;
  }

  return (
    <Link key={resonator.id} href={`/resonators/${resonator.id}`} onClick={ScrollToTop}>
      {CardInner}
    </Link>
  )
}