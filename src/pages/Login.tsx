
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Calendar } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vacay-100 to-vacay-50 dark:from-vacay-900 dark:to-vacay-800 p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <Calendar className="h-12 w-12 text-vacay-700 dark:text-vacay-300" />
          </div>
          <h1 className="text-3xl font-bold text-vacay-800 dark:text-vacay-100">App Vacaciones y Permisos</h1>
          <p className="text-vacay-600 dark:text-vacay-400">Gestión inteligente de vacaciones y permisos</p>
        </div>
        
        <Card className="border-vacay-200 dark:border-vacay-700 shadow-lg">
          <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>
            <CardDescription>
              Ingrese sus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ejemplo@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-vacay-600 hover:bg-vacay-700 text-white" 
                disabled={isLoading}
              >
                {isLoading ? 'Cargando...' : 'Iniciar sesión'}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-6 text-center text-sm text-vacay-600 dark:text-vacay-400">
          <p>Para pruebas, use:</p>
          <p>Worker: worker@demo.com</p>
          <p>HR Manager: hr@demo.com</p>
          <p>Contraseña: password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
