"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Como funciona o CareerCatalyst?",
    answer: "O CareerCatalyst é uma plataforma inteligente que utiliza IA para ajudá-lo a criar currículos profissionais, cartas de apresentação personalizadas e preparar-se para entrevistas. Basta inserir suas informações e nossa IA gera documentos otimizados para sistemas ATS (Applicant Tracking Systems)."
  },
  {
    question: "O CareerCatalyst é gratuito?",
    answer: "Sim! Oferecemos um plano gratuito com acesso às principais funcionalidades. Você pode criar currículos, cartas de apresentação e praticar entrevistas sem custo. Também temos planos premium com recursos avançados para quem busca ainda mais vantagens."
  },
  {
    question: "Meus dados estão seguros?",
    answer: "Absolutamente! Levamos a segurança dos seus dados muito a sério. Todas as informações são criptografadas e armazenadas com segurança. Nunca compartilhamos seus dados pessoais com terceiros sem sua autorização explícita."
  },
  {
    question: "O que é otimização ATS?",
    answer: "ATS (Applicant Tracking System) são sistemas que empresas usam para filtrar currículos automaticamente. Nossos currículos são otimizados com palavras-chave relevantes e formatação adequada para passar por esses filtros e chegar aos recrutadores."
  },
  {
    question: "Posso editar os documentos gerados?",
    answer: "Sim! Todos os documentos gerados podem ser baixados e editados conforme sua necessidade. Você tem controle total sobre o conteúdo final."
  },
  {
    question: "Como funciona a preparação para entrevistas?",
    answer: "Nossa ferramenta de preparação para entrevistas analisa suas respostas usando IA e fornece feedback detalhado sobre estrutura, conteúdo e pontos de melhoria. É como ter um coach de carreira pessoal disponível 24/7."
  },
  {
    question: "Posso usar o CareerCatalyst em dispositivos móveis?",
    answer: "Sim! Nossa plataforma é totalmente responsiva e funciona perfeitamente em smartphones, tablets e computadores. Você pode acessar suas ferramentas de carreira de qualquer lugar."
  },
  {
    question: "Quanto tempo leva para criar um currículo?",
    answer: "Com o CareerCatalyst, você pode criar um currículo profissional em menos de 5 minutos! Basta preencher suas informações básicas e nossa IA faz o resto."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 mb-6">
            <HelpCircle className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tire suas dúvidas sobre o CareerCatalyst
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-indigo-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <CardContent className="px-6 pb-6 pt-0">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Ainda tem dúvidas?
          </p>
          <a
            href="#chat"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
          >
            Fale com nosso suporte ao vivo
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
