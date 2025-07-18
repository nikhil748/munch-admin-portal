-- Enable UPDATE and DELETE permissions for products table
CREATE POLICY "Authenticated users can update products" 
  ON public.products 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete products" 
  ON public.products 
  FOR DELETE 
  USING (auth.role() = 'authenticated');