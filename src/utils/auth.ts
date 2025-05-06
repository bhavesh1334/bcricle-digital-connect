
import { supabase } from '@/integrations/supabase/client';

export async function signUp(email: string, password: string, metadata: Record<string, any>) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  });
}

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({
    email,
    password
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function resetPasswordRequest(email: string) {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
}

export async function updatePassword(password: string) {
  return supabase.auth.updateUser({
    password
  });
}

export async function getSession() {
  return supabase.auth.getSession();
}

export async function getUser() {
  const { data } = await getSession();
  return data.session?.user || null;
}
