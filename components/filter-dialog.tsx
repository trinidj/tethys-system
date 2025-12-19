"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Button }from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { 
  FieldGroup, 
  FieldSet, 
  Field, 
  FieldLabel 
} from "@/components/ui/field"

import { Toggle } from "@/components/ui/toggle"
import { ATTRIBUTES } from "@/constants/attributes"
import { RARITIES } from "@/constants/rarities"
import { WEAPON_TYPES } from "@/constants/weapon-types"
import Image from "next/image"
import { getAttributeColor } from "@/lib/color-utils"

export default function FilterDialog() {
  const [selectedRarities, setSelectedRarities] = useState<string[]>([])
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([])
  const [selectedWeaponTypes, setSelectedWeaponTypes] = useState<string[]>([])

  const handleRarityToggle = (value: string, pressed: boolean) => {
    if (pressed) {
      setSelectedRarities((prev) => [...prev, value])
    } else {
      setSelectedRarities((prev) => prev.filter((item) => item !== value))
    }
  }

  const handleAttributeToggle = (value: string, pressed: boolean) => {
    if (pressed) {
      setSelectedAttributes((prev) => [...prev, value])
    } else {
      setSelectedAttributes((prev) => prev.filter((item) => item !== value))
    }
  }

  const handleWeaponTypeToggle = (value: string, pressed: boolean) => {
    if (pressed) {
      setSelectedWeaponTypes((prev) => [...prev, value])
    } else {
      setSelectedWeaponTypes((prev) => prev.filter((item) => item !== value))
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="secondary">
          <Filter />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4 border-4 gap-0">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <form>
          <FieldSet>
            <FieldGroup>
              {/* Rarity Field */}
              <Field>
                <FieldLabel>Rarity</FieldLabel>
                <div className="flex gap-1">
                  {RARITIES.map((rarity) => {
                    const isCurrentActive = selectedRarities.includes(rarity.value);

                    return (
                      <Toggle 
                        key={rarity.value} 
                        value={rarity.value} 
                        variant="outline" 
                        size="lg"
                        pressed={isCurrentActive}
                        onPressedChange={(pressed) => handleRarityToggle(rarity.value, pressed)}
                        style={
                          isCurrentActive ? {
                            borderColor: "var(--primary)"
                          } : {}
                        }
                        className="border-2"
                      >
                        {rarity.label}
                      </Toggle>
                    )
                  })}
                </div>
              </Field>

              {/* Attribute Field */}
              <Field>
                <FieldLabel>Attribute</FieldLabel>
                <div className="flex gap-1">
                  {ATTRIBUTES.map((attribute) => {
                    const isCurrentActive = selectedAttributes.includes(attribute.value);

                    return (
                      <Toggle 
                        key={attribute.value} 
                        value={attribute.value} 
                        variant="outline" 
                        size="lg"
                        pressed={isCurrentActive}
                        onPressedChange={(pressed) => handleAttributeToggle(attribute.value, pressed)}
                        style={
                          isCurrentActive ? {
                            borderColor: `var(--${getAttributeColor(attribute.label)})`,
                            backgroundColor: `${getAttributeColor(attribute.label)}/20` // Optional: adds a slight tint
                          } : {}
                        }
                        className="border-2"
                      >
                        <Image 
                          src={attribute.icon}
                          alt={attribute.label}
                          width={32}
                          height={32}
                          quality={100}
                        />
                      </Toggle>
                    )
                  })}
                </div>
              </Field>

              {/* Weapon Field */}
              <Field>
                <FieldLabel>Weapon Type</FieldLabel>
                <div className="flex gap-1">
                  {WEAPON_TYPES.map((weaponType) => {
                    const isCurrentActive = selectedWeaponTypes.includes(weaponType.value);

                    return (
                      <Toggle 
                        key={weaponType.value} 
                        value={weaponType.value} 
                        variant="outline" 
                        size="lg"
                        pressed={isCurrentActive}
                        onPressedChange={(pressed) => handleWeaponTypeToggle(weaponType.value, pressed)}
                        style={
                          isCurrentActive ? {
                            borderColor: "var(--primary)"
                          } : {}
                        }
                        className="border-2"
                      >
                        <Image 
                          src={weaponType.icon}
                          alt={weaponType.label}
                          width={24}
                          height={24}
                          quality={100}
                        />
                      </Toggle>
                    )
                  })}
                </div>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  )
}