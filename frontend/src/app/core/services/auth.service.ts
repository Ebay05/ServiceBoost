// auth.service.ts
import { Injectable } from '@angular/core';
import { supabase } from '../../../supabase.client';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | null = null;

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    this.token = data.session?.access_token ?? null;
    return data;
  }

  getToken(): string | null {
    return this.token;
  }

  isLoggedIn() {
    return !!this.token;
  }

  async signOut() {
    await supabase.auth.signOut();
    this.token = null;
  }
}
