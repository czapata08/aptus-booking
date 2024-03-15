export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  event_booking: {
    Tables: {
      audit_log: {
        Row: {
          action: string
          created_at: string
          details: string | null
          log_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: string | null
          log_id: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: string | null
          log_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          attendant_name: string | null
          booking_date: string | null
          booking_id: string
          booking_status:
            | Database["event_booking"]["Enums"]["booking_status"]
            | null
          created_at: string
          event_status:
            | Database["event_booking"]["Enums"]["event_status"]
            | null
          purchase_date: string
          slot_id: string | null
          ticket_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          attendant_name?: string | null
          booking_date?: string | null
          booking_id?: string
          booking_status?:
            | Database["event_booking"]["Enums"]["booking_status"]
            | null
          created_at?: string
          event_status?:
            | Database["event_booking"]["Enums"]["event_status"]
            | null
          purchase_date?: string
          slot_id?: string | null
          ticket_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          attendant_name?: string | null
          booking_date?: string | null
          booking_id?: string
          booking_status?:
            | Database["event_booking"]["Enums"]["booking_status"]
            | null
          created_at?: string
          event_status?:
            | Database["event_booking"]["Enums"]["event_status"]
            | null
          purchase_date?: string
          slot_id?: string | null
          ticket_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "slots"
            referencedColumns: ["slot_id"]
          },
          {
            foreignKeyName: "bookings_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["ticket_id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      event_images: {
        Row: {
          caption: string
          created_at: string
          event_id: string
          image_id: string
          image_url: string
          is_main_image: boolean | null
          metadata: string
          updated_at: string | null
        }
        Insert: {
          caption: string
          created_at?: string
          event_id: string
          image_id?: string
          image_url: string
          is_main_image?: boolean | null
          metadata: string
          updated_at?: string | null
        }
        Update: {
          caption?: string
          created_at?: string
          event_id?: string
          image_id?: string
          image_url?: string
          is_main_image?: boolean | null
          metadata?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_images_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_labels: {
        Row: {
          created_at: string
          event_id: string
          label_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          event_id: string
          label_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string
          label_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_labels_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_labels_label_id_fkey"
            columns: ["label_id"]
            isOneToOne: false
            referencedRelation: "labels"
            referencedColumns: ["label_id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          description: string
          end_date: string
          event_marketing_emailed: boolean | null
          event_status:
            | Database["event_booking"]["Enums"]["event_status"]
            | null
          event_type: Database["event_booking"]["Enums"]["event_type"] | null
          id: string
          location: string
          price: number | null
          recurring_event: boolean | null
          start_date: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description: string
          end_date: string
          event_marketing_emailed?: boolean | null
          event_status?:
            | Database["event_booking"]["Enums"]["event_status"]
            | null
          event_type?: Database["event_booking"]["Enums"]["event_type"] | null
          id?: string
          location: string
          price?: number | null
          recurring_event?: boolean | null
          start_date: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          end_date?: string
          event_marketing_emailed?: boolean | null
          event_status?:
            | Database["event_booking"]["Enums"]["event_status"]
            | null
          event_type?: Database["event_booking"]["Enums"]["event_type"] | null
          id?: string
          location?: string
          price?: number | null
          recurring_event?: boolean | null
          start_date?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          comment: string | null
          created_at: string
          event_id: string | null
          feedback_date: string
          feedback_id: string
          rating: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          event_id?: string | null
          feedback_date?: string
          feedback_id?: string
          rating?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          event_id?: string | null
          feedback_date?: string
          feedback_id?: string
          rating?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      labels: {
        Row: {
          created_at: string
          label_id: string
          label_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          label_id?: string
          label_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          label_id?: string
          label_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      recurring_event: {
        Row: {
          created_at: string
          event_id: string | null
          number_of_occurrences: number | null
          recurring_description: string | null
          recurring_id: string
          recurring_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          event_id?: string | null
          number_of_occurrences?: number | null
          recurring_description?: string | null
          recurring_id?: string
          recurring_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string | null
          number_of_occurrences?: number | null
          recurring_description?: string | null
          recurring_id?: string
          recurring_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recurring_event_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      recurring_event_dates: {
        Row: {
          created_at: string
          event_date: string
          id: string
          recurring_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          event_date: string
          id?: string
          recurring_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          event_date?: string
          id?: string
          recurring_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recurring_event_dates_recurring_id_fkey"
            columns: ["recurring_id"]
            isOneToOne: false
            referencedRelation: "recurring_event"
            referencedColumns: ["recurring_id"]
          },
        ]
      }
      slots: {
        Row: {
          created_at: string
          end_time: string
          event_id: string
          slot_date: string
          slot_id: string
          start_time: string
          tickets_available: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          end_time: string
          event_id: string
          slot_date: string
          slot_id?: string
          start_time: string
          tickets_available?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          end_time?: string
          event_id?: string
          slot_date?: string
          slot_id?: string
          start_time?: string
          tickets_available?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "slots_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          created_at: string
          event_id: string | null
          slot_id: string | null
          sold_tickets: number | null
          stripe_price_id: string | null
          ticket_id: string
          ticket_name: string
          ticket_price: number | null
          total_tickets: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          event_id?: string | null
          slot_id?: string | null
          sold_tickets?: number | null
          stripe_price_id?: string | null
          ticket_id?: string
          ticket_name: string
          ticket_price?: number | null
          total_tickets?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string | null
          slot_id?: string | null
          sold_tickets?: number | null
          stripe_price_id?: string | null
          ticket_id?: string
          ticket_name?: string
          ticket_price?: number | null
          total_tickets?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "slots"
            referencedColumns: ["slot_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      booking_status:
        | "booked"
        | "fullfilled"
        | "cancelled"
        | "refunded"
        | "pending"
      event_status:
        | "active"
        | "cancelled"
        | "postponed"
        | "completed"
        | "pending"
      event_type: "members_only" | "private" | "public" | "pending"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["event_booking"]["Tables"] &
        Database["event_booking"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["event_booking"]["Tables"] &
        Database["event_booking"]["Views"])
    ? (Database["event_booking"]["Tables"] &
        Database["event_booking"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["event_booking"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["event_booking"]["Tables"]
    ? Database["event_booking"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["event_booking"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["event_booking"]["Tables"]
    ? Database["event_booking"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["event_booking"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["event_booking"]["Enums"]
    ? Database["event_booking"]["Enums"][PublicEnumNameOrOptions]
    : never
