import { createContext, useContext, useState, ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    // Simuler l'authentification avec des utilisateurs mockés
    const users = [
      { id: '1', username: 'admin', password: 'admin123', role: 'admin' as const, name: 'Administrateur' },
      { id: '2', username: 'employe', password: 'employe123', role: 'employee' as const, name: 'Jean Dupont' }
    ];

    const foundUser = users.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
