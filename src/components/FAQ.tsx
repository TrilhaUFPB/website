'use client'
import { useState } from 'react'

export default function FAQ() {
  const faqs = [
    { 
      question: 'Como posso me inscrever em um curso?', 
      answer: 'Você pode se inscrever através do nosso site ou entrando em contato com nossa equipe de atendimento.' 
    },
    { 
      question: 'Vocês oferecem certificados?', 
      answer: 'Sim, oferecemos certificados para todos os cursos concluídos com sucesso.' 
    },
    { 
      question: 'Há opções de pagamento parcelado?', 
      answer: 'Sim, oferecemos diversas opções de pagamento, incluindo parcelamento em até 12 vezes.' 
    },
  ]

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-gray-700">{faq.question}</span>
                <span className="text-gray-400">{activeIndex === index ? '-' : '+'}</span>
              </button>
              {activeIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

