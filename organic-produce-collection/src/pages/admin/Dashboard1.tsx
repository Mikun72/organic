
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, CreditCard, BarChart2, ShoppingBag, LogOut } from 'lucide-react';

const Dashboard1 = () => {
  const navigate = useNavigate();
  
  // Check if admin is authenticated
  React.useEffect(() => {
    const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
    const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
    
    if (!isAdminAuthenticated || adminUser.id !== 1) {
      navigate('/admin');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-harvest-500 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Fresh Harvest Hub Admin</h1>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-sm font-medium text-gray-700">Swastik Kumar Das</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">Dashboard - Inventory Manager</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">125</div>
                <div className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">+12%</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">14</div>
                <div className="ml-auto bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Critical</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Pending Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">28</div>
                <div className="ml-auto bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Active</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">₹85,240</div>
                <div className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">+8.5%</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Inventory Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <BarChart2 className="h-16 w-16 text-gray-300" />
                <p className="ml-4 text-gray-500">Inventory statistics chart</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Package className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New stock added</p>
                      <p className="text-xs text-gray-500">{30 - i * 5} minutes ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard1;
