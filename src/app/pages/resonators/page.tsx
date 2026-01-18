"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "motion/react"

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon
} from "@/components/ui/input-group"

import { ResonatorCard } from "./resonator-card"
import type { Resonator } from "@/types/resonator"
import { useResonatorFilters } from "@/hooks/use-resonator-filter"

function useColumnCount() {
  const [columns, setColumns] = useState(2)

  useEffect(() => {
    function updateColumns() {
      const width = window.innerWidth
      if (width >= 1536) setColumns(8)      // 2xl
      else if (width >= 1280) setColumns(6) // xl
      else if (width >= 1024) setColumns(5) // lg
      else if (width >= 768) setColumns(4)  // md
      else if (width >= 640) setColumns(3)  // sm
      else setColumns(2)
    }

    updateColumns()
    window.addEventListener("resize", updateColumns)
    return () => window.removeEventListener("resize", updateColumns)
  }, [])

  return columns
}

export default function ResonatorsPage() {
  const [resonators, setResonators] = useState<Resonator[]>([])
  const columns = useColumnCount()

  useEffect(() => {
    async function fetchResonators() {
      try {
        const response = await fetch("/api/resonators")
        const data = await response.json()
        const flatResonators = (data.resonators as Resonator[]).flatMap(r => {
          if (r.variants && r.variants.length > 0) {
            return r.variants.map(v => ({ ...r, ...v }))
          }
          return r
        })
        setResonators(flatResonators)
      } catch (error) {
        console.error("Failed to fetch resonators:", error)
      }
    }

    fetchResonators()
  }, [])

  const { searchQuery, setSearchQuery, filters, setFilters, filteredResonators } = useResonatorFilters(resonators)
  const ResonatorFilterDialog = dynamic(() => import("./resonator-filter-dialog"), {
    ssr: false
  })

  return (
    <div className="min-h-screen flex flex-col gap-4 md:gap-6">
      <section className="flex flex-col gap-3 md:gap-4 px-2 sm:px-0">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">Resonators</h1>
          <p className="text-sm text-muted-foreground sm:text-base md:text-lg">Browse all Resonators in Wuthering Waves</p>
        </div>

        <div className="flex gap-2">
          <InputGroup>
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search Resonators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>

          <ResonatorFilterDialog value={filters} onApply={setFilters} />
        </div>
      </section>

      <section className="container">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          <AnimatePresence mode="popLayout">
            {filteredResonators.map((resonator, index) => {
              const row = Math.floor(index / columns)
              return (
                <motion.div
                  key={resonator.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: row * 0.1 }}
                >
                  <ResonatorCard resonator={resonator} />
                </motion.div>
              )
            })}
          </AnimatePresence>

          {filteredResonators.length === 0 && (
            <motion.div
              className="col-span-full py-12 text-center text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              No resonators found
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
