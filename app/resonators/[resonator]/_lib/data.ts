import fs from "fs";
import path from "path";
import resonatorsIndex from "@/data/resonators/index.json";
import type { AscensionMaterials, Resonator } from "@/types/resonator";

type ResonatorIndexEntry = Resonator & {
  variants?: Array<Partial<Resonator> & { id: string }>;
};

const resonators = resonatorsIndex.resonators as ResonatorIndexEntry[];

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

export function getResonatorAscension(resonator: string): AscensionMaterials[] {
  try {
    const folderName = resonator.toLowerCase().replace(/\s+/g, '-');
    const filePath = path.join(process.cwd(), 'data', 'resonators', folderName, 'ascension.json');

    if (!fs.existsSync(filePath)) {
      return [];
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const materials: AscensionMaterials[] = JSON.parse(fileContent);

    return materials;
  } catch (error) {
    console.error(`Error loading materials for ${resonator}:`, error);
    return [];
  }
}
