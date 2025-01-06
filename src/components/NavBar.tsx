import Link from "next/link";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative text-gray-600 hover:text-gray-800 transition-all duration-300 group"
    >
      {children}
      <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 rounded bg-AzulCeu transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-b from-AzulCeu/10 to-AzulCeu/0 font-poppins">
      <div className="container mx-auto px-4 md:px-28 py-5 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">trilha</div>
        <div className="hidden md:flex space-x-12">
          <NavLink href="#sobre">Sobre</NavLink>
          <NavLink href="#depoimentos">Depoimentos</NavLink>
          <NavLink href="#turmas">Turmas</NavLink>
          <NavLink href="#quem-somos">Quem Somos</NavLink>
          <NavLink href="#faq">FAQ</NavLink>
        </div>
      </div>
    </nav>
  );
}
