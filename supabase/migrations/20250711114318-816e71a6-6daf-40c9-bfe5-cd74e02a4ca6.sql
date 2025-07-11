
-- Create menu categories table
CREATE TABLE public.menu_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) for menu_categories
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for menu_categories (public read access, admin write access)
CREATE POLICY "Anyone can view menu categories" 
  ON public.menu_categories 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can manage menu categories" 
  ON public.menu_categories 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Add Row Level Security (RLS) for products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies for products (public read access, admin write access)
CREATE POLICY "Anyone can view products" 
  ON public.products 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can manage products" 
  ON public.products 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Insert some sample menu categories
INSERT INTO public.menu_categories (name, description, display_order) VALUES
('Fresh Juices', 'Freshly squeezed natural juices', 1),
('Milkshakes', 'Creamy and delicious milkshakes', 2),
('Smoothies', 'Healthy fruit and vegetable smoothies', 3),
('Ice Creams', 'Premium ice cream varieties', 4),
('Desserts', 'Sweet treats and desserts', 5);

-- Insert some sample products
INSERT INTO public.products (category_id, name, description, price, is_available, display_order) VALUES
-- Fresh Juices
((SELECT id FROM public.menu_categories WHERE name = 'Fresh Juices'), 'Fresh Orange Juice', 'Freshly squeezed orange juice', 4.99, true, 1),
((SELECT id FROM public.menu_categories WHERE name = 'Fresh Juices'), 'Apple Juice', 'Pure apple juice with no additives', 4.50, true, 2),
((SELECT id FROM public.menu_categories WHERE name = 'Fresh Juices'), 'Pineapple Juice', 'Tropical pineapple juice', 5.25, true, 3),

-- Milkshakes
((SELECT id FROM public.menu_categories WHERE name = 'Milkshakes'), 'Chocolate Milkshake', 'Rich chocolate milkshake with whipped cream', 6.99, true, 1),
((SELECT id FROM public.menu_categories WHERE name = 'Milkshakes'), 'Vanilla Milkshake', 'Classic vanilla milkshake', 6.50, true, 2),
((SELECT id FROM public.menu_categories WHERE name = 'Milkshakes'), 'Strawberry Milkshake', 'Fresh strawberry milkshake', 6.75, true, 3),

-- Smoothies
((SELECT id FROM public.menu_categories WHERE name = 'Smoothies'), 'Mango Smoothie', 'Tropical mango smoothie with yogurt', 7.25, true, 1),
((SELECT id FROM public.menu_categories WHERE name = 'Smoothies'), 'Berry Blast Smoothie', 'Mixed berry smoothie packed with antioxidants', 7.50, true, 2);
