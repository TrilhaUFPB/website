import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function AulasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="shell">{children}</main>
      <Footer />
    </>
  );
}
