import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMaterialAssetPath(materialName: string, materialType?: string): string {
  if (materialType === 'boss') {
    // Boss materials are in a subdirectory
    return `/assets/materials/boss/${materialName.replace(/\s+/g, '_')}.png`;
  }

  // Convert material name to lowercase filename format
  // Example: "Luminous Calendula" -> "luminous_calendula.png"
  const filename = materialName.toLowerCase().replace(/\s+/g, '_') + '.png';
  return `/assets/materials/${filename}`;
}
