
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-vacay-100 to-vacay-50">
        <Calendar className="h-12 w-12 text-vacay-700 animate-pulse" />
        <h1 className="mt-4 text-xl font-semibold text-vacay-800">Cargando VacaySmart...</h1>
      </div>
    );
  }
  
  return null;
};

export default Index;
