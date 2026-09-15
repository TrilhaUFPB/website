import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import MaterialsSidebar from '@/components/materiais/MaterialsSidebar';
import { getMaterialsByArea } from '@/lib/materials';

export default function MateriaisLayout({ children }: { children: React.ReactNode }) {
  const areas = getMaterialsByArea();
  return (
    <>
      <NavBar />
      <main className="shell">
        <div className="materiais-shell">
          <MaterialsSidebar areas={areas} />
          <div className="materiais-content">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
