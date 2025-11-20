"use client";

import { useState, useEffect } from "react";
import { 
  Briefcase, FileText, MessageSquare, Sparkles, TrendingUp, 
  Award, Target, Calendar, BarChart3, PieChart, Activity,
  Download, Eye, Edit3, Trash2, Plus, ArrowRight, CheckCircle2,
  Clock, Star, Users, Shield, Settings, LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface UserProgress {
  resumes_created: number;
  cover_letters_created: number;
  interviews_practiced: number;
  total_score: number;
  achievements: string[];
}

interface Resume {
  id: string;
  name: string;
  created_at: string;
}

interface CoverLetter {
  id: string;
  company: string;
  position: string;
  created_at: string;
}

interface InterviewPrep {
  id: string;
  question: string;
  score: number;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [progress, setProgress] = useState<UserProgress>({
    resumes_created: 0,
    cover_letters_created: 0,
    interviews_practiced: 0,
    total_score: 0,
    achievements: []
  });
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
  const [interviewPreps, setInterviewPreps] = useState<InterviewPrep[]>([]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/auth/login');
        return;
      }

      setUser(user);
      await loadUserData(user.id);
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = async (userId: string) => {
    try {
      // Carregar progresso
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (progressData) {
        setProgress(progressData);
      }

      // Carregar currículos
      const { data: resumesData } = await supabase
        .from('resumes')
        .select('id, name, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(5);

      if (resumesData) {
        setResumes(resumesData);
      }

      // Carregar cartas
      const { data: lettersData } = await supabase
        .from('cover_letters')
        .select('id, company, position, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(5);

      if (lettersData) {
        setCoverLetters(lettersData);
      }

      // Carregar preparações de entrevista
      const { data: interviewData } = await supabase
        .from('interview_preparations')
        .select('id, question, score, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(5);

      if (interviewData) {
        setInterviewPreps(interviewData);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const calculateAverageScore = () => {
    if (progress.interviews_practiced === 0) return 0;
    return Math.round(progress.total_score / progress.interviews_practiced);
  };

  const getProgressLevel = () => {
    const total = progress.resumes_created + progress.cover_letters_created + progress.interviews_practiced;
    if (total >= 20) return { level: "Expert", color: "text-purple-600", bg: "bg-purple-100" };
    if (total >= 10) return { level: "Avançado", color: "text-blue-600", bg: "bg-blue-100" };
    if (total >= 5) return { level: "Intermediário", color: "text-green-600", bg: "bg-green-100" };
    return { level: "Iniciante", color: "text-gray-600", bg: "bg-gray-100" };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  const levelInfo = getProgressLevel();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center shadow-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CareerCatalyst</span>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Olá, {user?.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-gray-600">
            Bem-vindo ao seu painel de controle profissional
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <Badge className={`${levelInfo.bg} ${levelInfo.color} border-0`}>
                  {levelInfo.level}
                </Badge>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {progress.resumes_created}
              </div>
              <div className="text-sm text-gray-600">Currículos Criados</div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {progress.cover_letters_created}
              </div>
              <div className="text-sm text-gray-600">Cartas de Apresentação</div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {progress.interviews_practiced}
              </div>
              <div className="text-sm text-gray-600">Entrevistas Praticadas</div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {calculateAverageScore()}%
              </div>
              <div className="text-sm text-gray-600">Pontuação Média</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                Seu Progresso
              </CardTitle>
              <CardDescription>
                Acompanhe sua evolução ao longo do tempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Currículos</span>
                    <span className="text-sm text-gray-600">{progress.resumes_created}/10</span>
                  </div>
                  <Progress value={(progress.resumes_created / 10) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Cartas de Apresentação</span>
                    <span className="text-sm text-gray-600">{progress.cover_letters_created}/10</span>
                  </div>
                  <Progress value={(progress.cover_letters_created / 10) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Preparação para Entrevistas</span>
                    <span className="text-sm text-gray-600">{progress.interviews_practiced}/20</span>
                  </div>
                  <Progress value={(progress.interviews_practiced / 20) * 100} className="h-2" />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">Progresso Total</div>
                      <div className="text-2xl font-bold text-indigo-600">
                        {Math.round(((progress.resumes_created + progress.cover_letters_created + progress.interviews_practiced) / 40) * 100)}%
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-indigo-100 text-indigo-700 border-0">
                        {levelInfo.level}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Conquistas
              </CardTitle>
              <CardDescription>
                Seus marcos alcançados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${progress.resumes_created >= 1 ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${progress.resumes_created >= 1 ? 'bg-green-500' : 'bg-gray-300'}`}>
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Primeiro Currículo</div>
                      <div className="text-xs text-gray-600">Crie seu primeiro currículo</div>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${progress.cover_letters_created >= 1 ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${progress.cover_letters_created >= 1 ? 'bg-blue-500' : 'bg-gray-300'}`}>
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Primeira Carta</div>
                      <div className="text-xs text-gray-600">Crie sua primeira carta</div>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${progress.interviews_practiced >= 5 ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${progress.interviews_practiced >= 5 ? 'bg-purple-500' : 'bg-gray-300'}`}>
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Praticante</div>
                      <div className="text-xs text-gray-600">Pratique 5 entrevistas</div>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${calculateAverageScore() >= 75 ? 'bg-orange-50 border border-orange-200' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${calculateAverageScore() >= 75 ? 'bg-orange-500' : 'bg-gray-300'}`}>
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Alto Desempenho</div>
                      <div className="text-xs text-gray-600">Média de 75%+ nas entrevistas</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  Currículos Recentes
                </CardTitle>
                <Link href="/">
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {resumes.length > 0 ? (
                <div className="space-y-3">
                  {resumes.map((resume) => (
                    <div key={resume.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{resume.name}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(resume.created_at)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-4">Nenhum currículo criado ainda</p>
                  <Link href="/">
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                      Criar Primeiro Currículo
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  Cartas Recentes
                </CardTitle>
                <Link href="/">
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {coverLetters.length > 0 ? (
                <div className="space-y-3">
                  {coverLetters.map((letter) => (
                    <div key={letter.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{letter.company}</div>
                          <div className="text-xs text-gray-500">{letter.position}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(letter.created_at)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-4">Nenhuma carta criada ainda</p>
                  <Link href="/">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Criar Primeira Carta
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-gray-200 mt-6">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Continue sua jornada profissional
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/" className="block">
                <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                  <FileText className="w-8 h-8 text-indigo-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Criar Currículo</h3>
                  <p className="text-sm text-gray-600 mb-3">Gere um currículo profissional otimizado para ATS</p>
                  <div className="flex items-center text-indigo-600 text-sm font-medium">
                    Começar agora
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>

              <Link href="/" className="block">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                  <MessageSquare className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Carta de Apresentação</h3>
                  <p className="text-sm text-gray-600 mb-3">Crie uma carta personalizada e persuasiva</p>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    Começar agora
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>

              <Link href="/" className="block">
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                  <Sparkles className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Praticar Entrevista</h3>
                  <p className="text-sm text-gray-600 mb-3">Receba feedback instantâneo da IA</p>
                  <div className="flex items-center text-purple-600 text-sm font-medium">
                    Começar agora
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
