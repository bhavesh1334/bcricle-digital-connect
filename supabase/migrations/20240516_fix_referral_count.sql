-- Drop existing function
DROP FUNCTION IF EXISTS increment_referral_count(uuid);

-- Create new function with proper locking
CREATE OR REPLACE FUNCTION increment_referral_count(business_id uuid)
RETURNS void AS $$
BEGIN
  -- Lock the row first
  PERFORM id FROM businesses WHERE id = business_id FOR UPDATE;
  
  -- Then update the referral count
  UPDATE businesses 
  SET referral_count = COALESCE(referral_count, 0) + 1 
  WHERE id = business_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
