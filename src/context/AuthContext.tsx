/* eslint-disable react-refresh/only-export-components */

import { loginRequest } from "@/services/auth-controller";
import { LoginRequest } from "@/services/auth-controller/types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

type AuthState = {
  token: string | null;
  lifetime: number | null;
  expiresAt: number | null; // epoch ms
  subdomain: string | null;
};

type AuthContextValue = {
  token: string | null;
  subdomain: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (input: LoginRequest) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "ox_auth";

function readStoredAuth(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw)
      return { token: null, lifetime: null, expiresAt: null, subdomain: null };

    const parsed = JSON.parse(raw) as AuthState;

    // Token muddati tugagan bo'lsa tozalash
    if (parsed?.expiresAt && Date.now() >= parsed.expiresAt) {
      localStorage.removeItem(STORAGE_KEY);
      return { token: null, lifetime: null, expiresAt: null, subdomain: null };
    }

    return {
      token: parsed?.token ?? null,
      lifetime: parsed?.lifetime ?? null,
      expiresAt: parsed?.expiresAt ?? null,
      subdomain: parsed?.subdomain ?? null,
    };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return { token: null, lifetime: null, expiresAt: null, subdomain: null };
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => readStoredAuth());
  const [isLoading, setIsLoading] = useState(false);

  // Storage event listener (multi-tab sync)
  useEffect(() => {
    const onStorage = () => setAuth(readStoredAuth());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = async (input: LoginRequest) => {
    setIsLoading(true);
    try {
      const result = await loginRequest(input);

      if (!result.token || !result.lifetime) {
        throw new Error("Token yoki lifetime kelmadi.");
      }

      const expiresAt = Date.now() + result.lifetime * 1000;

      const next: AuthState = {
        token: result.token,
        lifetime: result.lifetime,
        expiresAt,
        subdomain: input.subdomain,
      };

      setAuth(next);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      toast.success("Tizimga muvaffaqiyatli kirdingiz!");
    } catch (error) {
      let message = "Login xato. Qaytadan urinib ko'ring.";
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAuth({ token: null, lifetime: null, expiresAt: null, subdomain: null });
    localStorage.removeItem(STORAGE_KEY);
    toast.info("Tizimdan chiqdingiz.");
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      token: auth.token,
      subdomain: auth.subdomain,
      isAuthenticated: Boolean(auth.token),
      isLoading,
      login,
      logout,
    }),
    [auth.token, auth.subdomain, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
