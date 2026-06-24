import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../services/firebase";
import { login, logout } from "../services/authService";

import type {
  AuthRole,
  AuthUser,
  SignInInput,
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

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (firebaseUser) => {
          if (!firebaseUser) {
            setUser(null);
            setLoading(false);
            return;
          }

          const userDoc = await getDoc(
            doc(db, "users", firebaseUser.uid)
          );

          if (!userDoc.exists()) {
            setUser(null);
            setLoading(false);
            return;
          }

          const data = userDoc.data();

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email ?? "",
            name: data.name,
            role: data.role,
          });

          setLoading(false);
        }
      );

    return unsubscribe;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      uid: user?.uid ?? null,
      name: user?.name ?? null,
      email: user?.email ?? null,
      role: user?.role ?? null,
      loading,

      signIn: async (
        email: string,
        password: string
      ) => {
        const signedInUser =
          await login(email, password);

        setUser(
          signedInUser as AuthUser
        );

        return signedInUser as AuthUser;
      },

      signOut: async () => {
        await logout();
        setUser(null);
      },
    }),
    [loading, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return value;
}

export type {
  AuthRole,
  AuthUser,
  SignInInput,
};