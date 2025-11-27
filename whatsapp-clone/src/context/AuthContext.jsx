import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // 🔥 URL correcta por defecto
  const API_URL = import.meta.env.VITE_API_URL 
    || "https://whatsapp-clone-api-x7gh.onrender.com/api";

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al iniciar, intenta cargar el perfil
  useEffect(() => {
    if (token) {
      loadProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  // LOGIN
  const login = async (email, password) => {
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Credenciales inválidas");

      localStorage.setItem("token", data.token);
      setToken(data.token);

      await loadProfile(data.token);

      return { ok: true };

    } catch (err) {
      logout();
      return { ok: false, msg: err.message };
    }
  };

  // CARGAR PERFIL
  const loadProfile = async (tk) => {
    try {
      const res = await fetch(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${tk}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error("Token inválido");

      setUser(data.user);

    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        isAuthenticated: !!token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
