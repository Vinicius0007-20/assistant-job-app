"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Briefcase, FileText, MessageSquare, Target, TrendingUp, 
  Calendar, Bell, Settings, LogOut, User, Download, 
  CheckCircle2, Clock, AlertCircle, BarChart3, Award,
  Plus, Edit, Trash2, Eye, Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

interface UserData {
  name: string;
  email: string;
  authenticated: boolean;
}

interface SavedDocument {
  id: string;
  type: "resume" | "cover" | "interview";
  title: string;
  createdAt: string;
  status: "draft" | "completed";
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedDocuments, setSavedDocuments] = useState<SavedDocument[]>([]);
  const [stats, setStats] = useState({
    resumesCreated: 3,
    applicationsTracked: 12,
    interviewsPrepared: 5,
    successRate: 85
  });

  useEffect(() => {
    // Verificar autenticação
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/auth/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (!parsedUser.authenticated) {
      router.push("/auth/login");
      return;
    }

    setUser(parsedUser);

    // Carregar documentos salvos (simulação)
    const mockDocuments: SavedDocument[] = [
      {
        id: "1",
        type: "resume",
        title: "Currículo - Analista de Marketing",
        createdAt: "2024-01-15",
        status: "completed"
      },
      {
        id: "2",
        type: "cover",
        title: "Carta - Google Brasil",
        createdAt: "2024-01-14",
        status: "completed"
      },
      {
        id: "3",
        type: "interview",
        title: "Preparação - Entrevista Tech",
        createdAt: "2024-01-13",
        status: "draft"
      }
    ];
    setSavedDocuments(mockDocuments);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/95 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center shadow-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CareerCatalyst</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-indigo-600 font-medium">
                Dashboard
              </Link>
              <Link href="/#demo" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Ferramentas
              </Link>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-5 h-5 mr-2" />
                Sair
              </Button>
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
                <Link href="/dashboard" className="text-indigo-600 font-medium">
                  Dashboard
                </Link>
                <Link href="/#demo" className="text-gray-700">
                  Ferramentas
                </Link>
                <Button variant="ghost" size="sm" className="justify-start">
                  <Bell className="w-5 h-5 mr-2" />
                  Notificações (3)
                </Button>
                <Button variant="ghost" size="sm" className="justify-start" onClick={handleLogout}>
                  <LogOut className="w-5 h-5 mr-2" />
                  Sair
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Olá, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Bem-vindo ao seu painel profissional. Veja seu progresso e continue sua jornada.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Currículos Criados
                </CardTitle>
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.resumesCreated}</div>
              <p className="text-xs text-green-600 mt-1">+2 este mês</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Candidaturas
                </CardTitle>
                <Target className="w-5 h-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.applicationsTracked}</div>
              <p className="text-xs text-green-600 mt-1">+5 esta semana</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Entrevistas Preparadas
                </CardTitle>
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.interviewsPrepared}</div>
              <p className="text-xs text-green-600 mt-1">+1 hoje</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Taxa de Sucesso
                </CardTitle>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.successRate}%</div>
              <Progress value={stats.successRate} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Documents */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Documents */}
            <Card className="border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Documentos Recentes</CardTitle>
                    <CardDescription>Seus currículos, cartas e preparações</CardDescription>
                  </div>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {savedDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          doc.type === "resume" ? "bg-indigo-100" :
                          doc.type === "cover" ? "bg-blue-100" : "bg-purple-100"
                        }`}>
                          {doc.type === "resume" && <FileText className="w-5 h-5 text-indigo-600" />}
                          {doc.type === "cover" && <MessageSquare className="w-5 h-5 text-blue-600" />}
                          {doc.type === "interview" && <Target className="w-5 h-5 text-purple-600" />}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{doc.title}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(doc.createdAt).toLocaleDateString("pt-BR")}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={doc.status === "completed" ? "default" : "secondary"}>
                          {doc.status === "completed" ? "Completo" : "Rascunho"}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>Acesse rapidamente as ferramentas principais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Link href="/#demo">
                    <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                      <FileText className="w-6 h-6 text-indigo-600" />
                      <span className="text-sm">Criar Currículo</span>
                    </Button>
                  </Link>
                  <Link href="/#demo">
                    <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                      <span className="text-sm">Nova Carta</span>
                    </Button>
                  </Link>
                  <Link href="/#demo">
                    <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                      <Target className="w-6 h-6 text-purple-600" />
                      <span className="text-sm">Preparar Entrevista</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">Perfil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Editar Perfil
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Notificações</CardTitle>
                  <Badge variant="secondary">3 novas</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Currículo aprovado!
                      </div>
                      <div className="text-xs text-gray-600">
                        Seu currículo passou na análise ATS
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Há 2 horas</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Entrevista agendada
                      </div>
                      <div className="text-xs text-gray-600">
                        Empresa XYZ - Amanhã às 14h
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Há 5 horas</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Lembrete de follow-up
                      </div>
                      <div className="text-xs text-gray-600">
                        Fazer follow-up com Google Brasil
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Há 1 dia</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">Seu Progresso</CardTitle>
                <CardDescription>Complete seu perfil para melhores resultados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Perfil Completo</span>
                      <span className="text-sm font-semibold text-gray-900">75%</span>
                    </div>
                    <Progress value={75} />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Currículo criado</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Carta de apresentação</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>Adicionar foto de perfil</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>Conectar LinkedIn</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievement */}
            <Card className="border-gray-200 bg-gradient-to-br from-indigo-50 to-blue-50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-600" />
                  <CardTitle className="text-lg">Conquista Desbloqueada!</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-3">
                  Você criou seu primeiro currículo profissional! Continue assim para alcançar seus objetivos.
                </p>
                <Badge className="bg-indigo-600 text-white">
                  Primeiro Passo 🎉
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
