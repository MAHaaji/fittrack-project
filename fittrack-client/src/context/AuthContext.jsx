import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // on first load, check if there's a token already saved
  useEffect(() => {
    const savedToken = localStorage.getItem("fittrack_token");
    const savedUser = localStorage.getItem("fittrack_user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  function login(token, user) {
    localStorage.setItem("fittrack_token", token);
    localStorage.setItem("fittrack_user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("fittrack_token");
    localStorage.removeItem("fittrack_user");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// custom hook so any component can just do: const { user, token } = useAuth()
export function useAuth() {
  return useContext(AuthContext);
}