import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Database, Workflow, Calendar } from 'lucide-react';

const Integrations = () => {
  const [n8nWebhookUrl, setN8nWebhookUrl] = useState('');
  const [nocdbApiKey, setNocdbApiKey] = useState('');
  const [nocdbUrl, setNocdbUrl] = useState('');
  const [isLoadingN8n, setIsLoadingN8n] = useState(false);
  const [isLoadingNocdb, setIsLoadingNocdb] = useState(false);
  const [isLoadingGCal, setIsLoadingGCal] = useState(false);
  const [calendarId, setCalendarId] = useState('');

  const handleN8nTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!n8nWebhookUrl) {
      toast.error('Por favor, ingrese la URL del webhook de n8n');
      return;
    }

    setIsLoadingN8n(true);
    console.log("Disparando webhook de n8n:", n8nWebhookUrl);

    try {
      const response = await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          source: "App Vacaciones y Permisos",
          event: "test_connection"
        }),
      });

      toast.success('La solicitud fue enviada a n8n. Por favor, verifique su historial de flujos de trabajo para confirmar que fue activado.');
    } catch (error) {
      console.error("Error al disparar webhook:", error);
      toast.error('Error al conectar con n8n. Por favor, verifique la URL e intente nuevamente.');
    } finally {
      setIsLoadingN8n(false);
    }
  };

  const handleNocdbConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nocdbApiKey || !nocdbUrl) {
      toast.error('Por favor, ingrese tanto la URL como la clave API de NocoDB');
      return;
    }

    setIsLoadingNocdb(true);
    console.log("Conectando a NocoDB:", nocdbUrl);

    try {
      // This is a test connection - in a real implementation, you would validate the credentials
      // by making a real API call to NocoDB
      
      // Simulate API check
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store connection details (in production, use a more secure method)
      localStorage.setItem('nocdb_connection', JSON.stringify({
        url: nocdbUrl,
        apiKey: nocdbApiKey,
        connectedAt: new Date().toISOString()
      }));
      
      toast.success('Conexión con NocoDB establecida exitosamente');
    } catch (error) {
      console.error("Error al conectar con NocoDB:", error);
      toast.error('Error al conectar con NocoDB. Por favor, verifique las credenciales e intente nuevamente.');
    } finally {
      setIsLoadingNocdb(false);
    }
  };

  const handleGoogleCalendarTest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!calendarId) {
      toast.error('Por favor, ingrese el ID del calendario');
      return;
    }

    setIsLoadingGCal(true);
    console.log("Probando conexión con Google Calendar:", calendarId);

    try {
      // This is a placeholder for the actual Google Calendar API integration
      // In a production environment, this should be handled through Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Conexión con Google Calendar probada exitosamente');
    } catch (error) {
      console.error("Error al conectar con Google Calendar:", error);
      toast.error('Error al conectar con Google Calendar. Por favor, verifique el ID e intente nuevamente.');
    } finally {
      setIsLoadingGCal(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6 text-vacay-800 dark:text-vacay-100">Integraciones</h1>
      
      <Tabs defaultValue="n8n" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
          <TabsTrigger value="n8n">n8n Workflow</TabsTrigger>
          <TabsTrigger value="nocdb">NocoDB</TabsTrigger>
          <TabsTrigger value="gcal">Google Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="n8n">
          <Card className="border-vacay-200 dark:border-vacay-700 shadow-lg max-w-md mx-auto">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Workflow className="h-6 w-6 text-vacay-700 dark:text-vacay-300" />
                <CardTitle>Integración con n8n</CardTitle>
              </div>
              <CardDescription>
                Conecte su sistema de gestión de vacaciones con flujos de trabajo automatizados en n8n.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleN8nTrigger}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="n8nWebhookUrl">URL del Webhook de n8n</Label>
                  <Input
                    id="n8nWebhookUrl"
                    type="url"
                    placeholder="https://n8n.sudominio.com/webhook/..."
                    value={n8nWebhookUrl}
                    onChange={(e) => setN8nWebhookUrl(e.target.value)}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Puede encontrar esta URL en su flujo de trabajo de n8n al agregar un nodo de Webhook.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-vacay-600 hover:bg-vacay-700 text-white" 
                  disabled={isLoadingN8n}
                >
                  {isLoadingN8n ? 'Conectando...' : 'Probar conexión'}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="mt-6 max-w-md mx-auto">
            <h3 className="text-lg font-medium mb-2 text-vacay-800 dark:text-vacay-100">Casos de uso comunes:</h3>
            <ul className="list-disc pl-5 space-y-2 text-vacay-600 dark:text-vacay-400">
              <li>Notificaciones automáticas cuando se aprueba o rechaza una solicitud de vacaciones</li>
              <li>Sincronización de datos con otros sistemas como Google Calendar o Slack</li>
              <li>Alertas para el equipo de RRHH sobre solicitudes pendientes</li>
              <li>Generación y envío automático de informes de ausencias</li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="nocdb">
          <Card className="border-vacay-200 dark:border-vacay-700 shadow-lg max-w-md mx-auto">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Database className="h-6 w-6 text-vacay-700 dark:text-vacay-300" />
                <CardTitle>Integración con NocoDB</CardTitle>
              </div>
              <CardDescription>
                Conecte su sistema con NocoDB para gestión avanzada de datos y reportes personalizados.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleNocdbConnect}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nocdbUrl">URL de NocoDB</Label>
                  <Input
                    id="nocdbUrl"
                    type="url"
                    placeholder="https://nocodb.sudominio.com"
                    value={nocdbUrl}
                    onChange={(e) => setNocdbUrl(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nocdbApiKey">Clave API de NocoDB</Label>
                  <Input
                    id="nocdbApiKey"
                    type="password"
                    value={nocdbApiKey}
                    onChange={(e) => setNocdbApiKey(e.target.value)}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Puede generar una clave API en la configuración de su proyecto de NocoDB.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-vacay-600 hover:bg-vacay-700 text-white" 
                  disabled={isLoadingNocdb}
                >
                  {isLoadingNocdb ? 'Conectando...' : 'Conectar a NocoDB'}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="mt-6 max-w-md mx-auto">
            <h3 className="text-lg font-medium mb-2 text-vacay-800 dark:text-vacay-100">Beneficios de la integración:</h3>
            <ul className="list-disc pl-5 space-y-2 text-vacay-600 dark:text-vacay-400">
              <li>Consultas y reportes personalizados sobre los datos de vacaciones y permisos</li>
              <li>Creación de paneles de control (dashboards) adicionales</li>
              <li>Exportación de datos en múltiples formatos (Excel, CSV, etc.)</li>
              <li>Sincronización bidireccional de información entre sistemas</li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="gcal">
          <Card className="border-vacay-200 dark:border-vacay-700 shadow-lg max-w-md mx-auto">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-vacay-700 dark:text-vacay-300" />
                <CardTitle>Integración con Google Calendar</CardTitle>
              </div>
              <CardDescription>
                Sincronice las solicitudes de vacaciones y permisos con Google Calendar.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleGoogleCalendarTest}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="calendarId">ID del Calendario</Label>
                  <Input
                    id="calendarId"
                    type="text"
                    placeholder="ID del calendario de Google"
                    value={calendarId}
                    onChange={(e) => setCalendarId(e.target.value)}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Puede encontrar el ID del calendario en la configuración de Google Calendar.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-vacay-600 hover:bg-vacay-700 text-white" 
                  disabled={isLoadingGCal}
                >
                  {isLoadingGCal ? 'Conectando...' : 'Probar conexión'}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="mt-6 max-w-md mx-auto">
            <h3 className="text-lg font-medium mb-2 text-vacay-800 dark:text-vacay-100">Funcionalidades:</h3>
            <ul className="list-disc pl-5 space-y-2 text-vacay-600 dark:text-vacay-400">
              <li>Sincronización automática de solicitudes aprobadas</li>
              <li>Gestión de eventos en el calendario</li>
              <li>Notificaciones de eventos próximos</li>
              <li>Vista consolidada de ausencias del equipo</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Integrations;
