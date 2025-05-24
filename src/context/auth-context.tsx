'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  User
} from 'firebase/auth';
import { app } from '@/lib/firebase';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper for cookie management
const setCookie = (name: string, value: string, days: number) => {
  if (typeof window === 'undefined') return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax`;
};

const deleteCookie = (name: string) => {
  if (typeof window === 'undefined') return;
  document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=Lax`;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Skip Firebase auth when running in static export
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    try {
      const auth = getAuth(app);
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        
        // Save authentication status to local storage for static export mode
        if (currentUser) {
          localStorage.setItem('admin_auth_token', 'true');
          setCookie('admin_auth_token', 'true', 7); // 7 days expiration
        } else {
          localStorage.removeItem('admin_auth_token');
          deleteCookie('admin_auth_token');
        }
        
        setLoading(false);
      });
      
      // Cleanup subscription on unmount
      return () => unsubscribe();
    } catch (error) {
      console.error("Firebase auth error:", error);
      setLoading(false);
    }
  }, []);
  
  const signIn = async (email: string, password: string) => {
    setError(null);
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      
      // Set tokens immediately to avoid race conditions
      localStorage.setItem('admin_auth_token', 'true');
      setCookie('admin_auth_token', 'true', 7);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
      throw err;
    }
  };
  
  const signOut = async () => {
    setError(null);
    try {
      // Remove tokens first to ensure user is logged out properly
      localStorage.removeItem('admin_auth_token');
      deleteCookie('admin_auth_token');
      
      // Then sign out from Firebase
      const auth = getAuth(app);
      await firebaseSignOut(auth);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign out');
      throw err;
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
