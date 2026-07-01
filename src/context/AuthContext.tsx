import { createContext, useState } from "react";

export type AuthState = "loading" | "authenticated" | "unauthenticated";

interface AuthContextType {
  auth: AuthState;
  setAuth: (state: AuthState) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>("unauthenticated");

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
