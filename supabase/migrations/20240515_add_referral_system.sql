-- Add referral columns to businesses table
ALTER TABLE businesses 
ADD COLUMN IF NOT EXISTS referred_by uuid REFERENCES businesses(id),
ADD COLUMN IF NOT EXISTS referral_count integer DEFAULT 0;

-- Create function to increment referral count
CREATE OR REPLACE FUNCTION increment_referral_count(business_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE businesses 
  SET referral_count = COALESCE(referral_count, 0) + 1 
  WHERE id = business_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
