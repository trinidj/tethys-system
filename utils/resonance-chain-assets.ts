import { SequenceNodeAssets } from "@/types/resonance-chain"
import { Resonator } from "@/types/resonator"

export function getResonanceChainAssets(resonator: Resonator): SequenceNodeAssets {
  const assetFolderName = resonator.id.startsWith("rover") ? "Rover" : resonator.name
  const roverVariantPath = resonator.id.startsWith("rover") ? `/${resonator.attribute}` : ""
  const basePath = `/assets/resonators/${resonator.rarity}_star/${assetFolderName}${roverVariantPath}`

  return {
    sequenceNode1: `${basePath}/node_1.png`,
    sequenceNode2: `${basePath}/node_2.png`,
    sequenceNode3: `${basePath}/node_3.png`,
    sequenceNode4: `${basePath}/node_4.png`,
    sequenceNode5: `${basePath}/node_5.png`,
    sequenceNode6: `${basePath}/node_6.png`
  }
}