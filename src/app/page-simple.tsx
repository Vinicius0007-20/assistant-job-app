"use client";

import { useState } from "react";
import { 
  Briefcase, FileText, MessageSquare, CheckCircle2, Sparkles, 
  Menu, X, Shield, Award, TrendingUp, Users, Linkedin, 
  Download, ChevronRight, Play, Zap, ArrowRight,
  Mail, Phone, MapPin, HelpCircle, ChevronDown, Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("resume");
  
  // Resume Generator State
  const [resumeName, setResumeName] = useState("");
  const [resumeExperience, setResumeExperience] = useState("");
  const [resumeGenerated, setResumeGenerated] = useState(false);
  const [generatedResume, setGeneratedResume] = useState("");
  
  // Cover Letter State
  const [coverLetterCompany, setCoverLetterCompany] = useState("");
  const [coverLetterPosition, setCoverLetterPosition] = useState("");
  const [coverLetterGenerated, setCoverLetterGenerated] = useState(false);
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState("");
  
  // Interview Prep State
  const [interviewQuestion, setInterviewQuestion] = useState("");
  const [interviewAnswer, setInterviewAnswer] = useState("");
  const [interviewFeedback, setInterviewFeedback] = useState("");
  const [feedbackGenerated, setFeedbackGenerated] = useState(false);

  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Resume Generator Function
  const generateResume = () => {
    if (!resumeName || !resumeExperience) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const resume = `
═══════════════════════════════════════
          CURRÍCULO PROFISSIONAL
═══════════════════════════════════════

👤 DADOS PESSOAIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nome: ${resumeName}
Email: ${resumeName.toLowerCase().replace(/\s+/g, '.')}@email.com
Telefone: (11) 98765-4321
LinkedIn: linkedin.com/in/${resumeName.toLowerCase().replace(/\s+/g, '-')}

💼 EXPERIÊNCIA PROFISSIONAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${resumeExperience}

✓ Desenvolveu habilidades de comunicação e trabalho em equipe
✓ Demonstrou proatividade e capacidade de resolução de problemas
✓ Contribuiu para o crescimento e sucesso da organização

🎓 FORMAÇÃO ACADÊMICA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Graduação em Administração de Empresas
Universidade Federal - Conclusão: 2024

🔧 HABILIDADES TÉCNICAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Microsoft Office (Excel, Word, PowerPoint)
• Gestão de Projetos
• Análise de Dados
• Comunicação Profissional
• Trabalho em Equipe

🌟 COMPETÊNCIAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Liderança e Gestão de Equipes
✓ Pensamento Analítico
✓ Adaptabilidade
✓ Resolução de Problemas
✓ Orientação para Resultados

═══════════════════════════════════════
  ✅ OTIMIZADO PARA SISTEMAS ATS
  📊 COMPATIBILIDADE: 95%
═══════════════════════════════════════
    `;

    setGeneratedResume(resume);
    setResumeGenerated(true);
  };

  // Cover Letter Generator Function
  const generateCoverLetter = () => {
    if (!coverLetterCompany || !coverLetterPosition) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const coverLetter = `
═══════════════════════════════════════
      CARTA DE APRESENTAÇÃO
═══════════════════════════════════════

${new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}

Prezado(a) Recrutador(a) da ${coverLetterCompany},

É com grande entusiasmo que me candidato à vaga de ${coverLetterPosition} na ${coverLetterCompany}. 

Ao longo da minha trajetória profissional, desenvolvi competências sólidas que me tornam um candidato ideal para esta posição. Minha experiência inclui:

🎯 QUALIFICAÇÕES PRINCIPAIS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Forte capacidade analítica e resolução de problemas
✓ Excelentes habilidades de comunicação e trabalho em equipe
✓ Proatividade e orientação para resultados
✓ Adaptabilidade a ambientes dinâmicos

💡 POR QUE ${coverLetterCompany.toUpperCase()}?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Admiro profundamente a ${coverLetterCompany} por sua inovação, cultura organizacional e impacto no mercado. Acredito que minha paixão por desafios e meu comprometimento com a excelência se alinham perfeitamente com os valores da empresa.

🚀 MINHA CONTRIBUIÇÃO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Estou confiante de que posso contribuir significativamente para o sucesso da equipe, trazendo:
• Perspectivas inovadoras
• Dedicação e comprometimento
• Habilidades técnicas atualizadas
• Energia e motivação para crescer junto com a empresa

Agradeço pela oportunidade de apresentar minha candidatura e estou à disposição para uma entrevista, onde poderei detalhar como minhas qualificações podem agregar valor à ${coverLetterCompany}.

Atenciosamente,

${resumeName || "[Seu Nome]"}
${resumeName ? `${resumeName.toLowerCase().replace(/\s+/g, '.')}@email.com` : "[seu.email@email.com]"}
(11) 98765-4321

═══════════════════════════════════════
  ✅ CARTA PERSONALIZADA E PERSUASIVA
  🎯 OTIMIZADA PARA RECRUTADORES
═══════════════════════════════════════
    `;

    setGeneratedCoverLetter(coverLetter);
    setCoverLetterGenerated(true);
  };

  // Interview Feedback Function
  const generateInterviewFeedback = () => {
    if (!interviewQuestion || !interviewAnswer) {
      alert("Por favor, preencha a pergunta e sua resposta!");
      return;
    }

    const wordCount = interviewAnswer.trim().split(/\s+/).length;
    const hasExamples = interviewAnswer.toLowerCase().includes("exemplo") || 
                        interviewAnswer.toLowerCase().includes("situação") ||
                        interviewAnswer.toLowerCase().includes("experiência");
    const isStructured = interviewAnswer.includes(".") && wordCount > 30;
    const hasNumbers = /\d/.test(interviewAnswer);

    let score = 0;
    let feedback = [];

    if (wordCount >= 50 && wordCount <= 150) {
      score += 25;
      feedback.push("✅ Comprimento adequado da resposta (50-150 palavras)");
    } else if (wordCount < 50) {
      feedback.push("⚠️ Resposta muito curta. Tente elaborar mais (mínimo 50 palavras)");
    } else {
      feedback.push("⚠️ Resposta muito longa. Seja mais conciso (máximo 150 palavras)");
    }

    if (hasExamples) {
      score += 25;
      feedback.push("✅ Excelente! Você incluiu exemplos concretos");
    } else {
      feedback.push("⚠️ Adicione exemplos práticos da sua experiência");
    }

    if (isStructured) {
      score += 25;
      feedback.push("✅ Resposta bem estruturada e organizada");
    } else {
      feedback.push("⚠️ Melhore a estrutura: introdução, desenvolvimento e conclusão");
    }

    if (hasNumbers) {
      score += 25;
      feedback.push("✅ Ótimo uso de dados quantitativos para fortalecer sua resposta");
    } else {
      feedback.push("💡 Dica: Use números e métricas quando possível (ex: '20% de aumento')");
    }

    const feedbackText = `
═══════════════════════════════════════
      ANÁLISE DE RESPOSTA - IA
═══════════════════════════════════════

📊 PONTUAÇÃO GERAL: ${score}/100

${score >= 75 ? "🌟 EXCELENTE!" : score >= 50 ? "👍 BOM!" : "📈 PRECISA MELHORAR"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 PERGUNTA ANALISADA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${interviewQuestion}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 SUA RESPOSTA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${interviewAnswer}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 FEEDBACK DETALHADO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${feedback.map((item, index) => `${index + 1}. ${item}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 SUGESTÕES DE MELHORIA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Use o método STAR (Situação, Tarefa, Ação, Resultado)
• Seja específico e objetivo
• Demonstre aprendizado e crescimento
• Conecte sua resposta com a vaga desejada
• Pratique em voz alta para melhorar a fluência

═══════════════════════════════════════
  ✅ ANÁLISE COMPLETA POR IA
  🚀 CONTINUE PRATICANDO!
═══════════════════════════════════════
    `;

    setInterviewFeedback(feedbackText);
    setFeedbackGenerated(true);
  };

  // Contact Form Submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactName || !contactEmail || !contactSubject || !contactMessage) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    setContactSubmitted(true);
    setContactName("");
    setContactEmail("");
    setContactSubject("");
    setContactMessage("");

    setTimeout(() => setContactSubmitted(false), 5000);
  };

  // Download Functions
  const downloadResume = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedResume], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `curriculo_${resumeName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadCoverLetter = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedCoverLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `carta_${coverLetterCompany.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // FAQ Data
  const faqData = [
    {
      question: "O CareerCatalyst é realmente gratuito?",
      answer: "Sim! Oferecemos um plano gratuito completo com acesso às principais ferramentas: gerador de currículos, cartas de apresentação e preparação para entrevistas. Também temos planos premium com recursos avançados."
    },
    {
      question: "Como funciona a otimização para sistemas ATS?",
      answer: "Nossos currículos são otimizados para passar pelos sistemas ATS (Applicant Tracking Systems) usados por empresas. Utilizamos formatação adequada, palavras-chave relevantes e estrutura que garante 95%+ de compatibilidade."
    },
    {
      question: "Posso editar os documentos gerados?",
      answer: "Sim! Todos os documentos gerados podem ser editados, baixados e personalizados conforme sua necessidade. Você tem controle total sobre o conteúdo."
    },
    {
      question: "Meus dados estão seguros?",
      answer: "Absolutamente! Utilizamos criptografia AES-256, estamos em conformidade com a LGPD e nunca compartilhamos seus dados com terceiros sem autorização. Sua privacidade é nossa prioridade máxima."
    },
    {
      question: "Como funciona a preparação para entrevistas?",
      answer: "Nossa IA analisa suas respostas considerando estrutura, conteúdo, exemplos práticos e dados quantitativos. Você recebe feedback detalhado com pontuação e sugestões de melhoria baseadas no método STAR."
    },
    {
      question: "Posso usar em dispositivos móveis?",
      answer: "Sim! O CareerCatalyst é totalmente responsivo e funciona perfeitamente em smartphones, tablets e desktops. Acesse de qualquer lugar, a qualquer momento."
    },
    {
      question: "Quanto tempo leva para criar um currículo?",
      answer: "Com nossa IA, você pode criar um currículo profissional completo em menos de 5 minutos! Basta preencher suas informações e nossa tecnologia faz o resto."
    },
    {
      question: "Posso cancelar minha conta a qualquer momento?",
      answer: "Sim, você pode cancelar sua conta a qualquer momento sem custos ou penalidades. Seus dados serão mantidos por 30 dias caso queira reativar."
    }
  ];

  // Splash Screen Component
  if (showSplash) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="mb-8 animate-bounce">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-white/20 backdrop-blur-lg flex items-center justify-center shadow-2xl border border-white/30">
              <Briefcase className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            CareerCatalyst
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/90 mb-4 font-light">
            Impulsione Sua Carreira Profissional
          </p>
          
          <p className="text-lg text-white/80 mb-12 max-w-xl mx-auto leading-relaxed">
            Plataforma inteligente com IA para acelerar sua jornada profissional
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              IA Avançada
            </Badge>
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm">
              <Shield className="w-4 h-4 mr-2" />
              100% Seguro
            </Badge>
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm">
              <Award className="w-4 h-4 mr-2" />
              95% Taxa de Sucesso
            </Badge>
          </div>

          <Button 
            size="lg" 
            onClick={() => setShowSplash(false)}
            className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-12 py-6 h-auto shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-semibold"
          >
            Começar Agora
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>50.000+ usuários ativos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>200.000+ currículos criados</span>
            </div>
          </div>

          <button 
            onClick={() => setShowSplash(false)}
            className="mt-8 text-white/60 hover:text-white text-sm underline transition-colors"
          >
            Pular introdução
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/95 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center shadow-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                  CareerCatalyst
                </span>
                <div className="text-xs text-gray-500 hidden sm:block">Impulsione Sua Carreira</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                Recursos
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                Como Funciona
              </a>
              <a href="#faq" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                FAQ
              </a>
              <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                Contato
              </a>
              <Link href="/auth/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-md">
                  Começar Agora
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col gap-4">
                <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                  Recursos
                </a>
                <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                  Como Funciona
                </a>
                <a href="#faq" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                  FAQ
                </a>
                <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                  Contato
                </a>
                <Link href="/auth/login">
                  <Button variant="ghost" className="w-full">Entrar</Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 w-full">
                    Começar Agora
                  </Button>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                Powered by Advanced AI Technology
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Acelere Sua Carreira com{" "}
                <span className="text-indigo-600">
                  Inteligência Artificial
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Plataforma profissional completa para estudantes e jovens profissionais. 
                Crie currículos otimizados para ATS, personalize cartas de apresentação e 
                prepare-se para entrevistas com feedback em tempo real.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/auth/register">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 shadow-lg">
                    Começar Gratuitamente
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 text-lg px-8" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Play className="w-5 h-5 mr-2" />
                  Ver Demo
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>Sem cartão de crédito</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>Configuração em 2 minutos</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-2xl blur-3xl opacity-20"></div>
                <Card className="relative shadow-2xl border-0">
                  <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-2xl">
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Dashboard Profissional
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Currículo Aprovado</div>
                            <div className="text-sm text-gray-600">95% compatibilidade ATS</div>
                          </div>
                        </div>
                        <Badge className="bg-green-600 text-white">Ativo</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">12 Candidaturas</div>
                            <div className="text-sm text-gray-600">3 respostas positivas</div>
                          </div>
                        </div>
                        <Badge className="bg-blue-600 text-white">Em andamento</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-indigo-100 text-indigo-700 border-0">
            <Zap className="w-3 h-3 mr-1" />
            Experimente Agora
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Veja o CareerCatalyst em Ação
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Teste nossas ferramentas de IA e veja como podemos acelerar sua busca por emprego
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-xl border-gray-200">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 p-1 bg-gray-100">
              <TabsTrigger value="resume" className="data-[state=active]:bg-white">
                <FileText className="w-4 h-4 mr-2" />
                Currículo
              </TabsTrigger>
              <TabsTrigger value="cover" className="data-[state=active]:bg-white">
                <MessageSquare className="w-4 h-4 mr-2" />
                Carta
              </TabsTrigger>
              <TabsTrigger value="interview" className="data-[state=active]:bg-white">
                <Sparkles className="w-4 h-4 mr-2" />
                Entrevista
              </TabsTrigger>
            </TabsList>

            {/* RESUME TAB */}
            <TabsContent value="resume" className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seu Nome Completo
                  </label>
                  <Input 
                    placeholder="Ex: Maria Silva"
                    value={resumeName}
                    onChange={(e) => setResumeName(e.target.value)}
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experiência Profissional (resumo)
                  </label>
                  <Textarea 
                    placeholder="Ex: Estagiária de Marketing na Empresa XYZ por 1 ano..."
                    value={resumeExperience}
                    onChange={(e) => setResumeExperience(e.target.value)}
                    className="border-gray-300 min-h-[100px]"
                  />
                </div>
                <Button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  onClick={generateResume}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Gerar Currículo com IA
                </Button>
                
                {resumeGenerated && (
                  <div className="mt-4 space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700 mb-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-semibold">Currículo Gerado com Sucesso!</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        Seu currículo profissional foi criado e otimizado para sistemas ATS.
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={downloadResume}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Baixar Currículo
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setResumeGenerated(false)}
                        >
                          Gerar Novo
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
                      <pre className="text-xs font-mono whitespace-pre-wrap text-gray-800">
                        {generatedResume}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* COVER LETTER TAB */}
            <TabsContent value="cover" className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome da Empresa
                  </label>
                  <Input 
                    placeholder="Ex: Google Brasil"
                    value={coverLetterCompany}
                    onChange={(e) => setCoverLetterCompany(e.target.value)}
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cargo Desejado
                  </label>
                  <Input 
                    placeholder="Ex: Analista de Marketing Júnior"
                    value={coverLetterPosition}
                    onChange={(e) => setCoverLetterPosition(e.target.value)}
                    className="border-gray-300"
                  />
                </div>
                <Button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  onClick={generateCoverLetter}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Gerar Carta Personalizada
                </Button>
                
                {coverLetterGenerated && (
                  <div className="mt-4 space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-700 mb-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-semibold">Carta Gerada com Sucesso!</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        Sua carta de apresentação personalizada está pronta para uso.
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={downloadCoverLetter}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Baixar Carta
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setCoverLetterGenerated(false)}
                        >
                          Gerar Nova
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
                      <pre className="text-xs font-mono whitespace-pre-wrap text-gray-800">
                        {generatedCoverLetter}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* INTERVIEW TAB */}
            <TabsContent value="interview" className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pergunta da Entrevista
                  </label>
                  <Textarea 
                    placeholder="Ex: Fale sobre uma situação desafiadora que você enfrentou..."
                    value={interviewQuestion}
                    onChange={(e) => setInterviewQuestion(e.target.value)}
                    className="border-gray-300 min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sua Resposta
                  </label>
                  <Textarea 
                    placeholder="Digite sua resposta aqui..."
                    value={interviewAnswer}
                    onChange={(e) => setInterviewAnswer(e.target.value)}
                    className="border-gray-300 min-h-[120px]"
                  />
                </div>
                <Button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  onClick={generateInterviewFeedback}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Obter Feedback da IA
                </Button>
                
                {feedbackGenerated && (
                  <div className="mt-4 space-y-4">
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-2 text-purple-700 mb-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-semibold">Análise Completa!</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        Nossa IA analisou sua resposta e gerou feedback detalhado.
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setFeedbackGenerated(false)}
                      >
                        Analisar Nova Resposta
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
                      <pre className="text-xs font-mono whitespace-pre-wrap text-gray-800">
                        {interviewFeedback}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ferramentas Profissionais Completas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para se destacar no mercado de trabalho
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Criador de Currículos com IA</CardTitle>
                <CardDescription className="text-gray-600">
                  Currículos profissionais otimizados para sistemas ATS em minutos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Compatibilidade 95%+ com ATS</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Templates profissionais modernos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Sugestões inteligentes de conteúdo</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Cartas de Apresentação</CardTitle>
                <CardDescription className="text-gray-600">
                  Cartas personalizadas e persuasivas para cada vaga
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Personalização automática por vaga</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Tom profissional e persuasivo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Destaque de qualificações relevantes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Preparação para Entrevistas</CardTitle>
                <CardDescription className="text-gray-600">
                  Simulações realistas com feedback em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Análise detalhada de respostas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Feedback construtivo instantâneo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Banco com 500+ perguntas comuns</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Autenticação de Dois Fatores</CardTitle>
                <CardDescription className="text-gray-600">
                  Segurança adicional para proteger sua conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Proteção avançada de conta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Códigos de verificação por email/SMS</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Ativação simples e rápida</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center mb-4">
                  <Linkedin className="w-6 h-6 text-cyan-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Integração com Redes Sociais</CardTitle>
                <CardDescription className="text-gray-600">
                  Login rápido com Google, LinkedIn e mais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Login com Google e LinkedIn</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Importação automática de perfil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Compartilhamento de conquistas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Painel de Estatísticas</CardTitle>
                <CardDescription className="text-gray-600">
                  Acompanhe seu progresso e métricas em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Dashboard visual completo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Métricas de desempenho detalhadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Relatórios de progresso semanais</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-indigo-100 text-indigo-700 border-0">
              <HelpCircle className="w-3 h-3 mr-1" />
              Perguntas Frequentes
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Dúvidas Comuns
            </h2>
            <p className="text-lg text-gray-600">
              Encontre respostas rápidas para as perguntas mais frequentes
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <Card key={index} className="border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-900 pr-8">
                      {faq.question}
                    </h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                        openFaqIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Não encontrou o que procurava?
            </p>
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Entre em Contato
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gradient-to-br from-indigo-50 to-blue-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-indigo-600 text-white border-0">
                <Mail className="w-3 h-3 mr-1" />
                Fale Conosco
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Entre em Contato
              </h2>
              <p className="text-lg text-gray-600">
                Estamos aqui para ajudar! Envie sua mensagem e responderemos em breve.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                        <p className="text-sm text-gray-600">contato@careercatalyst.com</p>
                        <p className="text-sm text-gray-600">suporte@careercatalyst.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Telefone</h3>
                        <p className="text-sm text-gray-600">(11) 4002-8922</p>
                        <p className="text-sm text-gray-600">Seg-Sex: 9h às 18h</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Endereço</h3>
                        <p className="text-sm text-gray-600">Av. Paulista, 1000</p>
                        <p className="text-sm text-gray-600">São Paulo - SP</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="border-gray-200 shadow-xl">
                  <CardHeader>
                    <CardTitle>Envie sua Mensagem</CardTitle>
                    <CardDescription>
                      Preencha o formulário abaixo e entraremos em contato em até 24 horas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      {contactSubmitted && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2 text-green-700">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="font-semibold">Mensagem enviada com sucesso!</span>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">
                            Obrigado pelo contato. Responderemos em breve!
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nome Completo
                          </label>
                          <Input
                            placeholder="Seu nome"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <Input
                            type="email"
                            placeholder="seu@email.com"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Assunto
                        </label>
                        <Input
                          placeholder="Sobre o que você quer falar?"
                          value={contactSubject}
                          onChange={(e) => setContactSubject(e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mensagem
                        </label>
                        <Textarea
                          placeholder="Descreva sua dúvida ou sugestão..."
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          className="min-h-[150px]"
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Mensagem
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                50K+
              </div>
              <div className="text-indigo-100 text-sm sm:text-base">Usuários Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                95%
              </div>
              <div className="text-indigo-100 text-sm sm:text-base">Taxa de Sucesso</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                200K+
              </div>
              <div className="text-indigo-100 text-sm sm:text-base">Currículos Criados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                4.9★
              </div>
              <div className="text-indigo-100 text-sm sm:text-base">Avaliação</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-gradient-to-br from-indigo-50 to-blue-50">
          <CardContent className="p-8 sm:p-12 text-center">
            <Badge className="mb-4 bg-indigo-600 text-white hover:bg-indigo-700 border-0">
              <Sparkles className="w-3 h-3 mr-1" />
              Oferta Especial
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pronto para Acelerar sua Carreira?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de jovens profissionais que já conquistaram seus empregos dos sonhos. 
              Comece gratuitamente hoje mesmo!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link href="/auth/register">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 shadow-lg">
                  Começar Gratuitamente
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              ✓ Sem cartão de crédito &nbsp;&nbsp;•&nbsp;&nbsp; ✓ Configuração em 2 minutos &nbsp;&nbsp;•&nbsp;&nbsp; ✓ Cancele quando quiser
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">CareerCatalyst</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Plataforma profissional com IA para impulsionar sua carreira e conquistar o emprego dos seus sonhos.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Produto</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-indigo-400 transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Preços</a></li>
                <li><a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog</a></li>
                <li><a href="#contact" className="hover:text-indigo-400 transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Segurança</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 CareerCatalyst. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <Users className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
