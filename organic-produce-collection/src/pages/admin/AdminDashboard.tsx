
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/components/AdminLayout';
import { adminService, formatRupee } from '@/services/adminService';
import { IndianRupee, ShoppingCart, Users, Smile } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const dashboardStats = await adminService.getDashboardStats();
        setStats(dashboardStats);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  // Prepare data for the orders status chart
  const orderStatusData = stats ? [
    { name: 'Pending', value: stats.ordersByStatus.pending },
    { name: 'Processing', value: stats.ordersByStatus.processing },
    { name: 'Shipped', value: stats.ordersByStatus.shipped },
    { name: 'Delivered', value: stats.ordersByStatus.delivered },
    { name: 'Cancelled', value: stats.ordersByStatus.cancelled },
  ] : [];
  
  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout title="Dashboard">
      {stats && (
        <>
          {/* Stat cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-primary/20 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <IndianRupee className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{formatRupee(stats.totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">
                  Avg. {formatRupee(stats.averageOrderValue)} per order
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{stats.totalOrders}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.ordersByStatus.pending} pending orders
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.totalCustomers}</div>
                <p className="text-xs text-muted-foreground">
                  Active in the last 30 days
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customer Feedback</CardTitle>
                <Smile className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.averageRating.toFixed(1)}/5</div>
                <p className="text-xs text-muted-foreground">
                  Based on {stats.totalFeedback} reviews
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid gap-4 md:grid-cols-2 mt-6">
            <Card className="border-primary/20 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Orders by Status</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={orderStatusData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} Orders`, 'Count']} />
                    <Bar dataKey="value" fill="#ff9933" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentOrders.map((order: any) => (
                    <div key={order.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.date).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatRupee(order.total)}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link 
                    to="/admin/orders" 
                    className="text-primary text-sm flex items-center gap-1 hover:underline"
                  >
                    View all orders <IndianRupee size={14} />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent customers */}
          <Card className="mt-6 border-primary/20 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Recent Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.recentCustomers.map((customer: any) => (
                  <Card key={customer.id} className="overflow-hidden border-primary/10">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-orange-100 overflow-hidden border border-orange-300">
                          {customer.photoURL ? (
                            <img 
                              src={customer.photoURL} 
                              alt={customer.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-primary font-medium">
                              {customer.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                          <p className="text-xs text-muted-foreground">
                            Joined {new Date(customer.dateJoined).toLocaleDateString('en-IN')}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between">
                        <div>
                          <p className="text-xs font-medium">Orders</p>
                          <p className="font-medium">{customer.ordersCount}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium">Spent</p>
                          <p className="font-medium">{formatRupee(customer.totalSpent)}</p>
                        </div>
                        <Link 
                          to={`/admin/customers/${customer.id}`}
                          className="text-primary text-sm flex items-center gap-1 hover:underline"
                        >
                          Details
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-4">
                <Link 
                  to="/admin/customers" 
                  className="text-primary text-sm flex items-center gap-1 hover:underline"
                >
                  View all customers
                </Link>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
