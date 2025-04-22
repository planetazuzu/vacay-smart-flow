
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole, RequestType, RequestStatus } from '@/types/models';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/common/StatusBadge';
import { RequestTypeIcon } from '@/components/common/RequestTypeIcon';
import { Calendar, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data - Replace with real data when backend is connected
const mockRequests = [
  {
    id: '1',
    type: RequestType.VACATION,
    startDate: new Date(2024, 3, 15),
    endDate: new Date(2024, 3, 22),
    status: RequestStatus.PENDING,
    employeeName: 'Carlos García',
    reason: 'Vacaciones de verano'
  },
  {
    id: '2',
    type: RequestType.PERSONAL_DAY,
    startDate: new Date(2024, 3, 25),
    endDate: new Date(2024, 3, 25),
    status: RequestStatus.APPROVED,
    employeeName: 'María López',
    reason: 'Asunto personal'
  },
  {
    id: '3',
    type: RequestType.LEAVE,
    startDate: new Date(2024, 4, 1),
    endDate: new Date(2024, 4, 2),
    status: RequestStatus.REJECTED,
    employeeName: 'Juan Pérez',
    reason: 'Cita médica'
  }
];

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

const getRequestTypeLabel = (type: RequestType) => {
  const types = {
    [RequestType.VACATION]: 'Vacaciones',
    [RequestType.PERSONAL_DAY]: 'Asunto propio',
    [RequestType.LEAVE]: 'Permiso justificado'
  };
  return types[type];
};

const Requests = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isHR = user?.role === UserRole.HR_MANAGER;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Solicitudes</h1>
          <p className="text-muted-foreground">
            Gestiona las solicitudes de {isHR ? 'los empleados' : 'tiempo libre'}
          </p>
        </div>

        <Button 
          onClick={() => navigate('/requests/new')} 
          className="bg-vacay-600 hover:bg-vacay-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nueva solicitud
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado de solicitudes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/requests/${request.id}`)}
              >
                <div className="flex items-center gap-4">
                  <RequestTypeIcon type={request.type} size={24} />
                  <div>
                    <div className="font-medium">
                      {getRequestTypeLabel(request.type)}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(request.startDate)}
                      {request.startDate.getTime() !== request.endDate.getTime() && 
                        ` - ${formatDate(request.endDate)}`
                      }
                    </div>
                    {isHR && (
                      <div className="text-sm text-muted-foreground mt-1">
                        Solicitado por: {request.employeeName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    {request.reason}
                  </div>
                  <StatusBadge status={request.status} />
                </div>
              </div>
            ))}

            {mockRequests.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No hay solicitudes para mostrar
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Requests;
