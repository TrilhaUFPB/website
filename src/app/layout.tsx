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

export const metadata: Metadata = {
  title: 'Trilha',
  description:
    'O Trilha é um programa gratuito feito por estudantes da UFPB para apoiar quem está chegando ao Centro de Informática.',
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
