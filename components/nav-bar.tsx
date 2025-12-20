"use client"

import { navItems } from "@/constants/navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import SearchDialog from "@/components/search-dialog"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

export default function NavBar() {
  const isMobile = useIsMobile()

  return (
    <nav className="flex items-center justify-between w-full lg:mx-90">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Link href="/">
            <Image
              src="/assets/site_icon.png"
              alt="Phrolova Logo"
              width={48}
              height={48}
              quality={100}
            />
          </Link>
        </Button>

        <NavigationMenu viewport={isMobile}>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink asChild>
                  <Link href={item.url}>
                    <span className="font-medium text-sm">{item.title}</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <SearchDialog />
    </nav>
  )
}