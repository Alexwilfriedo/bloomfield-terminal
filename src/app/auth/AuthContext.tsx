import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "bloomfield.auth.v1";

/**
 * Static credentials — this is NOT real authentication.
 * It exists only to gate the terminal behind a premium login screen
 * until real auth (OIDC, Clerk, etc.) is wired in.
 */
const STATIC_USERS: Record<string, { password: string; name: string; role: string }> = {
  admin: { password: "admin", name: "Adjoua Koné", role: "Analyste Senior" },
};

export interface AuthUser {
  username: string;
  name: string;
  role: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => { ok: true } | { ok: false; error: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser;
    if (!parsed?.username || !parsed?.name) return null;
    return parsed;
  } catch {
    return null;
  }
}

function persistUser(user: AuthUser | null) {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // ignore
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => loadUser());

  useEffect(() => {
    persistUser(user);
  }, [user]);

  const login = useCallback((username: string, password: string) => {
    const key = username.trim().toLowerCase();
    const record = STATIC_USERS[key];
    if (!record || record.password !== password) {
      return { ok: false as const, error: "Identifiants invalides" };
    }
    setUser({ username: key, name: record.name, role: record.role });
    return { ok: true as const };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
