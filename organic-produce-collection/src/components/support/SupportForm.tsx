
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { User, Mail, Phone, ShoppingCart, Send } from 'lucide-react';

const SupportForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [queryType, setQueryType] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message || !queryType) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Your message has been sent! Our team will get back to you soon.');
      setName('');
      setEmail('');
      setPhone('');
      setOrderNumber('');
      setQueryType('');
      setMessage('');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Us a Message</CardTitle>
        <CardDescription>
          Fill out the form below and we'll get back to you as soon as possible
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User size={16} /> Full Name
              </Label>
              <Input 
                id="name" 
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail size={16} /> Email
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone size={16} /> Phone Number (Optional)
              </Label>
              <Input 
                id="phone" 
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="orderNumber" className="flex items-center gap-2">
                <ShoppingCart size={16} /> Order Number (Optional)
              </Label>
              <Input 
                id="orderNumber" 
                placeholder="If related to an order"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="queryType">Query Type</Label>
            <Select 
              value={queryType} 
              onValueChange={setQueryType}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select query type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="order_status">Order Status</SelectItem>
                <SelectItem value="product_inquiry">Product Inquiry</SelectItem>
                <SelectItem value="refund_request">Refund Request</SelectItem>
                <SelectItem value="shipping_issue">Shipping Issue</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
                <SelectItem value="bulk_order">Bulk Order Inquiry</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea 
              id="message" 
              placeholder="Please describe your query in detail..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
            />
          </div>
          
          <Button type="submit" className="w-full flex items-center gap-2" disabled={isLoading}>
            {isLoading ? 'Sending...' : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SupportForm;
