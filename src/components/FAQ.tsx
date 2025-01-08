"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Divider from "@/components/ui/divider";

export default function FAQ() {
  const faqs = [
    { 
      question: "É para todos os cursos?", 
      answer: "Sim, o programa é aberto a estudantes de qualquer curso, não sendo restrito apenas à UFPB." 
    },
    { 
      question: "Como posso me inscrever?", 
      answer: "As inscrições abrem periodicamente, sempre que uma turma termina, no início de cada semestre letivo." 
    },
    { 
      question: "Quantas turmas existem?", 
      answer: "Há apenas uma turma por semestre." 
    },
    { 
      question: "Todo mundo pode assistir às aulas?", 
      answer: "Não, somente os participantes oficialmente inscritos no programa podem assistir às aulas." 
    },
    { 
      question: "O projeto está associado a algum laboratório?", 
      answer: "Não, o programa não está vinculado a nenhum laboratório. Trata-se de um grupo de estudantes independentes. No entanto, o Trilha oferece as habilidades necessárias para que os participantes se integrem a qualquer laboratório do Centro de Informática, com muitos ingressando logo após o término do programa." 
    },
    { 
      question: "Quanto tempo dura uma turma?", 
      answer: "Cada turma tem a duração média de um semestre, equivalente a seis meses. No entanto, o período exato pode variar de acordo com o período letivo da UFPB." 
    },
    { 
      question: "Não passei, posso tentar novamente?", 
      answer: "Sim, você pode tentar novamente na próxima turma, quando as inscrições forem abertas." 
    },
    { 
      question: "Quem pode participar?", 
      answer: "Qualquer pessoa interessada em tecnologia e em aprender pode participar, independentemente do nível de conhecimento atual. No entanto, nosso foco são em alunos que acabaram de ingressar na faculdade e possuem pouco ou nenhum conhecimento de programação." 
    },
    { 
      question: "Precisa saber programar?", 
      answer: "Não, o programa é focado em estudantes que estão começando agora no mundo da tecnologia e não exige conhecimento prévio em programação." 
    },
    { 
      question: "É gratuito?", 
      answer: "Sim, o programa é totalmente gratuito." 
    },
    { 
      question: "Tem limite de pessoas por turma?", 
      answer: "Sim, o número de participantes é limitado para garantir um ambiente mais interativo e personalizado." 
    },
    { 
      question: "Qual a cor favorita de Tiago?", 
      answer: "Uma das perguntas mais frequentes no Trilha, e a cor favorita de Tiago é " + getFavoriteColor() + ", obviamente.", 
    },
    { 
      question: "Posso entrar na organização?", 
      answer: "Se tiver interesse em fazer parte da organização, entre em contato com a equipe do Trilha para verificar se há necessidade de novas pessoas no momento." 
    },
    { 
      question: "Quem são os tutores?", 
      answer: "Os tutores são estudantes veteranos dos cursos de tecnologia da UFPB, com experiência na área, tais como estágios e empregos em diversas empresas." 
    },
    { 
      question: "Onde são as aulas?", 
      answer: "As aulas são realizadas no Centro de Informática (CI) da UFPB." 
    },
  ];

  function getFavoriteColor() {
    const day = new Date().getDay();
    const colors = [
      "Vermelho", // Domingo
      "Azul",     // Segunda-feira
      "Verde",    // Terça-feira
      "Amarelo",  // Quarta-feira
      "Laranja",  // Quinta-feira
      "Roxo",     // Sexta-feira
      "Preto",     // Sábado
    ];
    return colors[day];
  }

  return (
    <section id="faq" className="py-20 bg-AzulMeiaNoite">
      <div className="container max-w-7xl mx-auto px-6">
        <h2 className="text-1xl font-bold text-center text-AzulCeu font-poppins mb-3">
          FAQ
        </h2>
        <h1 className="text-3xl font-extrabold text-center text-BrancoCreme mb-12 font-poppins">
          Tem dúvidas?
        </h1>
        
        <div className="space-y-5">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={`faq-${index}`} value={`item-${index}`}>
                <AccordionTrigger className="text-BrancoCreme text-lg font-semibold p-4 rounded-lg font-poppins text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="bg-AzulMeiaNoite">
                  <div className="text-BrancoCreme font-spaceGrotesk mb-4">
                    {faq.answer}
                  </div>
                </AccordionContent>
                <Divider />
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
