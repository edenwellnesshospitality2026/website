const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8090";
const TOKEN_KEY = "eden_dashboard_token";

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Invalid credentials");
  const payload = await response.json();
  return payload.data as { token: string; user: AuthUser };
};

export const fetchMe = async (): Promise<AuthUser> => {
  const token = getToken();
  if (!token) throw new Error("No token");
  const response = await fetch(`${API_BASE}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Unauthorized");
  const payload = await response.json();
  return payload.data as AuthUser;
};
