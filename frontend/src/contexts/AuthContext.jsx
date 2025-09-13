import React, { createContext, useContext, useState } from 'react';
import { register as apiRegister, login as apiLogin } from '../utils/api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await apiLogin({ email, password });
      const userData = {
        _id: data._id,
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        role: data.role,
        token: data.token,
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      return false;
    }
  };

  const signup = async (name, email, password, avatar) => {
    setLoading(true);
    try {
  const data = await apiRegister({ name, email, password, avatar });
      const userData = {
        _id: data._id,
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        role: data.role,
        token: data.token,
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
