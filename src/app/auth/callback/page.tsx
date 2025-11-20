"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Briefcase } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Verificar se há um usuário autenticado
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Criar progresso inicial se não existir
          const { data: existingProgress } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (!existingProgress) {
            await supabase
              .from('user_progress')
              .insert({
                user_id: user.id,
                resumes_created: 0,
                cover_letters_created: 0,
                interviews_practiced: 0,
                total_score: 0,
                achievements: []
              });
          }

          // Redirecionar para dashboard
          router.push('/dashboard');
        } else {
          // Se não houver usuário, redirecionar para login
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Erro no callback de autenticação:', error);
        router.push('/auth/login');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center shadow-2xl animate-pulse">
          <Briefcase className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Autenticando...
        </h1>
        <p className="text-gray-600">
          Aguarde enquanto configuramos sua conta
        </p>
        <div className="mt-8 flex justify-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
