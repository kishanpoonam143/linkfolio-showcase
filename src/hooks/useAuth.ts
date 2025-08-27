import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('affiliate_admin_auth');
    setIsAuthenticated(authStatus === 'true');
    setIsLoading(false);
  }, []);

  const login = (password: string) => {
    // Simple password check - in real app, use proper authentication
    if (password === 'admin123') {
      localStorage.setItem('affiliate_admin_auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('affiliate_admin_auth');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, login, logout };
};