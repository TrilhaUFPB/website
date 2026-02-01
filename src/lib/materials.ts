import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface MaterialMetadata {
  area: string;        // Nova: área/categoria fixa
  slug: string;        // slug do material dentro da área
  title: string;
  description?: string;
  order?: number;
  icon?: string;
}

export interface Material extends MaterialMetadata {
  content: string;
}

export interface AreaStructure {
  name: string;
  slug: string;
  order: number;
  materials: MaterialMetadata[];
}

const materialsDirectory = path.join(process.cwd(), "src/content/materiais");

// Áreas fixas com ordem de exibição
const FIXED_AREAS = [
  { slug: "python-basico", name: "Python Básico", order: 1 },
  { slug: "frontend", name: "Frontend", order: 2 },
  { slug: "backend", name: "Backend", order: 3 },
  { slug: "dados", name: "Dados", order: 4 },
  { slug: "banco-de-dados", name: "Banco de Dados", order: 5 },
];

/**
 * Lê todos os materiais organizados por área
 * Estrutura: src/content/materiais/[area]/[material]/index.md
 */
export function getAllMaterials(): MaterialMetadata[] {
  try {
    if (!fs.existsSync(materialsDirectory)) {
      return [];
    }

    const materials: MaterialMetadata[] = [];

    // Itera sobre áreas fixas
    FIXED_AREAS.forEach((area) => {
      const areaPath = path.join(materialsDirectory, area.slug);
      
      if (!fs.existsSync(areaPath)) {
        return;
      }

      const materialDirs = fs.readdirSync(areaPath, { withFileTypes: true });

      materialDirs.forEach((entry) => {
        if (!entry.isDirectory()) {
          return;
        }

        const materialSlug = entry.name;
        const indexPath = path.join(areaPath, materialSlug, "index.md");

        if (!fs.existsSync(indexPath)) {
          return;
        }

        const fileContents = fs.readFileSync(indexPath, "utf8");
        const { data } = matter(fileContents);

        materials.push({
          area: area.slug,
          slug: materialSlug,
          title: data.title || formatSlugToTitle(materialSlug),
          description: data.description || "",
          order: data.order || 999,
          icon: data.icon || "📄",
        });
      });
    });

    // Ordena por área, depois por ordem, depois por título
    return materials.sort((a, b) => {
      const areaA = FIXED_AREAS.find(area => area.slug === a.area);
      const areaB = FIXED_AREAS.find(area => area.slug === b.area);
      
      if (areaA && areaB && areaA.order !== areaB.order) {
        return areaA.order - areaB.order;
      }
      
      if (a.order !== b.order) {
        return (a.order || 999) - (b.order || 999);
      }
      
      return a.title.localeCompare(b.title);
    });
  } catch (error) {
    console.error("Erro ao ler materiais:", error);
    return [];
  }
}

/**
 * Obtém um material específico por área e slug
 * Estrutura: src/content/materiais/[area]/[slug]/index.md
 */
export function getMaterialBySlug(area: string, slug: string): Material | null {
  try {
    const filePath = path.join(materialsDirectory, area, slug, "index.md");

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      area,
      slug,
      title: data.title || formatSlugToTitle(slug),
      description: data.description || "",
      order: data.order || 999,
      icon: data.icon || "📄",
      content,
    };
  } catch (error) {
    console.error(`Erro ao ler material ${area}/${slug}:`, error);
    return null;
  }
}

/**
 * Agrupa materiais por área (hierarquia de 2 níveis)
 */
export function getMaterialsByArea(): AreaStructure[] {
  const allMaterials = getAllMaterials();
  
  return FIXED_AREAS.map((area) => {
    const areaMaterials = allMaterials.filter((m) => m.area === area.slug);
    
    return {
      name: area.name,
      slug: area.slug,
      order: area.order,
      materials: areaMaterials,
    };
  });
}

/**
 * Obtém todas as áreas fixas
 */
export function getAllAreas() {
  return FIXED_AREAS;
}

/**
 * Extrai os headings do conteúdo markdown para o TOC
 */
export function extractHeadings(
  content: string
): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    headings.push({ id, text, level });
  }

  return headings;
}

/**
 * Formata slug para título
 */
function formatSlugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Busca um material apenas pelo slug (em qualquer área).
 * Útil para URLs com um único segmento: /materiais/introducao
 */
export function getMaterialBySlugOnly(slug: string): Material | null {
  for (const area of FIXED_AREAS) {
    const material = getMaterialBySlug(area.slug, slug);
    if (material) return material;
  }
  return null;
}

/**
 * Obtém materiais adjacentes (anterior e próximo) dentro da mesma área
 */
export function getAdjacentMaterials(area: string, slug: string): {
  prev: MaterialMetadata | null;
  next: MaterialMetadata | null;
} {
  const allMaterials = getAllMaterials();
  const areaMaterials = allMaterials.filter((m) => m.area === area);
  const currentIndex = areaMaterials.findIndex((m) => m.slug === slug);

  return {
    prev: currentIndex > 0 ? areaMaterials[currentIndex - 1] : null,
    next: currentIndex < areaMaterials.length - 1 ? areaMaterials[currentIndex + 1] : null,
  };
}

/**
 * Gera params estáticos para todas as combinações área/material
 */
export function generateAllMaterialParams(): { area: string; slug: string }[] {
  const allMaterials = getAllMaterials();
  return allMaterials.map((m) => ({
    area: m.area,
    slug: m.slug,
  }));
}
