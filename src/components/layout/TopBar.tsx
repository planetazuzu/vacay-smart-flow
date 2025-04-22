
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/models';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export const TopBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <header className="border-b border-border bg-card h-16 flex items-center px-4 lg:px-6">
      <div className="flex-1">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">
            {user?.role === UserRole.HR_MANAGER ? 'Panel de Gestión RRHH' : 'Portal del Empleado'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {user?.name} - {user?.department}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLogout}
          className="flex items-center gap-1"
        >
          <LogOut className="h-4 w-4" />
          <span>Salir</span>
        </Button>
      </div>
    </header>
  );
};
