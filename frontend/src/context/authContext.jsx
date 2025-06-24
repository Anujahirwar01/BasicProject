import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/profile", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        console.error("Auth check failed: ", err);
        setUser(null);
      });
  }, []);

  const logout = async () => {
    await axios.post("http://localhost:5000/users/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
