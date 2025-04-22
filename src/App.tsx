
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Requests from "./pages/Requests";
import NotFound from "./pages/NotFound";
import Integrations from "./pages/Integrations";
import Calendar from "./pages/Calendar";
import Employees from "./pages/Employees";
import NewRequest from "./pages/NewRequest";
import AddUser from "./pages/AddUser"; // New import

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="requests" element={<Requests />} />
              <Route path="requests/new" element={<NewRequest />} />
              <Route path="requests/:id" element={<div className="p-4">Detalle de solicitud (En desarrollo)</div>} />
              <Route path="employees" element={<Employees />} />
              <Route path="employees/new" element={<AddUser />} /> {/* New route */}
              <Route path="profile" element={<div className="p-4">Perfil (En desarrollo)</div>} />
              <Route path="settings" element={<div className="p-4">Configuración (En desarrollo)</div>} />
              <Route path="integrations" element={<Integrations />} />
              <Route path="dashboard/alerts" element={<div className="p-4">Alertas (En desarrollo)</div>} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
