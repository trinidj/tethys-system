import type {
  Resonator,
  ResonatorAssets,
  WeaponType,
  SequenceNodeAssets,
  ForteAssets,
  Attribute,
  CombatRole
} from "@/types/resonator";

import combatRoles from "@/data/combat_roles.json"

export function getResonatorAssets(resonator: Resonator, gender: "male" | "female" = "female"): ResonatorAssets {
  const weaponIconMap: Record<WeaponType, string> = {
    Pistol: "Pistols_Icon.png",
    Sword: "Sword_Icon.png",
    Broadblade: "Broadblade_Icon.png",
    Rectifier: "Rectifier_Icon.png",
    Gauntlet: "Gauntlets_Icon.png",
  };

  // Rover variants share a common icon asset folder name
  const assetFolderName = resonator.id.startsWith("rover") ? "Rover" : resonator.name;
  const spriteFileName = resonator.id.startsWith("rover") 
    ? (gender === "male" ? "male_sprite.png" : "female_sprite.png") 
    : "sprite.png";

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
export function getForteAssets(resonator: Resonator): ForteAssets {
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

const ATTRIBUTE_ICON_MAP: Record<Attribute, string> = {
  Electro: "/assets/attributes/electro.png",
  Aero: "/assets/attributes/aero.png",
  Fusion: "/assets/attributes/fusion.png",
  Glacio: "/assets/attributes/glacio.png",
  Havoc: "/assets/attributes/havoc.png",
  Spectro: "/assets/attributes/spectro.png",
}

export function getAttributeIcon(attribute: Attribute) {
  return ATTRIBUTE_ICON_MAP[attribute]
}

export function getCombatRoles(resonator: Resonator): CombatRole[] {
  if (!resonator.combatRoles) return [];

  const roles = combatRoles.combat_roles;
  return resonator.combatRoles.map(roleName => {
    const roleData = roles.find(r => r.name === roleName);
    if (!roleData) return undefined;

    // Convert name to snake_case for filename
    // e.g. "Basic Attack DMG Amplification" -> "basic_attack_dmg_amplification"
    const fileName = roleData.name
      .toLowerCase()
      .replace(/ /g, "_");

    return {
      ...roleData,
      icon: `/assets/combat_roles/${fileName}.png`
    };
  }).filter((role): role is CombatRole => role !== undefined);
}