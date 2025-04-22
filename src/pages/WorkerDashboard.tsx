
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { BalanceCard } from '@/components/common/BalanceCard';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, FileText, Plus } from 'lucide-react';
import { RequestType, RequestStatus, WorkGroup } from '@/types/models';
import { StatusBadge } from '@/components/common/StatusBadge';
import { RequestTypeIcon } from '@/components/common/RequestTypeIcon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

// Mock data for demonstration purposes
const userBalance = {
  vacationDays: 15,
  personalDays: 5,
  leaveDays: 3,
};

const recentRequests = [
  {
    id: '1',
    type: RequestType.VACATION,
    startDate: new Date(2023, 6, 15),
    endDate: new Date(2023, 6, 22),
    status: RequestStatus.APPROVED,
    createdAt: new Date(2023, 5, 10)
  },
  {
    id: '2',
    type: RequestType.PERSONAL_DAY,
    startDate: new Date(2023, 8, 5),
    endDate: new Date(2023, 8, 5),
    status: RequestStatus.PENDING,
    createdAt: new Date(2023, 8, 1)
  },
  {
    id: '3',
    type: RequestType.LEAVE,
    startDate: new Date(2023, 9, 10),
    endDate: new Date(2023, 9, 12),
    status: RequestStatus.REJECTED,
    createdAt: new Date(2023, 9, 1)
  }
];

// Helper function to format dates
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

const WorkerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const getWorkGroupLabel = (group: string) => {
    const groups = {
      [WorkGroup.LOCALIZED]: 'Localizado (Quincenas Naturales)',
      [WorkGroup.PROGRAMMED]: 'Programado (Semanas naturales + 4 días)',
      [WorkGroup.URGENT_24H]: 'Urgente 24h (Bloques 2/3/2 o 32 días)',
      [WorkGroup.URGENT_12H]: 'Urgente 12h (Quincenas Naturales)',
      [WorkGroup.GES_SANITARY]: 'GES Sala Sanitaria (Bloques 10/10/12)',
      [WorkGroup.TOP_PROGRAMMED]: 'Top Programado (Semanas naturales + 4 días)',
      [WorkGroup.GROUP_1_3]: 'Grupo 1/3 (Quincenas Naturales)'
    };
    return groups[group as WorkGroup] || group;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bienvenido, {user?.name}</h1>
          <p className="text-muted-foreground">
            Grupo de trabajo: <span className="font-medium">{getWorkGroupLabel(user?.workGroup || '')}</span>
          </p>
        </div>
        
        <Button onClick={() => navigate('/requests/new')} className="bg-vacay-600 hover:bg-vacay-700">
          <Plus className="mr-2 h-4 w-4" />
          Nueva solicitud
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <BalanceCard
          title="Días de vacaciones"
          value={userBalance.vacationDays}
          total={22}
          icon={<Calendar className="h-6 w-6" />}
          variant="primary"
        />
        <BalanceCard
          title="Asuntos propios"
          value={userBalance.personalDays}
          total={6}
          icon={<Clock className="h-6 w-6" />}
          variant="warning"
        />
        <BalanceCard
          title="Permisos justificados"
          value={userBalance.leaveDays}
          icon={<FileText className="h-6 w-6" />}
          variant="success"
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Solicitudes recientes</CardTitle>
            <CardDescription>Últimas solicitudes realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div 
                  key={request.id} 
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/requests/${request.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <RequestTypeIcon type={request.type} size={20} />
                    <div>
                      <div className="font-medium">
                        {request.type === RequestType.VACATION && 'Vacaciones'}
                        {request.type === RequestType.PERSONAL_DAY && 'Asunto propio'}
                        {request.type === RequestType.LEAVE && 'Permiso justificado'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(request.startDate)} - {formatDate(request.endDate)}
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={request.status} />
                </div>
              ))}
              
              {recentRequests.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  No hay solicitudes recientes
                </div>
              )}
              
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => navigate('/requests')}
              >
                Ver todas
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Próximas fechas importantes</CardTitle>
            <CardDescription>Recordatorios y fechas límite</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg bg-status-warning/10">
                <Calendar className="h-5 w-5 text-status-warning" />
                <div>
                  <div className="font-medium">Fecha límite para solicitar vacaciones</div>
                  <div className="text-sm text-muted-foreground">15/10/2023</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Calendar className="h-5 w-5 text-vacay-600" />
                <div>
                  <div className="font-medium">Próximo periodo vacacional</div>
                  <div className="text-sm text-muted-foreground">01/12/2023 - 15/12/2023</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Clock className="h-5 w-5 text-status-approved" />
                <div>
                  <div className="font-medium">Asuntos propios disponibles caducan</div>
                  <div className="text-sm text-muted-foreground">31/12/2023</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerDashboard;
