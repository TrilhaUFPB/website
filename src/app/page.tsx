import Hero from '@/components/Hero'
import Sobre from '@/components/Sobre'
import Depoimentos from '@/components/Depoimentos'
import Turmas from '@/components/Turmas'
import QuemSomos from '@/components/QuemSomos'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="bg-Branco min-h-screen">
      <Hero />
      <Sobre />
      <Depoimentos />
      <Turmas />
      <QuemSomos />
      <FAQ />
      <Footer />
    </div>
  )
}

