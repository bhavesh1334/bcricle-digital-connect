
-- Create storage bucket for business images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('business-images', 'Business Images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies to allow anyone to read images
CREATE POLICY "Public Access to Business Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'business-images');

-- Create storage policies to allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload business images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'business-images' AND auth.role() = 'authenticated');

-- Create storage policies to allow users to update their own images
CREATE POLICY "Users can update their own business images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'business-images' AND auth.uid() = owner);

-- Create storage policies to allow users to delete their own images
CREATE POLICY "Users can delete their own business images"
ON storage.objects FOR DELETE
USING (bucket_id = 'business-images' AND auth.uid() = owner);
