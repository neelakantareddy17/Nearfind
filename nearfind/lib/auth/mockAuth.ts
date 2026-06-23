export type AuthRole = "customer" | "retailer" | "delivery" | "admin";

export type AuthUser = {
  uid: string;
  name: string;
  email: string;
  role: AuthRole;
};

export type SignInInput = {
  email: string;
  password: string;
};

type AuthStateListener = (user: AuthUser | null) => void;

const usersByEmail: Record<string, AuthUser & { password: string }> = {
  "customer@nearfind.com": {
    uid: "customer-uid",
    name: "Customer User",
    email: "customer@nearfind.com",
    role: "customer",
    password: "123456",
  },
  "retailer@nearfind.com": {
    uid: "retailer-uid",
    name: "Retailer User",
    email: "retailer@nearfind.com",
    role: "retailer",
    password: "123456",
  },
  "delivery@nearfind.com": {
    uid: "delivery-uid",
    name: "Delivery User",
    email: "delivery@nearfind.com",
    role: "delivery",
    password: "123456",
  },
  "admin@nearfind.com": {
    uid: "admin-uid",
    name: "Admin User",
    email: "admin@nearfind.com",
    role: "admin",
    password: "123456",
  },
};

export const demoCredentials = {
  customer: { email: "customer@nearfind.com", password: "123456" },
  retailer: { email: "retailer@nearfind.com", password: "123456" },
  delivery: { email: "delivery@nearfind.com", password: "123456" },
  admin: { email: "admin@nearfind.com", password: "123456" },
} as const;

export type AuthClient = {
  signIn: (input: SignInInput) => Promise<AuthUser>;
  signOut: () => Promise<void>;
  onAuthStateChanged: (listener: AuthStateListener) => () => void;
};

export function createMockAuthClient(): AuthClient {
  let currentUser: AuthUser | null = null;
  const listeners = new Set<AuthStateListener>();

  const emit = () => {
    listeners.forEach((listener) => listener(currentUser));
  };

  return {
    signIn: async ({ email, password }) => {
      const normalizedEmail = email.trim().toLowerCase();
      const userRecord = usersByEmail[normalizedEmail];

      if (!userRecord || userRecord.password !== password) {
        throw new Error("Invalid email or password.");
      }

      const { password: _password, ...user } = userRecord;
      currentUser = user;
      emit();
      return user;
    },
    signOut: async () => {
      currentUser = null;
      emit();
    },
    onAuthStateChanged: (listener) => {
      listeners.add(listener);
      listener(currentUser);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}