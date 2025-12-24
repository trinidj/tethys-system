"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

import resonatorsIndex from "@/data/resonators/index.json"
import { getResonatorAssets } from "@/utils/resonator-assets"
import type { Resonator } from "@/types/resonator"

export default function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (!open) {
      const id = setTimeout(() => setQuery(""), 0)
      return () => clearTimeout(id)
    }
  }, [open])

  const resonators = useMemo(() => {
    return resonatorsIndex.resonators as Resonator[]
  }, [])

  const filteredResonators = useMemo(() => {
    if (!query.trim()) return []
    
    const lowerQuery = query.toLowerCase()
    return resonators.filter((resonator) => 
      resonator.name.toLowerCase().includes(lowerQuery)
    )
  }, [query, resonators])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="shrink-0 cursor-pointer"
          aria-label="Search"
          title="Search"
        >
          <Search />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4 border-4 gap-0">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <InputGroup className="mb-4">
          <InputGroupInput 
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-lg"
            autoFocus
          />
          <InputGroupAddon>
            <Search className="h-4 w-4 text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>

        <ScrollArea className="h-[400px] pr-4">
          <div className="flex flex-col gap-2">
            {query.trim() && filteredResonators.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                No results found.
              </div>
            )}

            {filteredResonators.map((resonator) => {
              const assets = getResonatorAssets(resonator)
              
              return (
                <Link
                  key={resonator.id}
                  href={`/resonators/${resonator.id}`}
                  onClick={() => setOpen(false)}
                >
                  <Item className="hover:bg-accent/50">
                    <ItemMedia>
                      <div className="overflow-hidden border-2 border-primary rounded-xl">
                        <Image 
                          src={assets.icon}
                          alt={resonator.name}
                          width={64}
                          height={64}
                          sizes="(max-width: 640px) 50vw, (max-width: 1024) 25vw, 150px"
                        />
                      </div>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{resonator.name}</ItemTitle>
                      <ItemDescription>{resonator.description}</ItemDescription>
                    </ItemContent>
                  </Item>
                </Link>
              )
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
