export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          description: string
          icon: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      businesses: {
        Row: {
          id: string
          name: string
          description: string
          category_id: string
          address: string | null
          city: string
          state: string
          pincode: string | null
          created_at: string
          updated_at: string
          referred_by: string | null
          referral_count: number
        }
        Insert: {
          id?: string
          name: string
          description: string
          category_id: string
          address?: string | null
          city: string
          state: string
          pincode?: string | null
          created_at?: string
          updated_at?: string
          referred_by?: string | null
          referral_count?: number
        }
        Update: {
          id?: string
          name?: string
          description?: string
          category_id?: string
          address?: string | null
          city?: string
          state?: string
          pincode?: string | null
          created_at?: string
          updated_at?: string
          referred_by?: string | null
          referral_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "businesses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "businesses_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
      business_photos: {
        Row: {
          business_id: string
          created_at: string
          id: string
          photo_url: string
        }
        Insert: {
          business_id: string
          created_at?: string
          id?: string
          photo_url: string
        }
        Update: {
          business_id?: string
          created_at?: string
          id?: string
          photo_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_photos_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      // Add view definitions if you have any
    }
    Functions: {
      // Add function definitions if you have any
      increment_referral_count: {
        Args: { business_id: string }
        Returns: Json
      }
    }
    Enums: {
      // Add enum definitions if you have any
    }
  }
}
