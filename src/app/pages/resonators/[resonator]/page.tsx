import fs from "fs"
import path from "path"
import Profile from "./_sections/profile-section";
import { Forte } from "./_sections/forte-section";
import { ResonanceChain } from "./_sections/resonance-chain-section";
import { getResonatorAscension, getResonatorBySlug, getAllResonatorSlugs, getForteAscension, getResonatorForte, parseForteMarkdown } from "./_lib/data";
import { getResonatorAssets } from "@/utils/resonator-assets";
import Navigation from "./_components/navigation";

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = getAllResonatorSlugs()

  return slugs.map((slug) => ({
    resonator: slug,
  }))
}

export default async function Resonator({ params }: { params: Promise<{ resonator: string }> }) {
  const { resonator: slug } = await params
  const resonatorData = await getResonatorBySlug(slug)

  if (!resonatorData) {
    return <div>Resonator not found</div>
  }

  const assets = getResonatorAssets(resonatorData)
  const splashArtPath = path.join(process.cwd(), "public", assets.splashArt.slice(1))
  const hasSplashArt = fs.existsSync(splashArtPath)
  const resonatorAscensionMaterials = getResonatorAscension(resonatorData)
  const forteAscensionMaterials = getForteAscension(resonatorData)
  
  // Parse forte data server-side
  const forteData = getResonatorForte(resonatorData)
  const parsedForte = forteData ? Object.fromEntries(
    Object.entries(forteData).map(([key, value]) => [
      key,
      {
        ...value,
        description: parseForteMarkdown(value.description)
      }
    ])
  ) : null

  return (
    <div className="min-h-screen flex flex-col gap-35">
      <Profile
        resonator={resonatorData}
        hasSplashArt={hasSplashArt}
        resonatorAscensionMaterials={resonatorAscensionMaterials}
      />
      <Forte 
        resonator={resonatorData} 
        forteAscensionMaterials={forteAscensionMaterials} 
        forte={parsedForte} 
      />
      <ResonanceChain resonator={resonatorData} />
      <Navigation />
    </div>
  );
}
