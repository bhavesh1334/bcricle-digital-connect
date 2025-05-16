-- Enable RLS on categories table
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to categories
CREATE POLICY "Allow public read access to categories"
ON categories
FOR SELECT
TO public
USING (true);
