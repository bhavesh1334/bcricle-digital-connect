-- Create payment_status enum
CREATE TYPE public.payment_status AS ENUM ('PENDING', 'DONE');

-- Add payment_status column to businesses table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'businesses' 
        AND column_name = 'payment_status'
    ) THEN
        ALTER TABLE public.businesses 
        ADD COLUMN payment_status payment_status DEFAULT 'PENDING';
    END IF;
END $$;

-- Update existing businesses to have PENDING status
UPDATE public.businesses 
SET payment_status = 'PENDING' 
WHERE payment_status IS NULL; 