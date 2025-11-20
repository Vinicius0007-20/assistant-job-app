import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  updated_at: string;
}

export interface Resume {
  id: string;
  user_id: string;
  name: string;
  experience: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CoverLetter {
  id: string;
  user_id: string;
  company: string;
  position: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface InterviewPreparation {
  id: string;
  user_id: string;
  question: string;
  answer: string;
  feedback: string | null;
  score: number | null;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  resumes_created: number;
  cover_letters_created: number;
  interviews_practiced: number;
  total_score: number;
  achievements: string[];
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
}
