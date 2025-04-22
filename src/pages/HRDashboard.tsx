
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Users, Calendar, AlertCircle, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RequestStatus, RequestType, ShiftType } from '@/types/models';
import { StatusBadge } from '@/components/common/StatusBadge';

// Mock data for demonstration
const pendingRequestsCount = 12;
const workersCount = 48;
const pendingVacationsCount = 7;
const vacationCompletionRate = 65;

const recentRequests = [
  {
    id: '1',
    employeeName: 'María López',
    department: 'Operaciones',
    type: RequestType.VACATION,
    dates: '15/07/2023 - 22/07/2023',
    status: RequestStatus.PENDING,
  },
  {
    id: '2',
    employeeName: 'Juan García',
    department: 'Técnico',
    type: RequestType.PERSONAL_DAY,
    dates: '05/09/2023',
    status: RequestStatus.PENDING,
  },
  {
    id: '3',
    employeeName: 'Ana Martínez',
    department: 'Administración',
    type: RequestType.LEAVE,
    dates: '10/10/2023 - 12/10/2023',
    status: RequestStatus.PENDING,
  },
  {
    id: '4',
    employeeName: 'Carlos Rodríguez',
    department: 'Técnico',
    type: RequestType.VACATION,
    dates: '01/11/2023 - 15/11/2023',
    status: RequestStatus.PENDING,
  },
];

const alerts = [
  {
    id: '1',
    title: '3 empleados sin vacaciones asignadas',
    description: 'Carlos Rodríguez, Ana Martínez y Juan García no tienen vacaciones asignadas para el último trimestre.',
    severity: 'high',
  },
  {
    id: '2',
    title: 'Solapamiento de solicitudes en Técnico',
    description: '4 técnicos han solicitado vacaciones para la primera semana de agosto.',
    severity: 'medium',
  },
  {
    id: '3',
    title: 'Fecha límite próxima',
    description: 'La fecha límite para solicitar vacaciones de invierno es el 15/10/2023.',
    severity: 'low',
  },
];

// Helper function for shift distributions
const getShiftDistribution = () => {
  return [
    { name: ShiftType.LOCALIZED, value: 12 },
    { name: ShiftType.URGENT_24H, value: 8 },
    { name: ShiftType.URGENT_12H, value: 10 },
    { name: ShiftType.GES_SANITARY, value: 5 },
    { name: ShiftType.PROGRAMMED, value: 9 },
    { name: ShiftType.TOP_PROGRAMMED, value: 2 },
    { name: ShiftType.GROUP_1_3, value: 2 },
  ];
};

const shiftDistribution = getShiftDistribution();

const HRDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard de Recursos Humanos</h1>
        <Button 
          onClick={() => navigate('/employees')} 
          className="bg-vacay-600 hover:bg-vacay-700"
        >
          <Users className="mr-2 h-4 w-4" />
          Gestionar empleados
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Solicitudes Pendientes</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequestsCount}</div>
            <p className="text-xs text-muted-foreground">
              +2 nuevas desde ayer
            </p>
            <Button 
              variant="ghost" 
              className="w-full mt-3 text-xs"
              onClick={() => navigate('/requests')}
            >
              Ver solicitudes
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Empleados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workersCount}</div>
            <p className="text-xs text-muted-foreground">
              {workersCount - pendingVacationsCount} con vacaciones asignadas
            </p>
            <div className="mt-3 h-1 w-full bg-muted">
              <div 
                className="h-1 bg-vacay-600" 
                style={{ width: `${vacationCompletionRate}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {vacationCompletionRate}% completado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vacaciones Pendientes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingVacationsCount}</div>
            <p className="text-xs text-muted-foreground">
              Empleados sin vacaciones asignadas
            </p>
            <Button 
              variant="ghost" 
              className="w-full mt-3 text-xs"
              onClick={() => navigate('/employees?filter=pending_vacation')}
            >
              Ver empleados
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.length}</div>
            <p className="text-xs text-muted-foreground">
              {alerts.filter(a => a.severity === 'high').length} de alta prioridad
            </p>
            <Button 
              variant="ghost" 
              className="w-full mt-3 text-xs"
              onClick={() => navigate('/dashboard/alerts')}
            >
              Ver alertas
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Solicitudes recientes</CardTitle>
            <CardDescription>Últimas solicitudes pendientes de revisión</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentRequests.map((request) => (
                <div 
                  key={request.id} 
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/requests/${request.id}`)}
                >
                  <div>
                    <div className="font-medium">{request.employeeName}</div>
                    <div className="text-sm text-muted-foreground">
                      {request.department} - {request.dates}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-medium">
                      {request.type === RequestType.VACATION && 'Vacaciones'}
                      {request.type === RequestType.PERSONAL_DAY && 'Asunto propio'}
                      {request.type === RequestType.LEAVE && 'Permiso'}
                    </div>
                    <StatusBadge status={request.status} />
                  </div>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => navigate('/requests')}
              >
                Ver todas las solicitudes
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Alertas y recomendaciones</CardTitle>
            <CardDescription>Alertas inteligentes del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-3 border rounded-lg ${
                    alert.severity === 'high' 
                      ? 'border-status-rejected bg-status-rejected/5' 
                      : alert.severity === 'medium' 
                        ? 'border-status-warning bg-status-warning/5' 
                        : 'border-muted bg-muted/20'
                  }`}
                >
                  <div className="font-medium flex items-center gap-2">
                    <AlertCircle className={`h-4 w-4 ${
                      alert.severity === 'high' 
                        ? 'text-status-rejected' 
                        : alert.severity === 'medium' 
                          ? 'text-status-warning' 
                          : 'text-muted-foreground'
                    }`} />
                    {alert.title}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {alert.description}
                  </div>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => navigate('/dashboard/alerts')}
              >
                Ver todas las alertas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Distribución de turnos</CardTitle>
          <CardDescription>Número de empleados por tipo de turno</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            {/* Here would normally go a chart component */}
            <div className="space-y-2">
              {shiftDistribution.map((shift) => (
                <div key={shift.name} className="flex items-center gap-2">
                  <div className="text-sm font-medium w-36">
                    {shift.name === ShiftType.LOCALIZED && 'Localizado'}
                    {shift.name === ShiftType.URGENT_24H && 'Urgente 24h'}
                    {shift.name === ShiftType.URGENT_12H && 'Urgente 12h'}
                    {shift.name === ShiftType.GES_SANITARY && 'GES Sanitario'}
                    {shift.name === ShiftType.PROGRAMMED && 'Programado'}
                    {shift.name === ShiftType.TOP_PROGRAMMED && 'Top Programado'}
                    {shift.name === ShiftType.GROUP_1_3 && 'Grupo 1/3'}
                  </div>
                  <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-vacay-600 rounded-full" 
                      style={{ width: `${(shift.value / workersCount) * 100}%` }}
                    />
                  </div>
                  <div className="text-sm font-medium w-8">
                    {shift.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HRDashboard;
