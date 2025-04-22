export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      knowledge_sources: {
        Row: {
          active: boolean
          created_at: string
          id: string
          last_synced: string | null
          name: string
          updated_at: string
          url: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          last_synced?: string | null
          name: string
          updated_at?: string
          url: string
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          last_synced?: string | null
          name?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      media_library: {
        Row: {
          content: string | null
          created_at: string
          description: string | null
          extracted_text: string | null
          id: string
          tags: string[] | null
          thumbnail: string | null
          title: string
          type: string
          updated_at: string
          url: string | null
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          description?: string | null
          extracted_text?: string | null
          id?: string
          tags?: string[] | null
          thumbnail?: string | null
          title: string
          type: string
          updated_at?: string
          url?: string | null
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          description?: string | null
          extracted_text?: string | null
          id?: string
          tags?: string[] | null
          thumbnail?: string | null
          title?: string
          type?: string
          updated_at?: string
          url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string
          id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name: string
          id?: never
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string
          id?: never
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      saldos: {
        Row: {
          asuntos_propios_disponibles: number | null
          id_usuario: string
          permisos_disponibles: number | null
          vacaciones_disponibles: number | null
        }
        Insert: {
          asuntos_propios_disponibles?: number | null
          id_usuario: string
          permisos_disponibles?: number | null
          vacaciones_disponibles?: number | null
        }
        Update: {
          asuntos_propios_disponibles?: number | null
          id_usuario?: string
          permisos_disponibles?: number | null
          vacaciones_disponibles?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "saldos_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: true
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      solicitudes: {
        Row: {
          archivo_url: string | null
          creado_el: string | null
          estado: string | null
          fechas: unknown | null
          id: string
          id_usuario: string | null
          motivo: string | null
          observaciones: string | null
          tipo: string | null
        }
        Insert: {
          archivo_url?: string | null
          creado_el?: string | null
          estado?: string | null
          fechas?: unknown | null
          id?: string
          id_usuario?: string | null
          motivo?: string | null
          observaciones?: string | null
          tipo?: string | null
        }
        Update: {
          archivo_url?: string | null
          creado_el?: string | null
          estado?: string | null
          fechas?: unknown | null
          id?: string
          id_usuario?: string | null
          motivo?: string | null
          observaciones?: string | null
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "solicitudes_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      twilio_messages: {
        Row: {
          body: string
          created_at: string
          from_number: string
          id: number
          message_sid: string
          status: string
          to_number: string
          updated_at: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          from_number: string
          id?: never
          message_sid: string
          status: string
          to_number: string
          updated_at?: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          from_number?: string
          id?: never
          message_sid?: string
          status?: string
          to_number?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          notification_preference: string
          phone: string | null
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name: string
          notification_preference: string
          phone?: string | null
          role: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          notification_preference?: string
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          antiguedad: number | null
          email: string
          grupo: string | null
          id: string
          jornada: string | null
          nombre: string
          rol: string | null
          turno: string | null
          user_id: string | null
        }
        Insert: {
          antiguedad?: number | null
          email: string
          grupo?: string | null
          id?: string
          jornada?: string | null
          nombre: string
          rol?: string | null
          turno?: string | null
          user_id?: string | null
        }
        Update: {
          antiguedad?: number | null
          email?: string
          grupo?: string | null
          id?: string
          jornada?: string | null
          nombre?: string
          rol?: string | null
          turno?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
