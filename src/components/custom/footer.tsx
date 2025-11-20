"use client";

import { Briefcase, Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CareerCatalyst</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Impulsione sua carreira profissional com inteligência artificial. 
              Crie currículos otimizados, cartas personalizadas e prepare-se para entrevistas.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Produto</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-sm hover:text-indigo-400 transition-colors">
                  Recursos
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm hover:text-indigo-400 transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#demo" className="text-sm hover:text-indigo-400 transition-colors">
                  Demonstração
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm hover:text-indigo-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm hover:text-indigo-400 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Empresa</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-sm hover:text-indigo-400 transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-sm hover:text-indigo-400 transition-colors">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#blog" className="text-sm hover:text-indigo-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#careers" className="text-sm hover:text-indigo-400 transition-colors">
                  Carreiras
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm hover:text-indigo-400 transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">Email</p>
                  <a href="mailto:contato@careercatalyst.com" className="text-sm hover:text-indigo-400 transition-colors">
                    contato@careercatalyst.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">Telefone</p>
                  <a href="tel:+5511999999999" className="text-sm hover:text-indigo-400 transition-colors">
                    +55 (11) 99999-9999
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">Endereço</p>
                  <p className="text-sm">
                    São Paulo, SP<br />
                    Brasil
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} CareerCatalyst. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-indigo-400 transition-colors">
                Política de Privacidade
              </a>
              <a href="#terms" className="text-gray-400 hover:text-indigo-400 transition-colors">
                Termos de Uso
              </a>
              <a href="#cookies" className="text-gray-400 hover:text-indigo-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
