import Link from 'next/link'
import { Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const sections = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Turmas', href: '#turmas' },
    { name: 'Quem Somos', href: '#quem-somos' },
    { name: 'FAQ', href: '#faq' },
  ]

  return (
    <footer className="bg-gray-100 text-gray-600 py-12 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Trilha UFPB</h3>
            <p className="text-sm">Capacitando e inspirando estudantes para um futuro brilhante.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Seções</h3>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.name}>
                  <Link href={section.href} className="text-sm hover:text-gray-800 transition-colors">
                    {section.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Contato</h3>
            <p className="text-sm">Email: contato@trilhaufpb.com</p>
            <p className="text-sm">Telefone: (83) 1234-5678</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/trilhaufpb/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/company/trilhaufpb"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Trilha UFPB. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

