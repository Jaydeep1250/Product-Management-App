import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";

// Create an authentication context
export const AuthContext = createContext(null);

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    console.log("userdata", userData);
    
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
