import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  createMockAuthClient,
  demoCredentials,
  type AuthRole,
  type AuthUser,
  type SignInInput,
} from "../lib/auth/mockAuth";

type AuthContextValue = {
  user: AuthUser | null;
  uid: string | null;
  name: string | null;
  email: string | null;
  role: AuthRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const authClient = createMockAuthClient();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => authClient.onAuthStateChanged((nextUser) => {
    setUser(nextUser);
    setLoading(false);
  }), []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    uid: user?.uid ?? null,
    name: user?.name ?? null,
    email: user?.email ?? null,
    role: user?.role ?? null,
    loading,
    signIn: async (email: string, password: string) => {
      const signedInUser = await authClient.signIn({ email, password });
      setUser(signedInUser);
      return signedInUser;
    },
    signOut: async () => {
      await authClient.signOut();
      setUser(null);
    },
  }), [loading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return value;
}

export type { AuthRole, AuthUser, SignInInput };
export { demoCredentials };