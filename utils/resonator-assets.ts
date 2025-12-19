import type { 
  Resonator, 
  ResonatorAssets,
  WeaponType,
  StatRange,
  SequenceNodeAssets,
  SkillAssets,
} from "@/types/resonator";

export function getResonatorAssets(resonator: Resonator): ResonatorAssets {
  const weaponIconMap: Record<WeaponType, string> = {
    Pistol: "Pistols_Icon.png",
    Sword: "Sword_Icon.png",
    Broadblade: "Broadblade_Icon.png",
    Rectifier: "Rectifier_Icon.png",
    Gauntlet: "Gauntlets_Icon.png",
  };

  // Rover variants share a common icon asset folder name
  const assetFolderName = resonator.id.startsWith("rover") ? "Rover" : resonator.name;
  const spriteFileName = resonator.id.startsWith("rover") ? "female_sprite.png" : "sprite.png";

  return {
    icon: `/assets/resonators/${resonator.rarity}_stars/${assetFolderName}/icon.png`,
    sprite: `/assets/resonators/${resonator.rarity}_stars/${assetFolderName}/${spriteFileName}`,
    splashArt: `/assets/resonators/${resonator.rarity}_stars/${assetFolderName}/splash_art.png`,
    attribute: `/assets/attributes/${resonator.attribute}.png`,
    weaponType: `/assets/weapons/${weaponIconMap[resonator.weaponType]}`,
  };
}

/**
 * Get all skill/talent asset URLs for a resonator based on naming conventions
 */
export function getSkillAssets(resonator: Resonator): SkillAssets {
  const assetFolderName = resonator.id.startsWith("rover") ? "Rover" : resonator.name
  const roverVariantPath = resonator.id.startsWith("rover") ? `/${resonator.attribute}` : ""
  const basePath = `/assets/resonators/${resonator.rarity}_stars/${assetFolderName}${roverVariantPath}`

  return {
    normalAttack: `${basePath}/normal_attack.png`,
    resonanceSkill: `${basePath}/resonance_skill.png`,
    resonanceLiberation: `${basePath}/resonance_liberation.png`,
    forteCircuit: `${basePath}/forte_circuit.png`,
    inheritSkill1: `${basePath}/inherent_skill_1.png`,
    inheritSkill2: `${basePath}/inherent_skill_2.png`,
    introSkill: `${basePath}/intro_skill.png`,
    outroSkill: `${basePath}/outro_skill.png`
  }
}

/**
 * Get all sequence node asset URLs for a resonator based on naming conventions
 */
export function getSequenceNodeAssets(resonator: Resonator): SequenceNodeAssets {
  const assetFolderName = resonator.id.startsWith("rover") ? "Rover" : resonator.name
  const roverVariantPath = resonator.id.startsWith("rover") ? `/${resonator.attribute}` : ""
  const basePath = `/assets/resonators/${resonator.rarity}_stars/${assetFolderName}${roverVariantPath}`

  return {
    sequenceNode1: `${basePath}/node_1.png`,
    sequenceNode2: `${basePath}/node_2.png`,
    sequenceNode3: `${basePath}/node_3.png`,
    sequenceNode4: `${basePath}/node_4.png`,
    sequenceNode5: `${basePath}/node_5.png`,
    sequenceNode6: `${basePath}/node_6.png`
  }
}

/**
 * Calculate stat value at a given level (1-90)
 */
export function calculateStat(statRange: StatRange, level: number): number {
  const { min, max } = statRange;
  const value = min + ((level - 1) * (max - min)) / 89;
  return Math.round(value);
}