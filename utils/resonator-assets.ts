import type {
  Resonator,
  ResonatorAssets,
  WeaponType,
  Attribute,
  CombatRole
} from "@/types/resonator";

import combatRoles from "@/data/combat_roles.json"

export function getResonatorAssets(resonator: Resonator, gender: "male" | "female" = "female"): ResonatorAssets {
  const weaponIconMap: Record<WeaponType, string> = {
    Pistols: "Pistols_Icon.png",
    Sword: "Sword_Icon.png",
    Broadblade: "Broadblade_Icon.png",
    Rectifier: "Rectifier_Icon.png",
    Gauntlets: "Gauntlets_Icon.png",
  };

  // Rover variants share a common icon asset folder name
  const assetFolderName = resonator.id.startsWith("rover") ? "Rover" : resonator.name;
  const spriteFileName = resonator.id.startsWith("rover") 
    ? (gender === "male" ? "male_sprite.png" : "female_sprite.png") 
    : "sprite.png";

  return {
    icon: `/assets/resonators/${resonator.rarity}_star/${assetFolderName}/icon.png`,
    sprite: `/assets/resonators/${resonator.rarity}_star/${assetFolderName}/${spriteFileName}`,
    splashArt: `/assets/resonators/${resonator.rarity}_star/${assetFolderName}/splash_art.png`,
    attribute: `/assets/attributes/${resonator.attribute}.png`,
    weaponType: `/assets/weapons/${weaponIconMap[resonator.weaponType]}`,
  };
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

    const fileName = roleData.name
      .toLowerCase()
      .replace(/ /g, "_");

    return {
      ...roleData,
      icon: `/assets/combat_roles/${fileName}.png`
    };
  }).filter((role): role is CombatRole => role !== undefined);
}