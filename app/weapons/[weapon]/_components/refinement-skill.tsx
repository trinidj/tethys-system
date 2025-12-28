import type { RefinementSkill } from "@/types/weapon";
import { parseWeaponRefinementSkill } from "../_lib/data";
import parse from "html-react-parser"

import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";

interface RefinementSkillProps {
  refinementSkill: RefinementSkill
}

export function RefinementSkill({ refinementSkill }: RefinementSkillProps) {

  return (
    <Card className="p-6 bg-muted border-0">
      <CardHeader className="px-0 gap-0">
        <CardTitle className="text-semibold text-xl">{refinementSkill?.name}</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="description">
          {parse(parseWeaponRefinementSkill(refinementSkill?.description ?? ""))}
        </div>
      </CardContent>
    </Card>
  )
}