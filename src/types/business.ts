export interface Business {
  id: string;
  owner_id: string;
  name: string;
  category: string;
  description: string;
  address?: string;
  city: string;
  state: string;
  pincode?: string;
  whatsapp: string;
  website?: string;
  instagram_link?: string;
  logo_url: string | null;
  cover_image: string | null;
  founded?: string;
  verified: boolean;
  payment_status: 'PENDING' | 'DONE';
  referral_count: number;
  referred_by?: string;
  created_at?: string;
  updated_at?: string;
}
