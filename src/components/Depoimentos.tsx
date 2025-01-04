export default function Depoimentos() {
    const testimonials = [
      { name: 'Maria Silva', text: 'Excelente experiência de aprendizado!' },
      { name: 'João Santos', text: 'Os instrutores são muito dedicados.' },
      { name: 'Ana Oliveira', text: 'Recomendo a todos que querem evoluir.' },
    ]
  
    return (
      <section id="depoimentos" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Depoimentos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <p className="text-gray-800 font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  