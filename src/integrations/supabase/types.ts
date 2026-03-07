export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      chapter_members: {
        Row: {
          chapter_id: string
          id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          chapter_id: string
          id?: string
          joined_at?: string
          role?: string
          user_id: string
        }
        Update: {
          chapter_id?: string
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapter_members_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "local_chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      communities: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          suited_types: string[] | null
          tags: string[] | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          suited_types?: string[] | null
          tags?: string[] | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          suited_types?: string[] | null
          tags?: string[] | null
        }
        Relationships: []
      }
      community_members: {
        Row: {
          community_id: string
          id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          community_id: string
          id?: string
          joined_at?: string
          role?: string
          user_id: string
        }
        Update: {
          community_id?: string
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_members_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          subject?: string
        }
        Relationships: []
      }
      join_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          interest: string | null
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          interest?: string | null
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          interest?: string | null
          name?: string
        }
        Relationships: []
      }
      local_chapters: {
        Row: {
          county: string
          id: string
          is_active: boolean
          name: string
          town: string | null
          town_hall_id: string | null
        }
        Insert: {
          county: string
          id?: string
          is_active?: boolean
          name: string
          town?: string | null
          town_hall_id?: string | null
        }
        Update: {
          county?: string
          id?: string
          is_active?: boolean
          name?: string
          town?: string | null
          town_hall_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "local_chapters_town_hall_id_fkey"
            columns: ["town_hall_id"]
            isOneToOne: false
            referencedRelation: "town_halls"
            referencedColumns: ["id"]
          },
        ]
      }
      member_tags: {
        Row: {
          category: string
          created_at: string
          id: string
          tag: string
          user_id: string
        }
        Insert: {
          category?: string
          created_at?: string
          id?: string
          tag: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          tag?: string
          user_id?: string
        }
        Relationships: []
      }
      newsletter_signups: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      noticeboard_posts: {
        Row: {
          author_id: string
          body: string | null
          category: string
          chapter_id: string | null
          created_at: string
          id: string
          is_pinned: boolean
          title: string
        }
        Insert: {
          author_id: string
          body?: string | null
          category?: string
          chapter_id?: string | null
          created_at?: string
          id?: string
          is_pinned?: boolean
          title: string
        }
        Update: {
          author_id?: string
          body?: string | null
          category?: string
          chapter_id?: string | null
          created_at?: string
          id?: string
          is_pinned?: boolean
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "noticeboard_posts_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "local_chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      personality_results: {
        Row: {
          created_at: string
          dim_a: number | null
          dim_b: number | null
          dim_c: number | null
          dim_d: number | null
          id: string
          type_code: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          dim_a?: number | null
          dim_b?: number | null
          dim_c?: number | null
          dim_d?: number | null
          id?: string
          type_code?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          dim_a?: number | null
          dim_b?: number | null
          dim_c?: number | null
          dim_d?: number | null
          id?: string
          type_code?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          county: string | null
          created_at: string
          display_name: string | null
          id: string
          is_staff: boolean
          membership_type: string | null
          onboarded: boolean
          open_to_connect: boolean
          town: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          county?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          is_staff?: boolean
          membership_type?: string | null
          onboarded?: boolean
          open_to_connect?: boolean
          town?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          county?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          is_staff?: boolean
          membership_type?: string | null
          onboarded?: boolean
          open_to_connect?: boolean
          town?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      rate_limit_tracking: {
        Row: {
          created_at: string
          endpoint: string
          id: string
          ip_address: string
        }
        Insert: {
          created_at?: string
          endpoint: string
          id?: string
          ip_address: string
        }
        Update: {
          created_at?: string
          endpoint?: string
          id?: string
          ip_address?: string
        }
        Relationships: []
      }
      town_halls: {
        Row: {
          country: string
          county: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          region: string | null
        }
        Insert: {
          country?: string
          county?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          region?: string | null
        }
        Update: {
          country?: string
          county?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          region?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_display_names: {
        Args: { user_ids: string[] }
        Returns: {
          display_name: string
          user_id: string
        }[]
      }
      is_chapter_member: {
        Args: { _chapter_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
