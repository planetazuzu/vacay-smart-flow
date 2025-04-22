
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RequestType } from '@/types/models';

type FormValues = {
  requestType: RequestType;
  startDate: Date;
  endDate: Date;
  reason: string;
  documentUrl?: string;
};

const getRequestTypeLabel = (type: RequestType) => {
  const types = {
    [RequestType.VACATION]: 'Vacaciones',
    [RequestType.PERSONAL_DAY]: 'Asunto propio',
    [RequestType.LEAVE]: 'Permiso justificado'
  };
  return types[type];
};

const NewRequest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    defaultValues: {
      requestType: RequestType.VACATION,
      startDate: new Date(),
      endDate: new Date(),
      reason: '',
      documentUrl: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form data:', data);
    
    // In a real app, this would send the data to the backend
    // For now, we'll just show a success message and navigate back
    
    toast({
      title: "Solicitud enviada",
      description: "Tu solicitud ha sido enviada correctamente."
    });
    
    setTimeout(() => {
      navigate('/requests');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nueva Solicitud</h1>
        <p className="text-muted-foreground">
          Crea una nueva solicitud de tiempo libre
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalles de la solicitud</CardTitle>
          <CardDescription>
            Completa todos los campos necesarios para tu solicitud
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="requestType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de solicitud</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tipo de solicitud" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={RequestType.VACATION}>
                          {getRequestTypeLabel(RequestType.VACATION)}
                        </SelectItem>
                        <SelectItem value={RequestType.PERSONAL_DAY}>
                          {getRequestTypeLabel(RequestType.PERSONAL_DAY)}
                        </SelectItem>
                        <SelectItem value={RequestType.LEAVE}>
                          {getRequestTypeLabel(RequestType.LEAVE)}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Elige el tipo de solicitud que deseas realizar
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha de inicio</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-full pl-3 text-left font-normal"
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy", { locale: es })
                              ) : (
                                <span>Selecciona una fecha</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha de fin</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-full pl-3 text-left font-normal"
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy", { locale: es })
                              ) : (
                                <span>Selecciona una fecha</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Motivo</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe el motivo de tu solicitud"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="documentUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Documento justificativo (opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // In a real app, we would upload the file to a storage service
                            // and set the URL in the form
                            field.onChange(`file://${file.name}`);
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Sube un documento justificativo si es necesario
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/requests')}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-vacay-600 hover:bg-vacay-700">
                  Enviar solicitud
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewRequest;
