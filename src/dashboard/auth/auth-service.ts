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
  let response: Response;
  try {
    response = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    throw new Error(
      `Cannot reach API at ${API_BASE}. Is the backend running, and is this page's origin in backend CORS_ORIGINS?`
    );
  }
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

export const changePassword = async (currentPassword: string, newPassword: string) => {
  const token = getToken();
  if (!token) throw new Error("No token");
  const response = await fetch(`${API_BASE}/api/auth/change-password`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(typeof payload?.error === "string" ? payload.error : "Could not change password");
  }
};

export const changeEmail = async (
  newEmail: string,
  currentPassword: string
): Promise<{ token: string; user: AuthUser }> => {
  const token = getToken();
  if (!token) throw new Error("No token");
  const response = await fetch(`${API_BASE}/api/auth/change-email`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newEmail, currentPassword }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(typeof payload?.error === "string" ? payload.error : "Could not change email");
  }
  return payload.data as { token: string; user: AuthUser };
};
