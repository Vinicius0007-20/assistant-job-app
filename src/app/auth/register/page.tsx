"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Briefcase, Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    if (!acceptTerms) {
      setError("Você precisa aceitar os termos de uso!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Criar registro na tabela users
        const { error: userError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: email,
            full_name: name,
          });

        if (userError) throw userError;

        // Criar progresso inicial do usuário
        const { error: progressError } = await supabase
          .from('user_progress')
          .insert({
            user_id: authData.user.id,
            resumes_created: 0,
            cover_letters_created: 0,
            interviews_practiced: 0,
            total_score: 0,
            achievements: []
          });

        if (progressError) throw progressError;

        // Criar notificação de boas-vindas
        await supabase
          .from('notifications')
          .insert({
            user_id: authData.user.id,
            title: "Bem-vindo ao CareerCatalyst!",
            message: "Comece criando seu primeiro currículo profissional.",
            type: "welcome",
            read: false
          });

        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = password.length >= 8 ? "forte" : password.length >= 6 ? "média" : "fraca";
  const passwordColor = passwordStrength === "forte" ? "text-green-600" : passwordStrength === "média" ? "text-yellow-600" : "text-red-600";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center shadow-lg">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">CareerCatalyst</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crie sua conta</h1>
          <p className="text-gray-600">Comece sua jornada profissional hoje mesmo</p>
        </div>

        {/* Register Card */}
        <Card className="border-gray-200 shadow-xl">
          <CardHeader>
            <CardTitle>Registro</CardTitle>
            <CardDescription>
              Preencha os dados abaixo para criar sua conta gratuita
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {password && (
                  <p className={`text-xs ${passwordColor}`}>
                    Força da senha: {passwordStrength}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-600">As senhas não coincidem</p>
                )}
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 rounded border-gray-300"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Eu aceito os{" "}
                  <Link href="/terms" className="text-indigo-600 hover:text-indigo-700">
                    Termos de Uso
                  </Link>{" "}
                  e a{" "}
                  <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700">
                    Política de Privacidade
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={loading || !acceptTerms}
              >
                {loading ? "Criando conta..." : "Criar conta gratuita"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Benefícios inclusos</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Acesso ilimitado às ferramentas de IA</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Dashboard personalizado</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Suporte prioritário</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                Fazer login
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Voltar para página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
