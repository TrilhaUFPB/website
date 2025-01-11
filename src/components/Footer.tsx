import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";
import DynamicGrid from "./DynamicGrid";

export default function Footer() {
  const sections = [
    { name: "Sobre", href: "#sobre" },
    { name: "Depoimentos", href: "#depoimentos" },
    { name: "Turmas", href: "#turmas" },
    { name: "Quem Somos", href: "#quem-somos" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <footer className="bg-BrancoCreme text-AzulMeiaNoite py-12 relative">
      <DynamicGrid cellSize={50} className="opacity-5 z-0" numberOfCells={50}/>
      <div className="container px-6 md:px-12 lg:px-28 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12 lg:gap-4 text-center md:text-left">
          <div className="col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold font-poppins">
              Trilha UFPB
            </h1>
            <p className="text-lg md:text-2xl font-spaceGrotesk font-bold mt-4 md:pr-16">
              Capacitando e inspirando estudantes para um futuro brilhante.
            </p>
            <div className="flex justify-center md:justify-start space-x-6 mt-6">
              <a
                href="https://www.instagram.com/trilhaufpb/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-AzulMeiaNoite hover:text-VerdeMenta transition-colors"
              >
                <Instagram size={28} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/company/trilhaufpb"
                target="_blank"
                rel="noopener noreferrer"
                className="text-AzulMeiaNoite hover:text-VerdeMenta transition-colors"
              >
                <Linkedin size={28} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="text-left sm:ml-24 ">
            <h3 className="text-lg font-semibold font-poppins">
              Contato
            </h3>
            <p className="text-sm font-spaceGrotesk mt-4 mb-4">
              Email: contato.trilhaufpb@gmail.com
            </p>
          </div>

          <div className="text-left sm:ml-24">
            <h3 className="text-lg font-semibold font-poppins">
              Seções
            </h3>
            <ul className="mt-4 space-y-2">
              {sections.map((section) => (
                <li key={section.name}>
                  <Link
                    href={section.href}
                    className="text-sm font-spaceGrotesk hover:text-VerdeMenta transition-colors"
                  >
                    {section.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-AzulMeiaNoite text-center">
          <p className="text-sm font-poppins">
            &copy; {new Date().getFullYear()} Trilha UFPB. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
