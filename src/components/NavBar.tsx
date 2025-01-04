import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-transparent font-poppins">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">trilha</div>
        <div className="hidden md:flex space-x-4">
          <Link href="#sobre" className="text-gray-600 hover:text-gray-800">Sobre</Link>
          <Link href="#depoimentos" className="text-gray-600 hover:text-gray-800">Depoimentos</Link>
          <Link href="#turmas" className="text-gray-600 hover:text-gray-800">Turmas</Link>
          <Link href="#quem-somos" className="text-gray-600 hover:text-gray-800">Quem Somos</Link>
          <Link href="#faq" className="text-gray-600 hover:text-gray-800">FAQ</Link>
        </div>
      </div>
    </nav>
  )
}

