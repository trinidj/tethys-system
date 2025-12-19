import { Rarity, Attribute } from "@/types/resonator";

export function getRarityColor(rarity: Rarity) {
  const colors = {
    5: "rarity-5",
    4: "rarity-4"
  }

  return colors[rarity]
}

export function getAttributeColor(attribute: Attribute) {
  const colors = {
    Electro: "electro",
    Aero: "aero",
    Fusion: "fusion",
    Glacio: "glacio",
    Havoc: "havoc",
    Spectro: "spectro"
  }

  return colors[attribute]
}