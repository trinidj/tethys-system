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

interface DetailsDialogProps {
  resonator: Resonator
  hasSplashArt: boolean
  gender?: "male" | "female"
}

export default function DetailsDialog({ resonator, hasSplashArt, gender }: DetailsDialogProps) {
  const assets = getResonatorAssets(resonator, gender)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={!hasSplashArt}>
          {hasSplashArt ? "View Details" : "Details Unavailable"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] lg:max-w-fit gap-0 border-4">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
    
        <Image
          src={assets.splashArt}
          alt={resonator.name}
          width={1000}
          height={1000}
          className="max-h-[55vh] w-full sm:w-auto object-contain"
        />
      </DialogContent>
    </Dialog>
  )
}