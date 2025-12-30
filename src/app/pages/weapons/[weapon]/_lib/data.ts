import fs from "fs";
import path from "path";
import { Weapon, WeaponAscensionMaterials } from "@/types/weapon"
import weaponsIndex from "@/data/weapons/index.json";
import developmentMaterialsIndex from "@/data/development_materials.json";
import type { DevelopmentMaterialRarity } from "@/types/development-material";
import { marked } from "marked";
import { colorizeText } from "@/lib/color-utils";

const weapons = weaponsIndex.weapons as Weapon[];

export function getWeaponBySlug(slug: string): Weapon | undefined {
  const normalizedSlug = slug.toLowerCase()

  return weapons.find(
    (weapon) => weapon.id.toLowerCase() === normalizedSlug
  )
}

export function getAllWeaponSlugs(): string[] {
  return weapons.map(weapon => weapon.id);
}

export function parseWeaponRefinementSkill(markdown: string): string {
  try {
    if (!markdown) return "";
    
    const sections = markdown.split(/\n(?=\*\*)/g);
    
    return sections.map(section => {
      const cleaned = section.replace(/\n{3,}/g, '\n\n').trim();
      const html = marked.parse(cleaned, { breaks: true, gfm: true }) as string;
      const colorizedHtml = colorizeText(html);
      return `<div class="weapon-refinement-block">${colorizedHtml}</div>`;
    }).join('\n');
    
  } catch (error) {
    console.error("Error parsing weapon refinement markdown:", error);
    return "";
  }
}

export function getWeaponRefinementSkill(weapon: Weapon): { name: string; description: string } | undefined {
  try {
    const folderName = weapon.id.toLowerCase().replace(/\s+/g, '-');
    const filePath = path.join(process.cwd(), 'data', 'weapons', folderName, 'description.md');

    if (!fs.existsSync(filePath)) {
      return undefined;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Parse the markdown to extract skill name and description
    // Format: ## Refinement Skill: {name}
    const lines = fileContent.split('\n');
    const headerLine = lines.find(line => line.startsWith('## Refinement Skill:'));
    
    if (!headerLine) {
      return undefined;
    }

    const skillName = headerLine.replace('## Refinement Skill:', '').trim();
    
    // Get description (everything after the header line, excluding empty lines)
    const headerIndex = lines.indexOf(headerLine);
    const descriptionLines = lines.slice(headerIndex + 1).filter(line => line.trim() !== '');
    const description = descriptionLines.join('\n').trim();

    return {
      name: skillName,
      description: description
    };

  } catch (error) {
    console.error(`Error loading refinement skill for ${weapon.name}:`, error);
    return undefined;
  }
}

export function getWeaponAscension(weapon: Weapon): WeaponAscensionMaterials[] {
  try {
    const folderName = weapon.id.toLowerCase().replace(/\s+/g, '-');
    const filePath = path.join(process.cwd(), 'data', 'weapons', folderName, 'ascension.json');

    if (!fs.existsSync(filePath)) {
      return [];
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const rawMaterials: { level: number | string; materials: { name: string; amount: number; type?: string }[] }[] = JSON.parse(fileContent);

    const developmentMaterials = developmentMaterialsIndex.development_materials;

    const materials: WeaponAscensionMaterials[] = rawMaterials.map(phase => ({
      materials: phase.materials.map(m => {
        const materialInfo = developmentMaterials.find(dm => dm.name === m.name);
        // Default to Basic if not found in the registry, or if it's Shell Credits
        let rarity: DevelopmentMaterialRarity = "Basic";
        
        if (materialInfo) {
          rarity = materialInfo.rarity as DevelopmentMaterialRarity;
        } else if (m.name === "Shell Credits") {
          rarity = "Basic";
        }

        return {
          item: {
            name: m.name,
            rarity: rarity,
            type: m.type
          },
          amount: m.amount
        };
      })
    }));

    return materials;
  } catch (error) {
    console.error(`Error loading materials for ${weapon.id}:`, error);
    return [];
  }
}