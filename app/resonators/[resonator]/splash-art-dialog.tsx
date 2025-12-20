import fs from "fs"
import path from "path"

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
}

export default function SplashArtDialog({ resonator }: SplashArtDialogProps) {
  const assets = getResonatorAssets(resonator)

  const splashArtPath = path.join(process.cwd(), "public", assets.splashArt.slice(1))
  const hasSplashArt = fs.existsSync(splashArtPath)

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