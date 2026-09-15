import type { Metadata } from "next";
import "./globals.css";
import "@/components/campus/campus.css";
import "./internal.css";
import {
  JetBrains_Mono,
  Poppins,
  Space_Grotesk,
} from "next/font/google";
import { I18nProvider } from "./i18n-provider";
import { PostHogProvider } from "./posthog-provider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://trilhaufpb.com";
const description =
  "Programa gratuito de programação, projetos e mentoria na UFPB. Aulas, materiais e uma comunidade de estudantes para aprender fazendo.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Trilha UFPB",
    template: "%s | Trilha UFPB",
  },
  description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Trilha UFPB",
    title: "Trilha UFPB",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Trilha UFPB",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" data-bg="grid">
      <body
        className={`${poppins.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <PostHogProvider>
          <I18nProvider>{children}</I18nProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
