import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle
} from "@/components/ui/item"

import { Ellipsis } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

import { Resonator } from "@/types/resonator"
import { getCombatRoles } from "@/utils/resonator-assets"

interface CombatRolesDialogProps {
  resonator: Resonator
}

export default function CombatRolesDialog({ resonator }: CombatRolesDialogProps) {
  const combatRoles = getCombatRoles(resonator)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Ellipsis />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Combat Roles</DialogTitle>
        </DialogHeader>

        {combatRoles.length > 0 && (
          <div className="flex flex-col gap-4">
            {combatRoles.map((role) => (
              <Item key={role.name} variant="outline" className="bg-accent">
                <ItemMedia className="border-2 border-primary rounded-xl p-1">
                  <Image
                    src={role.icon}
                    alt={role.name}
                    width={35}
                    height={35}
                    quality={100}
                  />
                </ItemMedia>

                <ItemContent>
                  <ItemTitle className="text-base">{role.name}</ItemTitle>
                  <ItemDescription className="text-wrap">{role.description}</ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}