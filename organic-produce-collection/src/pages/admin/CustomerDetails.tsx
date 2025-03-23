
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import AdminLayout from '@/components/AdminLayout';
import { adminService, Customer, Order, Feedback } from '@/services/adminService';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard,
  Package,
  CircleDollarSign,
  MessageSquare,
  PrinterIcon,
  DownloadIcon
} from 'lucide-react';

const CustomerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Fetch customer details
        const customerData = await adminService.getCustomerById(id);
        if (!customerData) {
          toast.error('Customer not found');
          navigate('/admin/customers');
          return;
        }
        
        setCustomer(customerData);
        
        // Fetch customer orders
        const ordersData = await adminService.getOrdersByCustomerId(id);
        setOrders(ordersData);
        
        // Fetch customer feedback
        const feedbackData = await adminService.getFeedbackByCustomerId(id);
        setFeedback(feedbackData);
      } catch (error) {
        console.error('Error fetching customer data:', error);
        toast.error('Failed to load customer data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCustomerData();
  }, [id, navigate]);
  
  if (loading) {
    return (
      <AdminLayout title="Customer Details">
        <div className="animate-pulse space-y-4">
          <div className="h-40 bg-gray-200 rounded"></div>
          <div className="h-60 bg-gray-200 rounded"></div>
        </div>
      </AdminLayout>
    );
  }
  
  if (!customer) {
    return (
      <AdminLayout title="Customer Details">
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Customer not found</p>
          <Button onClick={() => navigate('/admin/customers')} className="mt-4">
            Back to Customers List
          </Button>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout title={`Customer: ${customer.name}`}>
      <Button 
        variant="outline" 
        className="gap-2 mb-6" 
        onClick={() => navigate('/admin/customers')}
      >
        <ArrowLeft size={16} />
        Back to Customers
      </Button>
      
      {/* Customer Information */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="h-28 w-28 rounded-full bg-primary/20 overflow-hidden">
                {customer.photoURL ? (
                  <img 
                    src={customer.photoURL} 
                    alt={customer.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary text-3xl font-medium">
                    {customer.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-grow space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{customer.name}</h2>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge variant="outline">ID: {customer.id}</Badge>
                  {isNewCustomer(customer) && (
                    <Badge className="bg-green-500">New Customer</Badge>
                  )}
                  {customer.ordersCount > 5 && (
                    <Badge className="bg-blue-500">Frequent Buyer</Badge>
                  )}
                  {customer.totalSpent > 300 && (
                    <Badge className="bg-purple-500">VIP</Badge>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={16} className="text-muted-foreground" />
                    <span>{customer.email}</span>
                  </div>
                  {customer.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={16} className="text-muted-foreground" />
                      <span>{customer.phone}</span>
                    </div>
                  )}
                  {customer.address && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin size={16} className="text-muted-foreground" />
                      <span>{customer.address}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-muted-foreground" />
                    <span>Joined {new Date(customer.dateJoined).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Package size={16} className="text-muted-foreground" />
                    <span>{customer.ordersCount} orders placed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CircleDollarSign size={16} className="text-muted-foreground" />
                    <span>${customer.totalSpent.toFixed(2)} total spent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs for Orders and Feedback */}
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders" className="gap-2">
            <Package size={14} />
            Orders ({orders.length})
          </TabsTrigger>
          <TabsTrigger value="feedback" className="gap-2">
            <MessageSquare size={14} />
            Feedback ({feedback.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No orders found for this customer.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <Card key={order.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{order.id}</h3>
                              <Badge className={
                                order.status === 'delivered' ? 'bg-green-500' :
                                order.status === 'cancelled' ? 'bg-red-500' :
                                'bg-yellow-500'
                              }>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {new Date(order.date).toLocaleDateString()} · {order.items.length} items
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="font-medium">${order.total.toFixed(2)}</p>
                              <p className="text-xs text-muted-foreground">{order.paymentMethod}</p>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="gap-1 text-xs"
                                onClick={() => toast.info('Invoice printing not implemented')}
                              >
                                <PrinterIcon size={14} />
                                Print
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="gap-1 text-xs"
                                onClick={() => toast.info('Invoice download not implemented')}
                              >
                                <DownloadIcon size={14} />
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Order Items</h4>
                          <div className="border rounded-md divide-y">
                            {order.items.map((item) => (
                              <div key={item.id} className="py-2 px-3 flex justify-between">
                                <div>
                                  <p className="text-sm font-medium">{item.productName}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {item.quantity} x ${item.unitPrice.toFixed(2)}
                                  </p>
                                </div>
                                <p className="font-medium">${item.total.toFixed(2)}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4 text-sm">
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">Shipping Address:</span>
                            <span>{order.shippingAddress}</span>
                          </p>
                          {order.notes && (
                            <p className="flex justify-between mt-1">
                              <span className="text-muted-foreground">Notes:</span>
                              <span>{order.notes}</span>
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              {feedback.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No feedback found for this customer.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {feedback.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={`text-lg ${i < item.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                                    ★
                                  </span>
                                ))}
                              </div>
                              <Badge className={
                                item.status === 'new' ? 'bg-blue-500' :
                                item.status === 'responded' ? 'bg-green-500' :
                                'bg-gray-500'
                              }>
                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {new Date(item.date).toLocaleDateString()}
                            </p>
                          </div>
                          
                          {item.orderIds && item.orderIds.length > 0 && (
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Related to orders:</p>
                              <div className="flex flex-wrap gap-1">
                                {item.orderIds.map(orderId => (
                                  <Badge key={orderId} variant="outline" className="text-xs">
                                    {orderId}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <p className="mt-4 text-sm bg-gray-50 p-3 rounded-md">
                          "{item.message}"
                        </p>
                        
                        {item.status !== 'responded' && (
                          <div className="mt-4 flex justify-end">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => toast.info('Response functionality not implemented')}
                            >
                              Send Response
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

// Helper function to check if a customer is new (joined in the last 30 days)
const isNewCustomer = (customer: Customer) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return new Date(customer.dateJoined) >= thirtyDaysAgo;
};

export default CustomerDetails;
