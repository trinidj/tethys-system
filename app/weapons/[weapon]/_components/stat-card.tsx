"use client"

import { useState } from "react"
import { Weapon } from "@/types/weapon"
import { getStatIcon } from "@/utils/weapon-assets"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"

interface StatCardProps {
  weapon: Weapon
}

export default function StatCard({ weapon }: StatCardProps) {
  const [isMaxLevel, setIsMaxLevel] = useState(false)

  const formatStatValue = (value: number, isPercent = false) => {
    const rounded = value % 1 === 0 ? String(value) : value.toFixed(1).replace(/\.0$/,'')
    return isPercent ? `${rounded}%` : rounded
  }

  const formatStatLabel = (name: string) => {
    if (!name) return 'N/A'

    // Normalize separators to spaces so we can title-case multi-word names
    const key = name.toLowerCase().replace(/[_-]+/g, ' ').trim()

    // Uppercase common abbreviations when they appear as whole words (e.g., "atk", "dmg")
    const uppercaseWords = new Set(["atk", "hp", "def", "dmg"])

    // Title-case each word, but fully uppercase known abbreviation words
    return key
      .split(' ')
      .filter(Boolean)
      .map(word => uppercaseWords.has(word) ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  const stats = [
    {
      label: "ATK",
      icon: "/assets/stats/stat_atk.png",
      min: weapon.stats.atk.min,
      max: weapon.stats.atk.max,
      isPercent: false
    },
    {
      label: formatStatLabel(weapon.stats.secondaryStat.name),
      icon: getStatIcon(weapon.stats.secondaryStat.name),
      min: weapon.stats.secondaryStat.value.min,
      max: weapon.stats.secondaryStat.value.max,
      isPercent: true
    }
  ]

  return (
    <Card className="p-6">
      <CardHeader className="px-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Stats</CardTitle>

          <div className="flex items-center gap-2">
            <Switch checked={isMaxLevel} onCheckedChange={setIsMaxLevel} />
            <Label className="font-medium">Max</Label>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <Table className="bg-accent rounded-xl overflow-hidden">
          <TableBody>
            {stats.map((stat) => (
              <TableRow key={`${stat.label}-${stat.min}-${stat.max}`} className="flex justify-between p-0.5">
                <TableCell className="flex items-center gap-2 font-medium">
                  <Image 
                    src={stat.icon}
                    alt={stat.label}
                    width={24}
                    height={24}
                  />
                  {stat.label}
                </TableCell>
                <TableCell className="font-medium text-base">
                  {isMaxLevel ? formatStatValue(stat.max, stat.isPercent) : formatStatValue(stat.min, stat.isPercent)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody> 
        </Table>
      </CardContent>
    </Card>
  )
}