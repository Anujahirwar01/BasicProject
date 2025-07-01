import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://backend-service-6o5m.onrender.com/users/profile", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        console.error("Auth check failed: ", err);
        setUser(null);
      });
  }, []);

  const logout = async () => {
  try {
    await axios.get("https://backend-service-6o5m.onrender.com/users/logout", {
      withCredentials: true,
    });
    setUser(null);
  } catch (err) {
    console.error("Logout failed", err);
  }
};

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
