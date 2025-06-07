import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import HackathonsSection from '@/components/HackathonsSection';

export default function HackathonsPage() {
  return (
    <div className="bg-Branco min-h-screen">
      <Navbar />
      <HackathonsSection />
      <Footer />
    </div>
  );
}
