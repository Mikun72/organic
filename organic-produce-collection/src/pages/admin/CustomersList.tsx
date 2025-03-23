
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/AdminLayout';
import { adminService, Customer } from '@/services/adminService';
import { ArrowUpRight, Search, Filter, Calendar, DollarSign, ShoppingBag } from 'lucide-react';

const CustomersList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await adminService.getCustomers();
        setCustomers(data);
        setFilteredCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCustomers();
  }, []);
  
  useEffect(() => {
    // Filter customers based on search query and active tab
    let filtered = customers;
    
    if (searchQuery) {
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeTab === 'new') {
      // New customers (joined in the last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filtered = filtered.filter(customer => 
        new Date(customer.dateJoined) >= thirtyDaysAgo
      );
    } else if (activeTab === 'active') {
      // Active customers (with orders)
      filtered = filtered.filter(customer => customer.ordersCount > 0);
    } else if (activeTab === 'highValue') {
      // High-value customers (spent more than $200)
      filtered = filtered.filter(customer => customer.totalSpent > 200);
    }
    
    setFilteredCustomers(filtered);
  }, [searchQuery, activeTab, customers]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  if (loading) {
    return (
      <AdminLayout title="Customers">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-4 w-full max-w-md"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout title="Customers">
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Customer Management</CardTitle>
          <CardDescription>
            View and manage all customer accounts, orders, and information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, email or ID..."
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
              <TabsTrigger value="all">All Customers</TabsTrigger>
              <TabsTrigger value="new">
                <Calendar size={14} className="mr-1" /> New
              </TabsTrigger>
              <TabsTrigger value="active">
                <ShoppingBag size={14} className="mr-1" /> Active
              </TabsTrigger>
              <TabsTrigger value="highValue">
                <DollarSign size={14} className="mr-1" /> High Value
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-4">
              {filteredCustomers.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No customers found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredCustomers.map((customer) => (
                    <Card key={customer.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary/20 overflow-hidden">
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
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                ID: {customer.id}
                              </Badge>
                              {isNewCustomer(customer) && (
                                <Badge className="bg-green-500 text-xs">New</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-between">
                          <div>
                            <p className="text-xs font-medium">Orders</p>
                            <p className="font-medium">{customer.ordersCount}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium">Spent</p>
                            <p className="font-medium">${customer.totalSpent.toFixed(2)}</p>
                          </div>
                          <Link 
                            to={`/admin/customers/${customer.id}`}
                            className="text-primary text-sm flex items-center gap-1 hover:underline"
                          >
                            Details <ArrowUpRight size={14} />
                          </Link>
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

// Helper function to check if a customer is new (joined in the last 30 days)
const isNewCustomer = (customer: Customer) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return new Date(customer.dateJoined) >= thirtyDaysAgo;
};

export default CustomersList;
