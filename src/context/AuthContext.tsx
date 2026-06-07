import { createContext} from "react"

export type AuthState = "loading" | "authenticated" | "unauthenticated"

interface AuthContextType {
  auth: AuthState
  setAuth: (state: AuthState) => void
}


export const AuthContext = createContext<AuthContextType | null>(null)

