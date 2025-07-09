
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { logout } = useAuth();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={toggleSidebar} 
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col">
        <AdminHeader title="Dashboard" />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
