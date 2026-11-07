import type { MetadataRoute } from "next";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://otrilha.com"
).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/equipe", "/historia", "/ufpe"].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
