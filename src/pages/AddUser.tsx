
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { UserRole, ShiftType, WorkdayType, WorkGroup } from '@/types/models';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface UserFormData {
  nombre: string;
  email: string;
  rol: UserRole;
  turno: ShiftType;
  jornada: WorkdayType;
  grupo: WorkGroup;
  antiguedad: number;
}

const AddUser = () => {
  const navigate = useNavigate();
  const form = useForm<UserFormData>({
    defaultValues: {
      nombre: '',
      email: '',
      rol: UserRole.WORKER,
      turno: ShiftType.LOCALIZED,
      jornada: WorkdayType.FULL_TIME,
      grupo: WorkGroup.LOCALIZED,
      antiguedad: 0
    }
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      // First, create the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: 'Inicial123!', // Temporary password, user should change on first login
        options: {
          data: {
            nombre: data.nombre
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Then, insert additional user details into usuarios table
        const { error: usuarioError } = await supabase
          .from('usuarios')
          .update({
            nombre: data.nombre,
            rol: data.rol,
            turno: data.turno,
            jornada: data.jornada,
            grupo: data.grupo,
            antiguedad: data.antiguedad
          })
          .eq('user_id', authData.user.id);

        if (usuarioError) throw usuarioError;

        toast.success('Usuario creado exitosamente');
        navigate('/employees');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('No se pudo crear el usuario');
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Añadir Nuevo Usuario</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={UserRole.WORKER}>Trabajador</SelectItem>
                    <SelectItem value={UserRole.HR_MANAGER}>Gerente de RR.HH.</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Similar fields for turno, jornada, grupo, antiguedad */}
          <Button type="submit" className="w-full">Crear Usuario</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddUser;
