import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export interface AdminUser {
  email: string;
  password: string;
}

export async function verifyAdminLogin(email: string, password: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, 'admin-login'),
      where('email', '==', email),
      where('password', '==', password)
    );
    
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error: any) {
    console.error('Error verifying admin login:', error);
    return false;
  }
}

export function setAdminSession(email: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_session', JSON.stringify({
      email,
      loginTime: Date.now(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }));
  }
}

export function getAdminSession(): { email: string; loginTime: number; expiresAt: number } | null {
  if (typeof window !== 'undefined') {
    const session = localStorage.getItem('admin_session');
    if (session) {
      const parsed = JSON.parse(session);
      if (parsed.expiresAt > Date.now()) {
        return parsed;
      }
      // Session expired, clear it
      localStorage.removeItem('admin_session');
    }
  }
  return null;
}

export function clearAdminSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_session');
  }
}

export function isAdminLoggedIn(): boolean {
  return getAdminSession() !== null;
}
