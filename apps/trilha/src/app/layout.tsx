import type { Metadata } from "next";
import "./globals.css";
import {
  DM_Sans,
  Instrument_Serif,
  JetBrains_Mono,
  Poppins,
  Space_Grotesk,
} from "next/font/google";

import { PostHogProvider } from "./posthog-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://otrilha.com";
const description =
  "Uma comunidade de estudantes que abre caminhos para aprender, se conectar e construir, com Trilha UFPB, Momento, Hack The Path e Trilha UFPE.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Trilha",
    template: "%s | Trilha",
  },
  description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Trilha",
    title: "Trilha",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Trilha",
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
        className={`${poppins.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
