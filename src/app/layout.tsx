import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Space_Grotesk } from "next/font/google";
import { I18nProvider } from "./i18n-provider";
import { PostHogProvider } from "./posthog-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Trilha",
  description:
    "Iniciando a graduação com experiências práticas e relacionamentos duradouros.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${poppins.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <PostHogProvider>
          <I18nProvider>{children}</I18nProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}