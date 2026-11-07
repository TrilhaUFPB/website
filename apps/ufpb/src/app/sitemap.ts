import type { MetadataRoute } from "next";
import { getAllMaterials } from "@/lib/materials";
import pt from "@/locales/pt/common.json";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://trilhaufpb.com"
).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/materiais", "/aulas", "/papers", "/turmas"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const materials = getAllMaterials().map((m) => ({
    url: `${siteUrl}/materiais/${m.area}/${m.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const papers = (pt.papers.items as { slug: string }[]).map((p) => ({
    url: `${siteUrl}/papers/${p.slug}.html`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...materials, ...papers];
}
