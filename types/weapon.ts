import { DevelopmentMaterial } from "./development-material";

export type WeaponType = "Pistols" | "Sword" | "Broadblade" | "Rectifier" | "Gauntlets";
export type WeaponRarity = 1 | 2 | 3 | 4 | 5;

export interface AscensionMaterial {
  item: DevelopmentMaterial;
  amount: number;
}

export interface WeaponAscensionMaterials {
  materials: AscensionMaterial[];
}

export interface WeaponAssets {
  icon: string;
  weaponType: string;
}

export interface StatRange {
  min: number;
  max: number;
}                                 

export interface Weapon {
  id: string;
  name: string;
  rarity: WeaponRarity;
  weaponType: WeaponType;
  isNew?: boolean;
  stats: {
    atk: StatRange;
    secondaryStat: {
      name: string;
      value: StatRange;
    };
  }
}