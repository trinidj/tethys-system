"use client"

import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

const resonatorNavItems = [
  { label: "Profile", url: "#profile" },
  { label: "Forte", url: "#forte" },
  { label: "Resonance Chain", url: "#resonance-chain" },
]

export default function Navigation() {
  const isMobile = useIsMobile()

  return (
    <div className="flex-col">
      <NavigationMenu viewport={!isMobile} className="fixed top-1/2 right-10 -translate-y-1/2">
        <NavigationMenuList className="flex-col items-end">
          {resonatorNavItems.map((item) => (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuLink asChild>
                <Link href={item.url}>
                  <span className="font-medium text-muted-foreground hover:text-foreground transition-all duration-150">{item.label}</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}