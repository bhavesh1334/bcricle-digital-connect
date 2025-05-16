-- First, rename the existing category column to category_old
ALTER TABLE businesses
RENAME COLUMN category TO category_old;

-- Add new UUID column
ALTER TABLE businesses
ADD COLUMN category uuid;

-- Update the new column with converted values where possible
UPDATE businesses
SET category = category_old::uuid
WHERE category_old IS NOT NULL
AND category_old ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';

-- Add the foreign key constraint
ALTER TABLE businesses
ADD CONSTRAINT fk_category
FOREIGN KEY (category)
REFERENCES categories(id);

-- Drop the old column
-- Note: Only uncomment this after verifying the data migration was successful
-- ALTER TABLE businesses DROP COLUMN category_old;
