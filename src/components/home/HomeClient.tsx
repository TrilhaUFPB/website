'use client';

import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Sobre from '@/components/Sobre';
import Numbers from '@/components/Numbers';
import Turmas from '@/components/Turmas';
import Projects from '@/components/Projects';
import Depoimentos from '@/components/Depoimentos';
import QuemSomos from '@/components/QuemSomos';
import Materiais from '@/components/Materiais';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ScrollTracker from '@/components/ScrollTracker';
import { TickProvider, useReveal } from './shared';

export default function HomeClient() {
  useReveal();
  return (
    <TickProvider interval={3500}>
      <ScrollTracker />
      <NavBar />
      <main className="shell">
        <Hero />
        <Sobre />
        <Numbers />
        <Turmas />
        <Projects />
        <Depoimentos />
        <QuemSomos />
        <Materiais />
        <FAQ />
        <Footer />
      </main>
    </TickProvider>
  );
}
