"use client"

import { useState } from "react"
import Image from "next/image"
import { Resonator } from "@/types/resonator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

interface StatCardProps {
  resonator: Resonator
}

export default function StatCard({ resonator }: StatCardProps) {
  const [isMaxLevel, setIsMaxLevel] = useState(false)

  const stats = [
    {
      label: "HP",
      icon: "/assets/stats/stat_hp.png",
      min: resonator.stats.hp.min,
      max: resonator.stats.hp.max,
    },
    {
      label: "ATK",
      icon: "/assets/stats/stat_atk.png",
      min: resonator.stats.atk.min.toLocaleString(),
      max: resonator.stats.atk.max,
    },
    {
      label: "DEF",
      icon: "/assets/stats/stat_def.png",
      min: resonator.stats.def.min,
      max: resonator.stats.def.max,
    },
  ]

  return (
    <Card className="p-6">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Stats</CardTitle>

          <div className="flex items-center gap-2">
            <Label className="font-medium">Level 1</Label>
            <Switch checked={isMaxLevel} onCheckedChange={setIsMaxLevel} />
            <Label className="font-medium">Level 90</Label>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <Table className="bg-accent rounded-lg overflow-hidden">
          <TableBody>
            {stats.map((stat) => (
              <TableRow key={stat.label} className="flex justify-between p-0.5">
                <TableCell className="flex items-center gap-2 font-medium">
                  <Image
                    src={stat.icon}
                    width={24}
                    height={24}
                    alt={stat.label}
                  />
                  {stat.label}
                </TableCell>
                <TableCell className="font-medium text-sm">
                  {isMaxLevel ? stat.max : stat.min}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
