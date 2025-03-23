
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  MessageSquare, 
  LogOut, 
  Menu, 
  X,
  IndianRupee
} from 'lucide-react';
import { authService } from '@/services/authService';
import { toast } from 'sonner';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const admin = authService.getCurrentAdmin();
  
  const handleLogout = () => {
    authService.adminLogout();
    toast.success('Logged out successfully');
    navigate('/admin');
  };
  
  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/customers', label: 'Customers', icon: <Users size={20} /> },
    { path: '/admin/orders', label: 'Orders', icon: <ShoppingBag size={20} /> },
    { path: '/admin/feedback', label: 'Feedback', icon: <MessageSquare size={20} /> },
  ];
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      {/* Top nav */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-md">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden text-white hover:bg-orange-600">
              <Menu size={20} />
            </Button>
            <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
              <IndianRupee size={24} />
              <span>Farm Fresh India</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            {admin && (
              <div className="flex items-center gap-2">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-white">{admin.name}</p>
                  <p className="text-xs text-orange-100">Admin</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-orange-600 text-sm font-medium overflow-hidden border-2 border-orange-200">
                  {admin.photoURL ? (
                    <img src={admin.photoURL} alt={admin.name} className="w-full h-full object-cover" />
                  ) : (
                    admin.name.charAt(0)
                  )}
                </div>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-white hover:bg-orange-600">
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleSidebar} />
        )}
        
        {/* Sidebar */}
        <aside 
          className={`
            fixed md:static inset-y-0 left-0 w-64 bg-white border-r shadow-sm z-50 transform 
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            transition-transform duration-300 ease-in-out md:block
          `}
        >
          <div className="p-4 flex justify-between items-center md:hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <h2 className="font-semibold text-lg">Admin Panel</h2>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hover:bg-orange-600 text-white">
              <X size={20} />
            </Button>
          </div>
          
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 py-2 px-3 rounded-md text-sm font-medium transition-colors
                  ${location.pathname === item.path 
                    ? 'bg-orange-100 text-orange-600' 
                    : 'text-gray-700 hover:bg-orange-50'}
                `}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="p-4 mt-4 border-t">
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <IndianRupee size={18} className="text-orange-600" />
                <span className="text-sm font-medium">Farm Fresh India</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Admin Dashboard v1.0</p>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 border-b pb-2 border-orange-200">{title}</h1>
          </div>
          
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
