export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <h3 className="text-lg font-semibold mb-2">Contato</h3>
              <p>Email: contato@exemplo.com</p>
              <p>Telefone: (11) 1234-5678</p>
            </div>
            <div className="w-full md:w-1/3 text-center mt-4 md:mt-0">
              <p>&copy; 2023 Sua Empresa. Todos os direitos reservados.</p>
            </div>
            <div className="w-full md:w-1/3 text-center md:text-right mt-4 md:mt-0">
              <h3 className="text-lg font-semibold mb-2">Redes Sociais</h3>
              <div className="space-x-4">
                <a href="#" className="hover:text-gray-300">Facebook</a>
                <a href="#" className="hover:text-gray-300">Instagram</a>
                <a href="#" className="hover:text-gray-300">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  