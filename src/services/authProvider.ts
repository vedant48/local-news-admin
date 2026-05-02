import { AuthProvider, OnErrorResponse } from "@refinedev/core";

const API_URL = "https://walrus-app-ygv8l.ondigitalocean.app";

export const authProvider: AuthProvider = {
  // 🔐 LOGIN
  login: async ({ email, password }) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid credentials",
        },
      };
    }

    // ✅ FIX: parse JSON instead of text
    const data = await res.json();

    const token = data.token;

    localStorage.setItem("token", token);

    return {
      success: true,
      redirectTo: "/blogs",
    };
  },

  // 🚪 LOGOUT
  logout: async () => {
    localStorage.removeItem("token");
    return {
      success: true,
      redirectTo: "/",
    };
  },

  // 🔍 CHECK AUTH
  check: async () => {
    const token = localStorage.getItem("token");

    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/",
    };
  },

  // 👤 OPTIONAL
  getIdentity: async () => {
    const token = localStorage.getItem("token");

    if (!token) return null;

    return {
      name: "Reporter",
    };
  },

  getPermissions: async () => null,

  // 🔥 IMPORTANT: handle 401 globally
  onError: async (error: any): Promise<OnErrorResponse> => {
    if (error?.status === 401) {
      localStorage.removeItem("token");

      return {
        logout: true,
        redirectTo: "/",
      };
    }

    return {};
  },
};
