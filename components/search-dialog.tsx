"use client"

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

export default function SearchDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
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

        <div>
          <InputGroup>
            <InputGroupInput 
              placeholder="Search"
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <ScrollArea className="h-112">
            {/* No Data Yet */}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
