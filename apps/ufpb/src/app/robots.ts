import type { MetadataRoute } from "next";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://trilhaufpb.com"
).replace(/\/$/, "");

const PRIVATE_PATHS = ["/admin", "/api/", "/ingest/", "/metrics", "/dev/"];

// Política de crawlers de IA, separada por finalidade. O conteúdo do site é
// educacional e aberto, então liberamos tudo. Para bloquear treinamento sem
// perder citações em respostas de IA, mova AI_TRAINING_BOTS para `disallow: "/"`.
const AI_SEARCH_BOTS = ["OAI-SearchBot", "PerplexityBot", "Claude-SearchBot"];
const AI_USER_BOTS = ["ChatGPT-User", "Claude-User", "Perplexity-User"];
const AI_TRAINING_BOTS = ["GPTBot", "ClaudeBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      ...[...AI_SEARCH_BOTS, ...AI_USER_BOTS, ...AI_TRAINING_BOTS].map(
        (userAgent) => ({ userAgent, allow: "/", disallow: PRIVATE_PATHS }),
      ),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
