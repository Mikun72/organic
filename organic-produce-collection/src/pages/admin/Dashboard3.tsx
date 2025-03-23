
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquare, Star, PieChart, ShoppingBag, LogOut } from 'lucide-react';

const Dashboard3 = () => {
  const navigate = useNavigate();
  
  // Check if admin is authenticated
  React.useEffect(() => {
    const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
    const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
    
    if (!isAdminAuthenticated || adminUser.id !== 3) {
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
            <span className="mr-4 text-sm font-medium text-gray-700">Subhransu Mohapatra</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">Dashboard - Customer Relations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">1,248</div>
                <div className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">+24%</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">New Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">18</div>
                <div className="ml-auto bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Pending</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">4.8</div>
                <div className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Excellent</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">7</div>
                <div className="ml-auto bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Active</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Customer Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <PieChart className="h-16 w-16 text-gray-300" />
                <p className="ml-4 text-gray-500">Customer feedback chart</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Neha Singh', rating: 5, comment: 'Excellent quality and fast delivery!' },
                  { name: 'Raj Malhotra', rating: 4, comment: 'Very good products, but delivery was a bit delayed.' },
                  { name: 'Ananya Desai', rating: 5, comment: 'The vegetables were so fresh, will order again!' },
                  { name: 'Karan Shah', rating: 3, comment: 'Good service but some items were missing.' }
                ].map((item, i) => (
                  <div key={i} className="border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs ml-1">{item.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">{item.comment}</p>
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

export default Dashboard3;
