import type { 
  Weapon,
  WeaponAssets,
  WeaponType 
} from "@/types/weapon";

export function getWeaponAssets(weapon: Weapon): WeaponAssets {
  const weaponIconMap: Record<WeaponType, string> = {
    Pistols: "Pistols_Icon.png",
    Sword: "Sword_Icon.png",
    Broadblade: "Broadblade_Icon.png",
    Rectifier: "Rectifier_Icon.png",
    Gauntlets: "Gauntlets_Icon.png",
  };

  const fileName = weapon.id.toLowerCase().replace(/ /g, "_");

  return {
    icon: `/assets/weapons/${weapon.rarity}_star/${fileName}.png`,
    weaponType: `/assets/weapons/${weaponIconMap[weapon.weaponType]}`,
  };
}