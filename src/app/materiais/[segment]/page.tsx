import { redirect, notFound } from "next/navigation";
import { getMaterialBySlugOnly, getAllMaterials } from "@/lib/materials";

interface SegmentPageProps {
  params: Promise<{ segment: string }>;
}

// Gera params para URLs com um único segmento (slug do material → redirect)
export async function generateStaticParams() {
  const materials = getAllMaterials();
  return materials.map((m) => ({ segment: m.slug }));
}

export default async function SegmentPage({ params }: SegmentPageProps) {
  const resolvedParams = await params;
  const segment = resolvedParams.segment;

  // Tenta encontrar material só pelo slug (ex: /materiais/introducao → python-basico/introducao)
  const material = getMaterialBySlugOnly(segment);
  if (material) {
    redirect(`/materiais/${material.area}/${material.slug}`);
  }

  notFound();
}
