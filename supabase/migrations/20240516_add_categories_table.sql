-- Create categories table
CREATE TABLE categories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar(255) NOT NULL,
    description text,
    icon varchar(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Add category_id to businesses table
ALTER TABLE businesses
ADD COLUMN IF NOT EXISTS category_id uuid REFERENCES categories(id);

-- Insert dummy categories
INSERT INTO categories (name, description, icon) VALUES
    ('Restaurants & Cafes', 'Dining establishments including restaurants, cafes, and food service businesses', 'utensils'),
    ('Technology & IT', 'Technology companies, IT services, software development, and digital solutions', 'laptop-code'),
    ('Healthcare & Medical', 'Medical practices, healthcare services, and wellness centers', 'hospital'),
    ('Real Estate', 'Real estate agencies, property management, and construction services', 'building'),
    ('Education & Training', 'Educational institutions, training centers, and learning services', 'graduation-cap'),
    ('Retail & Shopping', 'Retail stores, shopping centers, and consumer goods businesses', 'shopping-cart'),
    ('Professional Services', 'Legal, accounting, consulting, and other professional services', 'briefcase'),
    ('Automotive', 'Car dealerships, auto repair shops, and vehicle services', 'car'),
    ('Beauty & Wellness', 'Salons, spas, fitness centers, and wellness services', 'spa'),
    ('Manufacturing', 'Manufacturing companies, industrial services, and production facilities', 'industry');

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
