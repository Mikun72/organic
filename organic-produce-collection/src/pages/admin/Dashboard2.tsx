
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, CreditCard, LineChart, ShoppingBag, LogOut } from 'lucide-react';

const Dashboard2 = () => {
  const navigate = useNavigate();
  
  // Check if admin is authenticated
  React.useEffect(() => {
    const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
    const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
    
    if (!isAdminAuthenticated || adminUser.id !== 2) {
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
            <span className="mr-4 text-sm font-medium text-gray-700">Soumyashree Nayak</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">Dashboard - Sales Manager</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Daily Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">42</div>
                <div className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">+18%</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Daily Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">₹12,485</div>
                <div className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">+5%</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">89</div>
                <div className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Online</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">4.2%</div>
                <div className="ml-auto bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Average</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Sales Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <LineChart className="h-16 w-16 text-gray-300" />
                <p className="ml-4 text-gray-500">Sales statistics chart</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-medium text-red-700">1</span>
                    </div>
                    <span className="font-medium">Organic Tomatoes</span>
                  </div>
                  <span className="text-sm">284 sold</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-medium text-orange-700">2</span>
                    </div>
                    <span className="font-medium">Fresh Bananas</span>
                  </div>
                  <span className="text-sm">253 sold</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-medium text-yellow-700">3</span>
                    </div>
                    <span className="font-medium">Organic Potatoes</span>
                  </div>
                  <span className="text-sm">241 sold</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-medium text-gray-700">4</span>
                    </div>
                    <span className="font-medium">Fresh Apples</span>
                  </div>
                  <span className="text-sm">207 sold</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard2;
