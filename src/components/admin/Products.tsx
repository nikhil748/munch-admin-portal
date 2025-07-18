
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean | null;
  display_order: number | null;
}

interface MenuCategory {
  id: string;
  name: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    category_id: '',
    name: '',
    description: '',
    price: '',
    image_url: '',
    display_order: '',
    is_available: true
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          menu_categories (
            name
          )
        `)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({ title: 'Error', description: 'Failed to fetch products', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_categories')
        .select('id, name')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAdd = async () => {
    try {
      const { error } = await supabase
        .from('products')
        .insert([formData]);

      if (error) throw error;
      
      toast({ title: 'Success', description: 'Product added successfully' });
      setShowAddForm(false);
      setFormData({
        category_id: '',
        name: '',
        description: '',
        price: '',
        image_url: '',
        display_order: '',
        is_available: true
      });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      toast({ title: 'Error', description: 'Failed to add product', variant: 'destructive' });
    }
  };

  const handleUpdate = async (id: string, updatedData: Partial<Product>) => {
    try {
      const { error } = await supabase
        .from('products')
        .update(updatedData)
        .eq('id', id);

      if (error) throw error;
      
      toast({ title: 'Success', description: 'Product updated successfully' });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      toast({ title: 'Error', description: 'Failed to update product', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({ title: 'Success', description: 'Product deleted successfully' });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({ title: 'Error', description: 'Failed to delete product', variant: 'destructive' });
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || 'Unknown';
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              className="border rounded-lg px-3 py-2"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="number"
              placeholder="Display Order"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="url"
              placeholder="Image URL"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="border rounded-lg px-3 py-2 md:col-span-2"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border rounded-lg px-3 py-2 md:col-span-2"
              rows={3}
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_available}
                onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                className="rounded"
              />
              <label>Available</label>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAdd}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {product.image_url && (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getCategoryName(product.category_id)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.is_available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingId(editingId === product.id ? null : product.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
              {editingId === product.id && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 bg-gray-50">
                    <EditProductForm
                      product={product}
                      categories={categories}
                      onSave={(updatedData) => handleUpdate(product.id, updatedData)}
                      onCancel={() => setEditingId(null)}
                    />
                  </td>
                </tr>
              )}
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const EditProductForm: React.FC<{
  product: Product;
  categories: MenuCategory[];
  onSave: (updatedData: Partial<Product>) => void;
  onCancel: () => void;
}> = ({ product, categories, onSave, onCancel }) => {
  const [editData, setEditData] = useState({
    category_id: product.category_id,
    name: product.name,
    description: product.description || '',
    price: product.price.toString(),
    image_url: product.image_url || '',
    display_order: product.display_order?.toString() || '0',
    is_available: product.is_available ?? true
  });

  const handleSave = () => {
    const updatedData = {
      ...editData,
      price: parseFloat(editData.price) || 0,
      display_order: parseInt(editData.display_order) || 0
    };
    onSave(updatedData);
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Edit Product</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={editData.category_id}
          onChange={(e) => setEditData({ ...editData, category_id: e.target.value })}
          className="border rounded-lg px-3 py-2"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Product Name"
          value={editData.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          className="border rounded-lg px-3 py-2"
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={editData.price}
          onChange={(e) => setEditData({ ...editData, price: e.target.value })}
          className="border rounded-lg px-3 py-2"
        />
        <input
          type="number"
          placeholder="Display Order"
          value={editData.display_order}
          onChange={(e) => setEditData({ ...editData, display_order: e.target.value })}
          className="border rounded-lg px-3 py-2"
        />
        <input
          type="url"
          placeholder="Image URL"
          value={editData.image_url}
          onChange={(e) => setEditData({ ...editData, image_url: e.target.value })}
          className="border rounded-lg px-3 py-2 md:col-span-2"
        />
        <textarea
          placeholder="Description"
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          className="border rounded-lg px-3 py-2 md:col-span-2"
          rows={3}
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={editData.is_available}
            onChange={(e) => setEditData({ ...editData, is_available: e.target.checked })}
            className="rounded"
          />
          <label>Available</label>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Save size={16} />
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <X size={16} />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Products;
