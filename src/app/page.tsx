import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

const CURRENT_BANNERS = [
  { name: "Lynae", rarity: 5 },
  { name: "Cartethyia", rarity: 5 },
  { name: "Ciaccona", rarity: 5 }
] as const;

function getResonatorSheetImage(name: string, rarity: 4 | 5) {
  return `/assets/resonators/${rarity}_star/${name}/sheet.png`;
}

function getWeaponSheetImage(name: string) {
  
}

function getResonatorUrl(name: string) {
  return `/pages/resonators/${name.toLowerCase()}`;
}

export default function Home() {
  return (
    <div className="min-h-[60vh] bg-background flex flex-col gap-40">
      <section className="flex justify-center text-center">
        <div className="flex flex-col items-center justify-center gap-6 md:gap-8 lg:gap-10 px-4">
          <Image
            src="/assets/site_icon.png"
            alt="Site Logo"
            quality={100}
            width={160}
            height={160}
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
          />

          <div className="flex flex-col gap-4 md:gap-6 max-w-4xl">
            <h1 className="text-2xl font-bold text-center sm:text-3xl md:text-4xl lg:text-5xl">The Tethys System</h1>
            <p className="text-sm text-muted-foreground sm:text-base md:text-lg px-4">
              The Tethys System is an unofficial Wuthering Waves database and tools site,
              offering clear stats, materials, and builds.
            </p>
          </div>
        </div>
      </section>

      <section className="flex justify-cente">
        <div>
          <div className="flex flex-col md:gap-2 max-w-4xl">
            <h2 className="text-lg font-bold sm:text-2xl md:text-3xl lg:text-3xl">Current Banners</h2>
            <p className="text-sm text-muted-foreground sm:text-base md:text-lg">See what's available in the current Convene banners</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {CURRENT_BANNERS.map((banner) => (
              <Link key={banner.name} href={getResonatorUrl(banner.name)}>
                <Card className="overflow-hidden gap-0 p-0 max-w-xl border-none shadow-none transition-transform will-change-transform duration-500 hover:scale-105">
                  <CardContent className="px-0">
                    <Image
                      src={getResonatorSheetImage(banner.name, banner.rarity)}
                      alt={`${banner.name} Banner`}
                      width={1000}
                      height={563}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      className="w-full h-auto object-contain"
                    />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
