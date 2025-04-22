
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { User, UserRole, ShiftType, WorkdayType, WorkGroup } from '@/types/models';

export const useUserData = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['userData', userId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }
      
      // Map Supabase user data to our User type
      return {
        id: data.id,
        name: data.nombre,
        email: data.email,
        role: data.rol as UserRole,
        shift: data.turno as ShiftType,
        workday: data.jornada as WorkdayType,
        department: data.grupo || '',
        workGroup: data.grupo as WorkGroup,
        seniority: data.antiguedad || 0
      } as User;
    },
    enabled: !!userId
  });
};
