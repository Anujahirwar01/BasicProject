import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user profile on first load
  useEffect(() => {
    axios
      .get("http://localhost:5000/users/profile", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        console.error("Auth check failed:", err);
        setUser(null);
      });
  }, []);

  const logout = async () => {
    try {
      await axios.get("http://localhost:5000/users/logout", { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
