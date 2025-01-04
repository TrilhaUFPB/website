export default function Turmas() {
    const classes = [
      { name: 'Programação Básica', schedule: 'Segundas e Quartas, 19h-21h' },
      { name: 'Design Gráfico', schedule: 'Terças e Quintas, 18h-20h' },
      { name: 'Marketing Digital', schedule: 'Sextas, 14h-18h' },
    ]
  
    return (
      <section id="turmas" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Nossas Turmas</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {classes.map((cls, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{cls.name}</h3>
                <p className="text-gray-600">{cls.schedule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  