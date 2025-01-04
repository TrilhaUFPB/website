export default function QuemSomos() {
    const team = [
      { name: 'Dr. Carlos Mendes', role: 'Diretor Acadêmico' },
      { name: 'Profa. Beatriz Lima', role: 'Coordenadora de Cursos' },
      { name: 'Paulo Rodrigues', role: 'Instrutor Sênior' },
    ]
  
    return (
      <section id="quem-somos" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Quem Somos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  