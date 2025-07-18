
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Users, TrendingUp, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M&M</span>
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">Melt&Munch</h1>
            </div>
            <Link
              to="/admin/login"
              className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              <Shield size={16} className="mr-2" />
              Admin Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-orange-500">Melt&Munch</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Delicious treats that melt in your mouth and make you want to munch for more. 
            Experience the perfect blend of flavors crafted with love and passion.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
              Order Now
            </button>
            <Link to="/menu" className="px-8 py-3 border border-orange-500 text-orange-500 hover:bg-orange-50 rounded-lg font-medium transition-colors">
              View Menu
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="text-orange-500" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Ordering</h3>
            <p className="text-gray-600">
              Simple and intuitive ordering process with real-time tracking of your delicious treats.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-orange-500" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Loved</h3>
            <p className="text-gray-600">
              Trusted by thousands of customers who can't get enough of our mouthwatering selections.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-orange-500" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Quality</h3>
            <p className="text-gray-600">
              Made with the finest ingredients and crafted to perfection for an unforgettable experience.
            </p>
          </div>
        </div>

        {/* Admin Section */}
        <div className="mt-20 bg-white rounded-xl p-8 shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Admin Panel</h2>
            <p className="text-gray-600 mb-8">
              Manage your Melt&Munch business with our comprehensive admin dashboard.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Dashboard</h3>
                <p className="text-sm text-gray-600">Overview of sales, orders, and performance metrics</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Orders</h3>
                <p className="text-sm text-gray-600">Manage and track all customer orders</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Products</h3>
                <p className="text-sm text-gray-600">Add, edit, and manage your product catalog</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
                <p className="text-sm text-gray-600">Detailed insights and performance reports</p>
              </div>
            </div>
            <Link
              to="/admin/login"
              className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
            >
              <Shield size={20} className="mr-2" />
              Access Admin Panel
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
