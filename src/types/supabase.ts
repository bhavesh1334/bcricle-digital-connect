import { Database } from './database.types.ts'

declare global {
  type Tables = Database['public']['Tables']
  type Enums = Database['public']['Enums']
}

// Extend the TypeScript declaration for Supabase client
declare module '@supabase/supabase-js' {
  interface SupabaseClient {
    rpc<T = any>(
      fn: 'increment_referral_count',
      params: { business_id: string }
    ): Promise<{ data: T; error: null } | { data: null; error: any }>
  }
}
