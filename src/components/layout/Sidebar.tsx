import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/models';
import { Calendar, ClipboardList, Users, BarChart, Settings, User, FileText, UserPlus } from 'lucide-react';

export const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  const isHR = user?.role === UserRole.HR_MANAGER;
  
  const workerLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: BarChart },
    { name: 'Mis Solicitudes', path: '/requests', icon: FileText },
    { name: 'Calendario', path: '/calendar', icon: Calendar },
  ];
  
  const hrLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: BarChart },
    { name: 'Empleados', path: '/employees', icon: Users },
    { name: 'Añadir Empleado', path: '/employees/new', icon: UserPlus },
    { name: 'Solicitudes', path: '/requests', icon: ClipboardList },
    { name: 'Calendario', path: '/calendar', icon: Calendar },
    { name: 'Configuración', path: '/settings', icon: Settings },
  ];
  
  const navLinks = isHR ? hrLinks : workerLinks;

  return (
    <aside className="w-full lg:w-64 bg-sidebar border-r border-sidebar-border lg:min-h-screen">
      <div className="p-4 flex justify-center lg:justify-start">
        <Link to="/dashboard" className="flex items-center gap-2 text-sidebar-foreground">
          <Calendar className="h-6 w-6" />
          <span className="font-bold text-xl hidden lg:inline">VacaySmart</span>
        </Link>
      </div>
      
      <div className="px-3 py-2">
        <div className="space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive(link.path)
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <link.icon className="h-4 w-4" />
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t border-sidebar-border">
        <Link
          to="/profile"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors"
        >
          <User className="h-4 w-4" />
          <span>{user?.name}</span>
        </Link>
      </div>
    </aside>
  );
};
