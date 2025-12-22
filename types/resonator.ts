import { DevelopmentMaterial } from "./development_material";

export type Attribute = "Fusion" | "Aero" | "Glacio" | "Havoc" | "Electro" | "Spectro";
export type WeaponType = "Pistol" | "Sword" | "Broadblade" | "Rectifier" | "Gauntlet";
export type ResonatorRarity = 4 | 5;

export interface CombatRole {
  name: string;
  description: string;
  icon: string;
}

export interface StatRange {
  min: number;
  max: number;
}

export interface AscensionMaterial {
  item: DevelopmentMaterial;
  amount: number;
}

export interface AscensionMaterials {
  materials: AscensionMaterial[];
}

export interface SkillAscensionPhase {
  level: number;
  materials: AscensionMaterial[];
}

export interface SkillScaling {
  level: number;
  [key: string]: number;
}

export interface Skill {
  name: string;
  type: string;
  description: string;
  icon?: string;
  scaling?: SkillScaling[];
}

export interface TalentData {
  name: string;
  type: string;
  description?: string;
}

export interface SequenceNode {
  name: string;
  description?: string;
}

export interface ResonatorAssets {
  icon: string;
  sprite: string;
  splashArt: string;
  attribute: string;
  weaponType: string;
}

export interface SequenceNodeAssets {
  sequenceNode1?: string;
  sequenceNode2?: string;
  sequenceNode3?: string;
  sequenceNode4?: string;
  sequenceNode5?: string;
  sequenceNode6?: string;
}

export interface SkillAssets {
  normalAttack?: string;
  resonanceSkill?: string;
  resonanceLiberation?: string;
  forteCircuit?: string;
  inheritSkill1?: string;
  inheritSkill2?: string;
  introSkill?: string;
  outroSkill?: string
}

export interface Resonator {
  id: string;
  name: string;
  rarity: ResonatorRarity;
  attribute: Attribute;
  weaponType: WeaponType;
  isNew?: boolean;
  description: string;
  combatRoles?: string[];
  stats: {
    hp: StatRange;
    atk: StatRange;
    def: StatRange;
  };
  nation: string;
  versionRelease: number,
  voiceActors: {
    english: string;
    chinese: string;
    japanese: string;
    korean: string;
  }
  talents?: {
    normalAttack?: Skill;
    resonanceSkill?: Skill;
    resonanceLiberation?: Skill;
    forteCircuit?: Skill;
    introSkill?: Skill;
    outroSkill?: Skill;
    inheritSkill1?: Skill;
    inheritSkill2?: Skill;
  };
  sequenceNodes?: SequenceNode[];
  ascension?: AscensionMaterials[];
  variants?: Array<Partial<Resonator> & { id: string }>;
}
