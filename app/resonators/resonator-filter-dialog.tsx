"use client"

import type { FormEvent } from "react"
import { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  FieldLabel,
} from "@/components/ui/field"

import { Toggle } from "@/components/ui/toggle"
import { ATTRIBUTES } from "@/constants/attributes"
import { RARITIES } from "@/constants/rarities"
import { WEAPON_TYPES } from "@/constants/weapon-types"
import Image from "next/image"
import { getAttributeColor } from "@/lib/color-utils"
import type { Attribute } from "@/types/resonator"

export type ResonatorFilters = {
  rarities: string[]
  attributes: string[]
  weaponTypes: string[]
}

type FilterDialogProps = {
  value: ResonatorFilters
  onApply: (filters: ResonatorFilters) => void
}

export default function ResonatorFilterDialog({ value, onApply }: FilterDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<ResonatorFilters>(value)

  const handleToggle =
    (key: keyof ResonatorFilters) =>
    (option: string, pressed: boolean) => {
      setFilters((prev) => {
        if (pressed) {
          return { ...prev, [key]: [...prev[key], option] }
        }

        return { ...prev, [key]: prev[key].filter((item) => item !== option) }
      })
    }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onApply(filters)
    setIsOpen(false)
  }

  const handleCancel = () => {
    setFilters(value)
    setIsOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open) {
      setFilters(value)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="icon" variant="secondary" aria-label="Open filters">
          <Filter />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4 border-4 gap-0">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel className="text-base">Rarity</FieldLabel>
                <div className="flex flex-wrap gap-1.5">
                  {RARITIES.filter(r => r.value === "4" || r.value === "5").map((rarity) => {
                    const isCurrentActive = filters.rarities.includes(rarity.value)

                    return (
                      <Toggle
                        key={rarity.value}
                        value={rarity.value}
                        variant="outline"
                        size="lg"
                        pressed={isCurrentActive}
                        onPressedChange={handleToggle("rarities").bind(null, rarity.value)}
                        style={
                          isCurrentActive ? {
                            borderColor: "var(--primary)",
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

              <Field>
                <FieldLabel className="text-base">Attribute</FieldLabel>
                <div className="flex flex-wrap gap-1.5">
                  {ATTRIBUTES.map((attribute) => {
                    const isCurrentActive = filters.attributes.includes(attribute.value)
                    const attributeColor = getAttributeColor(attribute.label as Attribute)

                    return (
                      <Toggle
                        key={attribute.value}
                        value={attribute.value}
                        variant="outline"
                        size="lg"
                        pressed={isCurrentActive}
                        onPressedChange={handleToggle("attributes").bind(null, attribute.value)}
                        style={
                          isCurrentActive ? {
                            borderColor: `var(--${attributeColor})`,
                            backgroundColor: `color-mix(in srgb, var(--${attributeColor}) 20%, transparent)`,
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

              <Field>
                <FieldLabel className="text-base">Weapon Type</FieldLabel>
                <div className="flex flex-wrap gap-1.5">
                  {WEAPON_TYPES.map((weaponType) => {
                    const isCurrentActive = filters.weaponTypes.includes(weaponType.value)

                    return (
                      <Toggle
                        key={weaponType.value}
                        value={weaponType.value}
                        variant="outline"
                        size="lg"
                        pressed={isCurrentActive}
                        onPressedChange={handleToggle("weaponTypes").bind(null, weaponType.value)}
                        style={
                          isCurrentActive ? {
                            borderColor: "var(--primary)",
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

            <Field className="flex gap-2">
              <Button type="submit">Save</Button>

              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </Field>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  )
}
