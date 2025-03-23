
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/AdminLayout';
import { adminService, Feedback } from '@/services/adminService';
import { Search, Filter, MessageCircle, ArrowDown, ArrowUp } from 'lucide-react';
import { toast } from 'sonner';

const AdminFeedback = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [filteredFeedback, setFilteredFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sortField, setSortField] = useState<'date' | 'rating'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await adminService.getFeedback();
        setFeedback(data);
        setFilteredFeedback(data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeedback();
  }, []);
  
  useEffect(() => {
    // Filter feedback based on search query and active tab
    let filtered = feedback;
    
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeTab !== 'all') {
      filtered = filtered.filter(item => item.status === activeTab);
    }
    
    // Sort feedback
    filtered = [...filtered].sort((a, b) => {
      if (sortField === 'date') {
        return sortDirection === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return sortDirection === 'asc' 
          ? a.rating - b.rating
          : b.rating - a.rating;
      }
    });
    
    setFilteredFeedback(filtered);
  }, [searchQuery, activeTab, sortField, sortDirection, feedback]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const toggleSort = (field: 'date' | 'rating') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const updateFeedbackStatus = (id: string, newStatus: Feedback['status']) => {
    // In a real application, this would call an API to update the feedback status
    toast.success(`Feedback ${id} status updated to ${newStatus}`);
  };
  
  if (loading) {
    return (
      <AdminLayout title="Customer Feedback">
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
    <AdminLayout title="Customer Feedback">
      <Card className="mb-6 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle>Feedback & Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by customer or message..."
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
              <TabsTrigger value="all">All Feedback</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
              <TabsTrigger value="responded">Responded</TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4 px-4 text-sm font-medium text-muted-foreground">
                <div className="w-1/4">Customer</div>
                <div 
                  className="w-1/6 flex gap-1 items-center cursor-pointer" 
                  onClick={() => toggleSort('date')}
                >
                  Date
                  {sortField === 'date' && (
                    sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                  )}
                </div>
                <div 
                  className="w-1/6 flex gap-1 items-center cursor-pointer" 
                  onClick={() => toggleSort('rating')}
                >
                  Rating
                  {sortField === 'rating' && (
                    sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                  )}
                </div>
                <div className="w-1/4">Status</div>
                <div className="w-1/6 text-right">Actions</div>
              </div>
              
              {filteredFeedback.length === 0 ? (
                <div className="text-center py-12 border rounded-md">
                  <p className="text-muted-foreground">No feedback found matching your criteria.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFeedback.map((item) => (
                    <Card key={item.id} className="overflow-hidden border-primary/10 hover:shadow-sm transition-shadow">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start mb-4">
                          <div>
                            <p className="font-medium">{item.customerName}</p>
                            <p className="text-xs text-muted-foreground">ID: {item.customerId}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm">{new Date(item.date).toLocaleDateString('en-IN')}</p>
                          </div>
                          
                          <div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-lg ${i < item.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <Badge className={
                              item.status === 'new' ? 'bg-blue-500' :
                              item.status === 'responded' ? 'bg-green-500' :
                              'bg-gray-500'
                            }>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </Badge>
                            
                            <div className="flex gap-2">
                              <select 
                                className="text-xs border rounded px-2 py-1 bg-white"
                                defaultValue=""
                                onChange={(e) => {
                                  if (e.target.value) {
                                    updateFeedbackStatus(item.id, e.target.value as Feedback['status']);
                                  }
                                  e.target.value = "";
                                }}
                              >
                                <option value="" disabled>Update</option>
                                <option value="new">New</option>
                                <option value="reviewed">Reviewed</option>
                                <option value="responded">Responded</option>
                              </select>
                              
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => toast.info('Response functionality not implemented')}
                                className="h-7 gap-1"
                              >
                                <MessageCircle size={14} />
                                Respond
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-orange-50 p-4 rounded-md border border-orange-100">
                          <p className="text-sm">"{item.message}"</p>
                        </div>
                        
                        {item.orderIds && item.orderIds.length > 0 && (
                          <div className="mt-4">
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

export default AdminFeedback;
