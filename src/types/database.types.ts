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
      // Add your table definitions here
      // Example:
      // users: {
      //   Row: {
      //     id: string
      //     name: string
      //     email: string
      //   }
      //   Insert: {
      //     id?: string
      //     name: string
      //     email: string
      //   }
      //   Update: {
      //     id?: string
      //     name?: string
      //     email?: string
      //   }
      // }
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
