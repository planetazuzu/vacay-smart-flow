
import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar } from '@/components/ui/calendar';
import { UserRole, RequestStatus, RequestType } from '@/types/models';
import { Badge } from '@/components/ui/badge';

// Mock data - Replace with real data when backend is connected
const mockEvents = [
  {
    id: '1',
    employeeName: 'Carlos García',
    type: RequestType.VACATION,
    startDate: new Date(2024, 3, 15),
    endDate: new Date(2024, 3, 22),
    status: RequestStatus.APPROVED,
  },
  {
    id: '2',
    employeeName: 'María López',
    type: RequestType.PERSONAL_DAY,
    startDate: new Date(2024, 3, 25),
    endDate: new Date(2024, 3, 25),
    status: RequestStatus.PENDING,
  },
];

const CalendarPage = () => {
  const { user } = useAuth();
  const isHR = user?.role === UserRole.HR_MANAGER;
  const [date, setDate] = React.useState<Date>(new Date());

  // Function to modify the calendar day cell based on events
  const modifiers = {
    eventDay: (day: Date) => {
      return mockEvents.some(event => {
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);
        return day >= eventStart && day <= eventEnd;
      });
    }
  };

  const modifiersStyles = {
    eventDay: {
      backgroundColor: 'var(--vacay-50)',
      borderRadius: '0'
    }
  };

  // Get events for the selected date
  const selectedDateEvents = mockEvents.filter(event => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    return date >= eventStart && date <= eventEnd;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Calendario</h1>
        <p className="text-muted-foreground">
          {isHR 
            ? 'Vista general de las solicitudes de los empleados' 
            : 'Vista general de tus solicitudes'}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              <span>Calendario</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar 
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border shadow p-3 pointer-events-auto"
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Solicitudes para {date.toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map(event => (
                  <div key={event.id} className="flex items-center justify-between border rounded-lg p-4">
                    <div>
                      <p className="font-medium">{event.employeeName}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.type === RequestType.VACATION ? 'Vacaciones' : 
                         event.type === RequestType.PERSONAL_DAY ? 'Asunto propio' : 
                         'Permiso justificado'}
                      </p>
                    </div>
                    <Badge 
                      variant={event.status === RequestStatus.APPROVED ? 'default' : 'secondary'}
                    >
                      {event.status === RequestStatus.APPROVED ? 'Aprobado' : 'Pendiente'}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No hay solicitudes para esta fecha
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
