import fs from "fs";
import path from "path";
import resonatorsIndex from "@/data/resonators/index.json";
import developmentMaterialsIndex from "@/data/development_materials.json";
import type { AscensionMaterials, Resonator } from "@/types/resonator";
import type { DevelopmentMaterialRarity } from "@/types/development_material";
import { marked } from "marked";

type ResonatorIndexEntry = Resonator & {
  variants?: Array<Partial<Resonator> & { id: string }>;
};

const resonators = resonatorsIndex.resonators as ResonatorIndexEntry[];
const developmentMaterials = developmentMaterialsIndex.development_materials;

export function getResonatorBySlug(slug: string): Resonator | undefined {
  const normalizedSlug = slug.toLowerCase();

  const baseMatch = resonators.find(
    (entry) => entry.id.toLowerCase() === normalizedSlug
  );
  if (baseMatch) return baseMatch;

  for (const entry of resonators) {
    if (!entry.variants) continue;

    const variantMatch = entry.variants.find(
      (variant) => variant.id.toLowerCase() === normalizedSlug
    );

    if (variantMatch) {
      const { variants, ...base } = entry;
      return {
        ...base,
        ...variantMatch,
      };
    }
  }

  return undefined;
}

export function getAllResonatorSlugs(): string[] {
  return resonators.flatMap(r => {
    if (r.variants && r.variants.length > 0) {
      return r.variants.map(v => v.id)
    }

    return [r.id]
  })
}

export function getResonatorAscension(resonatorId: string): AscensionMaterials[] {
  try {
    const isRover = resonatorId.startsWith("rover");
    const folderName = isRover ? "rover" : resonatorId.toLowerCase().replace(/\s+/g, '-');
    const filePath = path.join(process.cwd(), 'data', 'resonators', folderName, 'ascension.json');

    if (!fs.existsSync(filePath)) {
      return [];
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const rawMaterials: { level: number; materials: { name: string; amount: number; type?: string }[] }[] = JSON.parse(fileContent);

    const materials: AscensionMaterials[] = rawMaterials.map(phase => ({
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
    console.error(`Error loading materials for ${resonatorId}:`, error);
    return [];
  }
}

export function parseForteMarkdown(markdown: string): string {
  try {
    if (!markdown) return "";
    
    // Split the description into semantic sections based on bold headers
    // e.g. **Basic Attack** starts a new section
    const sections = markdown.split(/\n(?=\*\*)/g);
    
    return sections.map(section => {
      const cleaned = section.replace(/\n{3,}/g, '\n\n').trim();
      const html = marked.parse(cleaned, { breaks: true, gfm: true }) as string;
      return `<div class="forte-category-block">${html}</div>`;
    }).join('\n');
    
  } catch (error) {
    console.error("Error parsing markdown:", error);
    return "";
  }
}

export function getResonatorForte(resonator: Resonator): Resonator["forte"] {
  try {
    const isRover = resonator.id.startsWith("rover");
    const folderName = isRover ? "rover" : resonator.id.toLowerCase().replace(/\s+/g, '-');
    
    let filePath: string;
    if (isRover && resonator.attribute) {
      filePath = path.join(process.cwd(), 'data', 'resonators', folderName, resonator.attribute.toLowerCase(), 'talents.md');
    } else {
      filePath = path.join(process.cwd(), 'data', 'resonators', folderName, 'talents.md');
    }

    if (!fs.existsSync(filePath)) {
      return undefined;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const sections = fileContent.split(/^## /m).slice(1);
    const forteData: NonNullable<Resonator["forte"]> = {};

    const typeMap: Record<string, keyof NonNullable<Resonator["forte"]>> = {
      "Normal Attack": "normalAttack",
      "Resonance Skill": "resonanceSkill",
      "Resonance Liberation": "resonanceLiberation",
      "Forte Circuit": "forteCircuit",
      "Intro Skill": "introSkill",
      "Outro Skill": "outroSkill",
    };

    sections.forEach(section => {
      const splitIndex = section.indexOf('\n');
      const headerLine = section.slice(0, splitIndex).trim();
      const contentRaw = section.slice(splitIndex + 1).trim();
      
      const [typePart, ...nameParts] = headerLine.split(':');
      const type = typePart.trim();
      const name = nameParts.join(':').trim() || type;

      if (type === "Inherent Skills") {
        const inheritSections = contentRaw.split(/^### /m).slice(1);
        inheritSections.forEach((is, index) => {
          const splitI = is.indexOf('\n');
          const iName = is.slice(0, splitI).trim();
          const iContent = is.slice(splitI + 1).trim();
          const iDesc = iContent; // Return raw markdown for custom renderer

          const skill = {
            name: iName,
            type: "Inherent Skill",
            description: iDesc
          };

          if (index === 0) forteData.inheritSkill1 = skill;
          if (index === 1) forteData.inheritSkill2 = skill;
        });
      } else {
        const key = typeMap[type];
        if (key) {
          forteData[key] = {
            name: name,
            type: type,
            description: contentRaw // Return raw markdown for custom renderer
          };
        }
      }
    });

    return forteData;

  } catch (error) {
    console.error(`Error parsing forte for ${resonator.name}:`, error);
    return undefined;
  }
}