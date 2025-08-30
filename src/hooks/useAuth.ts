import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('affiliate_admin_auth');
    setIsAuthenticated(authStatus === 'true');
    setIsLoading(false);
  }, []);

  const login = (userName:string,password: string) => {
    // Simple password check - in real app, use proper authentication
    if (userName === 'kishan' && password === 'admin123') {
      localStorage.setItem('affiliate_admin_auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('affiliate_admin_auth');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  return { isAuthenticated, isLoading, login, logout };
};