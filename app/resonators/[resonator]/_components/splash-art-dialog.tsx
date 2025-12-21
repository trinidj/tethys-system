import { Resonator } from "@/types/resonator"
import { getResonatorAssets } from "@/utils/resonator-assets"

import { Button } from "@/components/ui/button"
import Image from "next/image"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface SplashArtDialogProps {
  resonator: Resonator
  hasSplashArt: boolean
}

export default function SplashArtDialog({ resonator, hasSplashArt }: SplashArtDialogProps) {
  const assets = getResonatorAssets(resonator)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {hasSplashArt ? "View Splash Art" : "Splash Art Unavailable"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <Image
          src={assets.splashArt}
          alt={resonator.name}
          width={1000}
          height={1000}
          className="object-contain"
        />
      </DialogContent>
    </Dialog>
  )
}