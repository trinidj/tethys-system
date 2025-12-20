import fs from "fs"
import path from "path"
import Profile from "./_sections/profile-section";
import { getResonatorBySlug } from "@/app/resonators/[resonator]/_lib/data";
import { getResonatorAssets } from "@/utils/resonator-assets";

export default async function Resonator({ params }: { params: Promise<{ resonator: string }> }) {
  const { resonator: slug } = await params
  const resonatorData = await getResonatorBySlug(slug)

  if (!resonatorData) {
    return <div>Resonator not found</div>
  }

  const assets = getResonatorAssets(resonatorData)
  const splashArtPath = path.join(process.cwd(), "public", assets.splashArt.slice(1))
  const hasSplashArt = fs.existsSync(splashArtPath)

  return (
    <div className="min-h-screen">
      <Profile resonator={resonatorData} hasSplashArt={hasSplashArt} />
    </div>
  );
}