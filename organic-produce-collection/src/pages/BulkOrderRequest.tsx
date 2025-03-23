
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CalendarIcon, User, Mail, Phone, MapPin, Calendar as CalendarIcon2, Info, FileText, CheckCircle2, HelpCircle } from 'lucide-react';

const BulkOrderRequest = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('');
  const [products, setProducts] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [codRequested, setCodRequested] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone || !eventType || !products || !location || !date) {
      toast.error('Please fill all required fields');
      return;
    }
    
    if (!agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    
    setIsLoading(true);
    
    // Generate a ticket ID - timestamp + random 4 digits
    const ticketId = `BOR-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Simulate API call
    setTimeout(() => {
      // Navigate to confirmation page with form data and ticket ID
      navigate('/bulk-order-confirmation', { 
        state: { 
          ticketId,
          name,
          email,
          phone,
          eventType,
          products,
          location,
          deliveryDate: date,
          codRequested
        } 
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gradient-to-b from-harvest-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 mt-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Bulk Order Request</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Planning a special event? Request a bulk order and our admin team will get in touch with you to customize your order.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Terms and Info */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Terms & Conditions
                  </CardTitle>
                  <CardDescription>
                    Please read these important terms carefully
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-harvest-600 mt-0.5 flex-shrink-0" />
                    <p>Bulk order requests must be submitted at least <span className="font-semibold">48 hours</span> prior to the required delivery date.</p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-harvest-600 mt-0.5 flex-shrink-0" />
                    <p><span className="font-semibold">50% advance payment</span> is required to confirm and process your order after admin approval. Payment will be charged <span className="font-semibold">only in online mode</span>.</p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-harvest-600 mt-0.5 flex-shrink-0" />
                    <p>If the order is canceled after processing has begun, a <span className="font-semibold">25% cancellation fee</span> will be charged.</p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-harvest-600 mt-0.5 flex-shrink-0" />
                    <p>Final order adjustments must be made at least <span className="font-semibold">24 hours</span> before the delivery date.</p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-harvest-600 mt-0.5 flex-shrink-0" />
                    <p>Delivery charges may vary based on location and order size.</p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-harvest-600 mt-0.5 flex-shrink-0" />
                    <p>The final price will be determined based on product availability and market rates at the time of order confirmation.</p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-harvest-600 mt-0.5 flex-shrink-0" />
                    <p>If you have any queries regarding the online payment, please contact our admin team at <span className="font-semibold">9337385677</span> or through the customer support page.</p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-harvest-600 mt-0.5 flex-shrink-0" />
                    <p>Cash on delivery option may be available subject to admin approval for specific cases.</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Why Choose Our Bulk Order Service?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-harvest-50 p-3 rounded-md">
                    <h3 className="font-medium text-harvest-700">Fresh & Premium Quality</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      All our products are fresh from the farm, ensuring premium quality for your special events.
                    </p>
                  </div>
                  
                  <div className="bg-harvest-50 p-3 rounded-md">
                    <h3 className="font-medium text-harvest-700">Customizable Orders</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      We work with you to customize your order according to your specific requirements.
                    </p>
                  </div>
                  
                  <div className="bg-harvest-50 p-3 rounded-md">
                    <h3 className="font-medium text-harvest-700">Reliable Delivery</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      We ensure timely delivery to make your event planning seamless and stress-free.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Bulk Order Form */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <Card>
                <CardHeader>
                  <CardTitle>Bulk Order Request Form</CardTitle>
                  <CardDescription>
                    Fill out the form below to request a bulk order for your event
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone size={16} /> Mobile Number
                      </Label>
                      <Input 
                        id="phone" 
                        placeholder="Your Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="eventType">Request Purpose</Label>
                      <Select 
                        value={eventType} 
                        onValueChange={setEventType}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wedding">Wedding</SelectItem>
                          <SelectItem value="family_event">Family Event</SelectItem>
                          <SelectItem value="funeral">Funeral</SelectItem>
                          <SelectItem value="picnic">Picnic Party</SelectItem>
                          <SelectItem value="corporate">Corporate Event</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="products">Required Products</Label>
                      <Textarea 
                        id="products" 
                        placeholder="List the products and quantities you need..."
                        value={products}
                        onChange={(e) => setProducts(e.target.value)}
                        rows={3}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location" className="flex items-center gap-2">
                        <MapPin size={16} /> Delivery Location
                      </Label>
                      <Input 
                        id="location" 
                        placeholder="Full delivery address"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="date" className="flex items-center gap-2">
                        <CalendarIcon2 size={16} /> Delivery Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Select delivery date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => {
                              // Disable dates in the past
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              
                              // Also disable dates less than 48 hours from now
                              const minDate = new Date();
                              minDate.setHours(0, 0, 0, 0);
                              minDate.setDate(minDate.getDate() + 2);
                              
                              return date < minDate;
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <p className="text-xs text-muted-foreground">
                        Please select a date at least 48 hours from today.
                      </p>
                    </div>
                    
                    <div className="flex items-start space-x-2 mt-4 bg-gray-50 p-3 rounded-md">
                      <Checkbox 
                        id="cod" 
                        checked={codRequested}
                        onCheckedChange={(checked) => setCodRequested(checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="cod"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Request Cash on Delivery (subject to admin approval)
                        </label>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <HelpCircle className="h-3 w-3 mr-1 inline" />
                          Standard payment is 50% advance online payment. COD requests will be evaluated case by case.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2 mt-4">
                      <Checkbox 
                        id="terms" 
                        checked={agreeToTerms}
                        onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                        required
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the terms and conditions
                        </label>
                        <p className="text-xs text-muted-foreground">
                          By submitting this form, you agree to our bulk order terms including the advance payment and cancellation policies.
                        </p>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading || !agreeToTerms}>
                      {isLoading ? 'Submitting...' : 'Submit Bulk Order Request'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BulkOrderRequest;
