import { Weapon } from "@/types/weapon";
import { getWeaponRefinementSkill } from "../_lib/data";
import { parseWeaponRefinementSkill } from "../_lib/data";
import parse from "html-react-parser"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";

interface RefinementSkillProps {
  weapon: Weapon
}

export function RefinementSkillDialog({ weapon }: RefinementSkillProps) {
  const refinementSkill = getWeaponRefinementSkill(weapon)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Refinement Skill</Button>
      </DialogTrigger>
      <DialogContent className="p-4 border-4 gap-2">
        <DialogHeader>
          <DialogTitle className="text-xl">{refinementSkill?.name}</DialogTitle>
        </DialogHeader>

        <div className="description">
          {parse(parseWeaponRefinementSkill(refinementSkill?.description ?? ""))}
        </div>
      </DialogContent>
    </Dialog>
  )
}