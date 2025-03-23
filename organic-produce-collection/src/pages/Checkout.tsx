import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { ArrowLeft, CreditCard, Banknote, Smartphone, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card',
    notes: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: '',
    googlePayNumber: '',
    googlePayUpi: '',
    phonePeNumber: '',
    phonePeUpi: ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.email || !formData.phone || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber || !formData.cardName || !formData.cardExpiry || !formData.cardCvv) {
        toast.error('Please fill in all card details');
        return;
      }
    } else if (formData.paymentMethod === 'gpay') {
      if (!formData.googlePayNumber || !formData.googlePayUpi) {
        toast.error('Please fill in all Google Pay details');
        return;
      }
    } else if (formData.paymentMethod === 'phonepe') {
      if (!formData.phonePeNumber || !formData.phonePeUpi) {
        toast.error('Please fill in all PhonePe details');
        return;
      }
    } else if (formData.paymentMethod === 'upi') {
      if (!formData.upiId) {
        toast.error('Please enter your UPI ID');
        return;
      }
    }
    
    setIsProcessing(true);
    
    setTimeout(() => {
      const orderData = {
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}`,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}`,
        paymentMethod: formData.paymentMethod,
        items: items.map(item => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        })),
        total: subtotal,
        notes: formData.notes
      };
      
      const orderNumber = `FHH-${Math.floor(100000 + Math.random() * 900000)}`;
      
      clearCart();
      
      navigate('/order-confirmation', { 
        state: { 
          fromCheckout: true, 
          orderNumber,
          orderData
        } 
      });
      
      setIsProcessing(false);
    }, 1500);
  };

  const renderCardForm = () => (
    <Card className="mt-4 border border-gray-200">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number *</Label>
            <div className="relative">
              <Input 
                id="cardNumber" 
                name="cardNumber" 
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleChange}
                className="pl-10"
              />
              <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardName">Name on Card *</Label>
            <Input 
              id="cardName" 
              name="cardName" 
              placeholder="John Doe"
              value={formData.cardName}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardExpiry">Expiry Date *</Label>
              <Input 
                id="cardExpiry" 
                name="cardExpiry" 
                placeholder="MM/YY"
                value={formData.cardExpiry}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardCvv">CVV *</Label>
              <div className="relative">
                <Input 
                  id="cardCvv" 
                  name="cardCvv" 
                  type="password"
                  placeholder="123"
                  maxLength={3}
                  value={formData.cardCvv}
                  onChange={handleChange}
                  className="pl-10"
                />
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="rounded-md bg-blue-50 p-3 flex items-start space-x-2">
            <Lock className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm text-blue-700 font-medium">Secure Transaction</p>
              <p className="text-xs text-blue-600">Your payment information is encrypted and secure.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  const renderUpiForm = () => (
    <Card className="mt-4 border border-gray-200">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="upiId">UPI ID *</Label>
            <Input 
              id="upiId" 
              name="upiId" 
              placeholder="yourname@upi"
              value={formData.upiId}
              onChange={handleChange}
            />
          </div>
          <p className="text-sm text-gray-500">You will receive a payment request on your UPI app.</p>
        </div>
      </CardContent>
    </Card>
  );
  
  const renderGooglePayForm = () => (
    <Card className="mt-4 border border-gray-200">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="googlePayNumber">Mobile Number *</Label>
            <Input 
              id="googlePayNumber" 
              name="googlePayNumber" 
              placeholder="10-digit mobile number"
              value={formData.googlePayNumber}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="googlePayUpi">Google Pay UPI ID *</Label>
            <Input 
              id="googlePayUpi" 
              name="googlePayUpi" 
              placeholder="yourname@googlepay"
              value={formData.googlePayUpi}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex justify-center">
            <img 
              src="/https://ik.imagekit.io/Subhransu/gpay%20logo.png?updatedAt=1742745775780" 
              alt="Google Pay" 
              className="h-12 w-auto"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  const renderPhonePeForm = () => (
    <Card className="mt-4 border border-gray-200">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phonePeNumber">Mobile Number *</Label>
            <Input 
              id="phonePeNumber" 
              name="phonePeNumber" 
              placeholder="10-digit mobile number"
              value={formData.phonePeNumber}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phonePeUpi">PhonePe UPI ID *</Label>
            <Input 
              id="phonePeUpi" 
              name="phonePeUpi" 
              placeholder="yourname@phonepe"
              value={formData.phonePeUpi}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex justify-center">
            <img 
              src="https://ik.imagekit.io/Subhransu/phone%20pay%20logo.png?updatedAt=1742745775699" 
              alt="Phone Pe" 
              className="h-12 w-auto"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              className="mb-6" 
              onClick={() => navigate('/cart')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
            </Button>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h1 className="text-2xl font-bold mb-6">Checkout</h1>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-medium mb-4">Contact Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input 
                              id="firstName" 
                              name="firstName" 
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                              id="lastName" 
                              name="lastName" 
                              value={formData.lastName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input 
                              id="email" 
                              name="email" 
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone *</Label>
                            <Input 
                              id="phone" 
                              name="phone" 
                              value={formData.phone}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h2 className="text-lg font-medium mb-4">Delivery Address</h2>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="address">Street Address *</Label>
                            <Input 
                              id="address" 
                              name="address" 
                              value={formData.address}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="city">City *</Label>
                              <Input 
                                id="city" 
                                name="city" 
                                value={formData.city}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="state">State *</Label>
                              <Input 
                                id="state" 
                                name="state" 
                                value={formData.state}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="pincode">PIN Code *</Label>
                            <Input 
                              id="pincode" 
                              name="pincode" 
                              value={formData.pincode}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h2 className="text-lg font-medium mb-4">Payment Method</h2>
                        <RadioGroup 
                          value={formData.paymentMethod} 
                          onValueChange={handleRadioChange}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                        >
                          <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 transition-colors">
                            <RadioGroupItem value="card" id="payment-card" />
                            <Label htmlFor="payment-card" className="flex items-center cursor-pointer w-full">
                              <CreditCard className="mr-2 h-4 w-4 text-blue-500" />
                              <span>Credit/Debit Card</span>
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 transition-colors">
                            <RadioGroupItem value="cash" id="payment-cash" />
                            <Label htmlFor="payment-cash" className="flex items-center cursor-pointer w-full">
                              <Banknote className="mr-2 h-4 w-4 text-green-500" />
                              <span>Cash on Delivery</span>
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 transition-colors">
                            <RadioGroupItem value="upi" id="payment-upi" />
                            <Label htmlFor="payment-upi" className="flex items-center cursor-pointer w-full">
                              <Smartphone className="mr-2 h-4 w-4 text-purple-500" />
                              <span>UPI</span>
                            </Label>
                          </div>
                          
                          <div className="sm:col-span-2 border p-3 rounded-md hover:bg-gray-50 transition-colors">
                            <p className="text-sm font-medium mb-2 text-gray-500">Popular Payment Apps</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="gpay" id="payment-gpay" />
                                <Label htmlFor="payment-gpay" className="flex items-center cursor-pointer w-full">
                                  <img src="https://ik.imagekit.io/Subhransu/gpay%20logo.png?updatedAt=1742745775780" alt="Google Pay" className="w-5 h-5 mr-2" />
                                  <span>Google Pay</span>
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="phonepe" id="payment-phonepe" />
                                <Label htmlFor="payment-phonepe" className="flex items-center cursor-pointer w-full">
                                  <img src="https://ik.imagekit.io/Subhransu/phone%20pay%20logo.png?updatedAt=1742745775699" alt="Phone Pe" className="w-5 h-5 mr-2" />
                                  <span>PhonePe</span>
                                </Label>
                              </div>
                            </div>
                          </div>
                        </RadioGroup>
                        
                        {formData.paymentMethod === 'card' && renderCardForm()}
                        {formData.paymentMethod === 'upi' && renderUpiForm()}
                        {formData.paymentMethod === 'gpay' && renderGooglePayForm()}
                        {formData.paymentMethod === 'phonepe' && renderPhonePeForm()}
                      </div>
                      
                      <div>
                        <h2 className="text-lg font-medium mb-4">Additional Notes</h2>
                        <Textarea 
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder="Special instructions for delivery"
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full mt-8 bg-harvest-500 hover:bg-harvest-600"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Complete Order'}
                    </Button>
                  </form>
                </div>
              </div>
              
              <div className="md:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="max-h-[300px] overflow-y-auto pr-2">
                      {items.map(item => (
                        <div key={item.product.id} className="flex justify-between py-2 border-b">
                          <div>
                            <span className="font-medium">{item.product.name}</span>
                            <span className="text-sm text-gray-500 block">Qty: {item.quantity}</span>
                          </div>
                          <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4">
                      <div className="flex justify-between py-2">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span>Taxes</span>
                        <span>₹{(subtotal * 0.18).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2 font-bold">
                        <span>Total</span>
                        <span>₹{(subtotal * 1.18).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
