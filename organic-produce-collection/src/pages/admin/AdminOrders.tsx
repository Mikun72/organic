
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/AdminLayout';
import { adminService, Order, formatRupee } from '@/services/adminService';
import { PrinterIcon, DownloadIcon, Search, Filter, ArrowDown, ArrowUp } from 'lucide-react';
import { toast } from 'sonner';

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sortField, setSortField] = useState<'date' | 'total'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await adminService.getOrders();
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);
  
  useEffect(() => {
    // Filter orders based on search query and active tab
    let filtered = orders;
    
    if (searchQuery) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeTab !== 'all') {
      filtered = filtered.filter(order => order.status === activeTab);
    }
    
    // Sort orders
    filtered = [...filtered].sort((a, b) => {
      if (sortField === 'date') {
        return sortDirection === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return sortDirection === 'asc' 
          ? a.total - b.total
          : b.total - a.total;
      }
    });
    
    setFilteredOrders(filtered);
  }, [searchQuery, activeTab, sortField, sortDirection, orders]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const toggleSort = (field: 'date' | 'total') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    // In a real application, this would call an API to update the order status
    // For now, we'll just show a toast
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };
  
  if (loading) {
    return (
      <AdminLayout title="Orders">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-4 w-full max-w-md"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout title="Order Management">
      <Card className="mb-6 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by order ID or customer..."
                className="pl-8 bg-white"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" className="gap-2 shrink-0">
              <Filter size={16} />
              Filter Options
            </Button>
          </div>
          
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4 px-4 text-sm font-medium text-muted-foreground">
                <div className="w-1/3">Order Details</div>
                <div className="w-1/4 flex gap-1 items-center cursor-pointer" onClick={() => toggleSort('date')}>
                  Date
                  {sortField === 'date' && (
                    sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                  )}
                </div>
                <div className="w-1/5">Status</div>
                <div 
                  className="w-1/5 flex gap-1 items-center cursor-pointer text-right" 
                  onClick={() => toggleSort('total')}
                >
                  Total
                  {sortField === 'total' && (
                    sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                  )}
                </div>
                <div className="w-1/6 text-right">Actions</div>
              </div>
              
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 border rounded-md">
                  <p className="text-muted-foreground">No orders found matching your criteria.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden border-primary/10 hover:shadow-sm transition-shadow">
                      <CardContent className="p-4 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                        <div className="md:col-span-1">
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customerName}</p>
                          <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                        </div>
                        
                        <div className="md:col-span-1">
                          <p className="text-sm">{new Date(order.date).toLocaleDateString('en-IN')}</p>
                          <p className="text-xs text-muted-foreground">{new Date(order.date).toLocaleTimeString()}</p>
                        </div>
                        
                        <div className="md:col-span-1">
                          <Badge className={
                            order.status === 'delivered' ? 'bg-green-500' :
                            order.status === 'shipped' ? 'bg-blue-500' :
                            order.status === 'processing' ? 'bg-yellow-500' :
                            order.status === 'cancelled' ? 'bg-red-500' :
                            'bg-gray-500'
                          }>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          <div className="mt-1 flex gap-1">
                            <select 
                              className="text-xs border rounded px-1 py-0.5 bg-white"
                              defaultValue=""
                              onChange={(e) => {
                                if (e.target.value) {
                                  updateOrderStatus(order.id, e.target.value as Order['status']);
                                }
                                e.target.value = "";
                              }}
                            >
                              <option value="" disabled>Update</option>
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="md:col-span-1 text-right">
                          <p className="font-medium">{formatRupee(order.total)}</p>
                          <p className="text-xs text-muted-foreground">{order.items.length} items</p>
                          <p className="text-xs text-muted-foreground">{order.paymentMethod}</p>
                        </div>
                        
                        <div className="md:col-span-1 flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => toast.info('View order details')}
                          >
                            <PrinterIcon size={14} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => toast.info('Download invoice')}
                          >
                            <DownloadIcon size={14} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminOrders;
