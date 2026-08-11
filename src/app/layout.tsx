import type { Metadata } from 'next';
import './globals.css';
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { I18nProvider } from './i18n-provider';
import { PostHogProvider } from './posthog-provider';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://otrilha.com';
const description =
  'O Trilha é um programa gratuito feito por estudantes da UFPB para apoiar quem está chegando ao Centro de Informática.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Trilha',
    template: '%s | Trilha',
  },
  description,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: 'Trilha',
    title: 'Trilha',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trilha',
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
        className={`${dmSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <PostHogProvider>
          <I18nProvider>{children}</I18nProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
