
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Calendar, Lock, User } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email.trim()) {
      toast.error('Por favor, ingrese su correo electrónico');
      return;
    }

    if (!password.trim()) {
      toast.error('Por favor, ingrese su contraseña');
      return;
    }

    try {
      console.log('Intentando iniciar sesión con:', email);
      const result = await login(email, password);
      console.log('Resultado del login:', result);
      toast.success('Sesión iniciada exitosamente');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      setErrorMessage('Correo electrónico o contraseña incorrectos');
      toast.error('Error al iniciar sesión. Verifique sus credenciales.');
    }
  };

  // Determine if the submit button should be disabled
  const isSubmitDisabled = isLoading || !email.trim() || !password.trim();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-corporate-green-50 to-corporate-white dark:from-corporate-green-900 dark:to-corporate-green-800 p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <Calendar className="h-12 w-12 text-corporate-green-700 dark:text-corporate-green-300" />
          </div>
          <h1 className="text-3xl font-bold text-corporate-green-800 dark:text-corporate-green-100">App Vacaciones y Permisos</h1>
          <p className="text-corporate-gray-600 dark:text-corporate-gray-400">Gestión inteligente de vacaciones y permisos</p>
        </div>
        
        <Card className="border-corporate-green-200 dark:border-corporate-green-700 shadow-lg">
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
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ejemplo@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              {errorMessage && (
                <div className="p-2 bg-red-50 text-red-600 text-sm rounded border border-red-200 text-center">
                  {errorMessage}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button 
                type="submit" 
                className="w-full bg-corporate-green-600 hover:bg-corporate-green-700 text-white" 
                disabled={isSubmitDisabled}
              >
                {isLoading ? 'Cargando...' : 'Iniciar sesión'}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-6 text-center text-sm text-corporate-green-600 dark:text-corporate-green-400">
          <p className="font-semibold">Para pruebas, use:</p>
          <p>Email: worker@vacay-app.com</p>
          <p>o Email: hr@vacay-app.com</p>
          <p>Contraseña: vacay2023</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
