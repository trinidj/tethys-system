import fs from "fs";
import path from "path";
import resonatorsIndex from "@/data/resonators/index.json";
import developmentMaterialsIndex from "@/data/development_materials.json";
import type { AscensionMaterials, ForteAscensionMaterials, Resonator } from "@/types/resonator";
import type { SequenceNode } from "@/types/resonance-chain";
import type { DevelopmentMaterialRarity } from "@/types/development-material";
import { marked } from "marked";
import { colorizeText } from "@/lib/color-utils";

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
      const { ...base } = entry;
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

export function getResonatorAscension(resonator: Resonator): AscensionMaterials[] {
  try {
    const isRover = resonator.id.startsWith("rover");
    const folderName = isRover ? "rover" : resonator.id.toLowerCase().replace(/\s+/g, '-');
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
    console.error(`Error loading materials for ${resonator.id}:`, error);
    return [];
  }
}

export function getForteAscension(resonator: Resonator): ForteAscensionMaterials[] {
  try {
    const isRover = resonator.id.startsWith("rover");
    const folderName = isRover ? "rover" : resonator.id.toLowerCase().replace(/\s+/g, '-');
    
    let filePath: string;
    if (isRover && resonator.attribute) {
      filePath = path.join(process.cwd(), 'data', 'resonators', folderName, resonator.attribute.toLowerCase(), 'forte_ascension.json');
    } else {
      filePath = path.join(process.cwd(), 'data', 'resonators', folderName, 'forte_ascension.json');
    }

    if (!fs.existsSync(filePath)) {
      return [];
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const rawMaterials: { level: number; materials: { name: string; amount: number; type?: string }[] }[] = JSON.parse(fileContent);

    const materials: ForteAscensionMaterials[] = rawMaterials.map(phase => ({
      materials: phase.materials.map(m => {
        const materialInfo = developmentMaterials.find(dm => dm.name === m.name);
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
    console.error(`Error loading forte materials for ${resonator.id}:`, error);
    return [];
  }
}

export function parseForteMarkdown(markdown: string): string {
  try {
    if (!markdown) return "";
    
    const sections = markdown.split(/\n(?=\*\*)/g);
    
    return sections.map(section => {
      const cleaned = section.replace(/\n{3,}/g, '\n\n').trim();
      const html = marked.parse(cleaned, { breaks: true, gfm: true }) as string;
      const colorizedHtml = colorizeText(html);
      return `<div class="description">${colorizedHtml}</div>`;
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
      filePath = path.join(process.cwd(), 'data', 'resonators', folderName, resonator.attribute.toLowerCase(), 'forte.md');
    } else {
      filePath = path.join(process.cwd(), 'data', 'resonators', folderName, 'forte.md');
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
      "Tune Break": "tuneBreak",
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

    // If talents.md doesn't have Tune Break, use the general tune_break.md
    if (!forteData.tuneBreak) {
      const generalTuneBreakPath = path.join(process.cwd(), 'data', 'resonators', 'tune_break.md');
      
      if (fs.existsSync(generalTuneBreakPath)) {
        const tuneBreakContent = fs.readFileSync(generalTuneBreakPath, 'utf-8');
        const tuneBreakSections = tuneBreakContent.split(/^## /m).slice(1);
        
        if (tuneBreakSections.length > 0) {
          const section = tuneBreakSections[0];
          const splitIndex = section.indexOf('\n');
          const headerLine = section.slice(0, splitIndex).trim();
          const contentRaw = section.slice(splitIndex + 1).trim();
          
          const [typePart, ...nameParts] = headerLine.split(':');
          const name = nameParts.join(':').trim() || typePart.trim();

          forteData.tuneBreak = {
            name: name,
            type: "Tune Break",
            description: contentRaw
          };
        }
      }
    }

    return forteData;

  } catch (error) {
    console.error(`Error parsing forte for ${resonator.name}:`, error);
    return undefined;
  }
}

export function getResonanceChain(resonator: Resonator): SequenceNode[] {
  try {
    const isRover = resonator.id.startsWith("rover");
    const folderName = isRover ? "rover" : resonator.id.toLowerCase().replace(/\s+/g, '-');
    
    let filePath: string;
    if (isRover && resonator.attribute) {
      filePath = path.join(process.cwd(), 'data', 'resonators', folderName, resonator.attribute.toLowerCase(), 'sequence-nodes.md');
    } else {
      filePath = path.join(process.cwd(), 'data', 'resonators', folderName, 'sequence-nodes.md');
    }

    if (!fs.existsSync(filePath)) {
      return [];
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const sections = fileContent.split(/^## /m).slice(1);

    return sections.map(section => {
      const splitIndex = section.indexOf('\n');
      const headerLine = section.slice(0, splitIndex).trim();
      const contentRaw = section.slice(splitIndex + 1).trim();
      
      const name = headerLine.split(':')[1]?.trim() || headerLine;

      return {
        name: name,
        description: contentRaw
      };
    });

  } catch (error) {
    console.error(`Error parsing resonance chain for ${resonator.name}:`, error);
    return [];
  }
}

