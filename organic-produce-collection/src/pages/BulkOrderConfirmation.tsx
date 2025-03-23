
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle, CreditCard, Smartphone, Building, Truck, CalendarClock, CreditCard as CreditCardIcon } from 'lucide-react';

interface BulkOrderData {
  ticketId: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  products: string;
  location: string;
  deliveryDate: Date;
}

const BulkOrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state as BulkOrderData;
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  // Credit Card State
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  // UPI State
  const [upiId, setUpiId] = useState('');
  
  // Net Banking State
  const [bankName, setBankName] = useState('');
  
  // If no order data is available, redirect to bulk order request
  if (!orderData?.ticketId) {
    navigate('/bulk-order-request');
    return null;
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate payment details based on payment method
    if (paymentMethod === 'credit_card') {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        toast.error('Please fill all credit card details');
        return;
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId) {
        toast.error('Please enter your UPI ID');
        return;
      }
    } else if (paymentMethod === 'net_banking') {
      if (!bankName) {
        toast.error('Please select your bank');
        return;
      }
    }
    
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success('Advance payment successful! Your bulk order has been confirmed.');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gradient-to-b from-harvest-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Request Submitted Successfully!</h1>
            <p className="text-gray-600">
              Your bulk order request has been received. Please make the advance payment to proceed.
            </p>
          </div>
          
          <Card className="mb-8 border-green-200 bg-green-50/50">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Request Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Ticket ID:</span>
                      <span className="font-medium">{orderData.ticketId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name:</span>
                      <span>{orderData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email:</span>
                      <span>{orderData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phone:</span>
                      <span>{orderData.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Order Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Event Type:</span>
                      <span>{orderData.eventType.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Delivery Date:</span>
                      <span>{orderData.deliveryDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Delivery Location:</span>
                      <span className="text-right">{orderData.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className="text-amber-600 font-medium">Awaiting Payment</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-2">Products Requested</h3>
                <p className="text-sm bg-white p-3 rounded border border-green-100">
                  {orderData.products}
                </p>
              </div>
              
              <div className="mt-6 bg-amber-50 p-4 rounded-md border border-amber-100">
                <div className="flex items-start gap-2">
                  <CalendarClock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-amber-800">Next Steps</h3>
                    <p className="text-sm text-amber-700 mt-1">
                      Our team will review your request and prepare a quote. Please complete the 50% advance payment to confirm your order.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Complete 50% Advance Payment</CardTitle>
              <CardDescription>
                Choose your preferred payment method to confirm your bulk order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <RadioGroup 
                  defaultValue="credit_card" 
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-2 gap-4 md:grid-cols-4"
                >
                  <Label
                    htmlFor="credit_card"
                    className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:bg-accent ${
                      paymentMethod === 'credit_card' ? 'border-primary' : 'border-muted'
                    }`}
                  >
                    <RadioGroupItem value="credit_card" id="credit_card" className="sr-only" />
                    <CreditCardIcon className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">Credit/Debit Card</span>
                  </Label>
                  
                  <Label
                    htmlFor="upi"
                    className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:bg-accent ${
                      paymentMethod === 'upi' ? 'border-primary' : 'border-muted'
                    }`}
                  >
                    <RadioGroupItem value="upi" id="upi" className="sr-only" />
                    <Smartphone className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">UPI</span>
                  </Label>
                  
                  <Label
                    htmlFor="net_banking"
                    className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:bg-accent ${
                      paymentMethod === 'net_banking' ? 'border-primary' : 'border-muted'
                    }`}
                  >
                    <RadioGroupItem value="net_banking" id="net_banking" className="sr-only" />
                    <Building className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">Net Banking</span>
                  </Label>
                  
                  <Label
                    htmlFor="cash_on_delivery"
                    className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:bg-accent opacity-60 ${
                      paymentMethod === 'cash_on_delivery' ? 'border-primary' : 'border-muted'
                    }`}
                  >
                    <RadioGroupItem value="cash_on_delivery" id="cash_on_delivery" className="sr-only" disabled />
                    <Truck className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">Cash on Delivery</span>
                    <span className="text-xs text-muted-foreground mt-1">(Subject to approval)</span>
                  </Label>
                </RadioGroup>
              </div>
              
              <form onSubmit={handlePayment}>
                {paymentMethod === 'credit_card' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="card-name">Cardholder Name</Label>
                        <Input
                          id="card-name"
                          placeholder="Name as it appears on card"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'upi' && (
                  <Tabs defaultValue="google_pay" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="google_pay">Google Pay</TabsTrigger>
                      <TabsTrigger value="phone_pe">PhonePe</TabsTrigger>
                      <TabsTrigger value="other_upi">Other UPI</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="google_pay" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="gpay-upi">Google Pay UPI ID</Label>
                        <Input
                          id="gpay-upi"
                          placeholder="yourname@okicici"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          required
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="phone_pe" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phonepe-upi">PhonePe UPI ID</Label>
                        <Input
                          id="phonepe-upi"
                          placeholder="yourname@ybl"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          required
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="other_upi" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="other-upi">UPI ID</Label>
                        <Input
                          id="other-upi"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          required
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
                
                {paymentMethod === 'net_banking' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank-name">Select Bank</Label>
                      <select
                        id="bank-name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        required
                      >
                        <option value="">Select your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'cash_on_delivery' && (
                  <div className="bg-muted p-4 rounded-md text-center">
                    <p className="text-sm text-muted-foreground">
                      Cash on Delivery requires admin approval. Please contact our support team at 9337385677
                      to discuss this option.
                    </p>
                  </div>
                )}
                
                {paymentMethod !== 'cash_on_delivery' && (
                  <Button 
                    type="submit" 
                    className="w-full mt-6"
                    disabled={isProcessingPayment}
                  >
                    {isProcessingPayment ? (
                      <span className="flex items-center">Processing Payment...</span>
                    ) : (
                      <span className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Pay Advance Amount (50%)
                      </span>
                    )}
                  </Button>
                )}
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Need help with payment? Contact our support team at <span className="font-medium">9337385677</span> 
                  or visit our <a href="/customer-support" className="text-primary hover:underline">customer support</a> page.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BulkOrderConfirmation;
