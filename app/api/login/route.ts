'use server';
import { createClient } from '@/utils/supabase/server';

export async function login(email: string, password: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    return { status: false, message: error.message };
  }
  return {
    status: true,
    data: {
      id: data.user.id,
      email: data.user.email,
    },
  };
}

export async function signup(email: string, password: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    return { status: false, message: error.message };
  }
  return {
    status: true,
    data: {
      id: data.user?.id,
      email: data.user?.email,
    },
  };
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
