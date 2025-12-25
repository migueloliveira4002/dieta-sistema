'use server';

import { createClient } from '@/lib/supabase/server';
import { QuizData } from '@/types/quiz';

export async function submitQuiz(data: Partial<QuizData>) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('leads')
    .insert({
      name: data.name,
      quiz_data: data,
      status: 'started'
    });

  if (error) {
    console.error('Error submitting quiz:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function registerUser(formData: FormData) {
  const supabase = createClient();
  
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;
  const whatsapp = formData.get('whatsapp') as string;
  // In a real app, we would retrieve the quiz data from a cookie or local storage passed here
  // For now, we assume it's passed or we just update the profile later
  
  // 1. Sign up the user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (authError) {
    return { success: false, error: authError.message };
  }

  if (authData.user) {
    // 2. Create the profile entry (if not handled by triggers)
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email,
        full_name: name,
        whatsapp,
        status: 'paid' // Assuming they came from payment success
      });

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Don't fail the whole request if auth worked, but log it
    }
  }

  return { success: true };
}
