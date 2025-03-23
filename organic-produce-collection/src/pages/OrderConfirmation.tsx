
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, Clock, Truck, ShoppingBag, Download, Phone, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [showRating, setShowRating] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  
  useEffect(() => {
    if (!location.state?.orderNumber) {
      const randomNumber = Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(`HH-${randomNumber}`);
    } else {
      setOrderNumber(location.state.orderNumber);
    }
    
    if (!location.state?.fromCheckout) {
      navigate('/shop');
    }
    
    // Show rating popup after 3 seconds
    const timer = setTimeout(() => {
      setShowRating(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [location.state, navigate]);

  const handleRating = (value: number) => {
    setRating(value);
    setShowRating(false);
    toast.success('Thank you for your feedback!');
  };

  const generateInvoicePDF = () => {
    const orderData = location.state?.orderData || {};
    const items = orderData.items || [];
    const currentDate = new Date().toLocaleDateString('en-IN');
    const customerName = orderData.customerName || 'Valued Customer';
    const address = orderData.address || 'Address not provided';
    const shippingAddress = orderData.shippingAddress || address;
    const email = orderData.email || 'Email not provided';
    const phone = orderData.phone || 'Phone not provided';
    
    // Calculate subtotal, tax, and total
    const subtotal = items.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
    const gst = subtotal * 0.18; // 18% GST
    const total = subtotal + gst;
    
    // Create a more structured HTML invoice with tabular format
    const invoiceHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice ${orderNumber}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
          }
          .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            border: 1px solid #eee;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            position: relative;
          }
          .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-30deg);
            opacity: 0.1;
            font-size: 80px;
            color: #78A55A;
            z-index: -1;
            text-align: center;
            width: 100%;
          }
          .invoice-header {
            border-bottom: 1px solid #eee;
            padding-bottom: 20px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
          }
          .invoice-title {
            font-size: 24px;
            font-weight: bold;
            color: #78A55A;
          }
          .invoice-details {
            margin-bottom: 20px;
          }
          .customer-details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }
          .billing-info, .shipping-info {
            flex: 1;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #eee;
            padding: 12px;
            text-align: left;
          }
          th {
            background-color: #f8f8f8;
            font-weight: bold;
          }
          .text-right {
            text-align: right;
          }
          .total-row {
            font-weight: bold;
            background-color: #f8f8f8;
          }
          .invoice-footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="watermark">Fresh Harvest Hub</div>
          <div class="invoice-header">
            <div>
              <div class="invoice-title">Fresh Harvest Hub</div>
              <div>N1/154, Near Baramunda Fire Station</div>
              <div>Baramunda, Bhubaneswar, Odisha 751003</div>
              <div>Phone: +91 9337385677</div>
              <div>Email: contact@freshharvestHub.com</div>
            </div>
            <div>
              <div class="invoice-title">TAX INVOICE</div>
              <div>Invoice Number: ${orderNumber}</div>
              <div>Date: ${currentDate}</div>
            </div>
          </div>
          
          <div class="customer-details">
            <div class="billing-info">
              <h3>Bill To:</h3>
              <div>${customerName}</div>
              <div>${address}</div>
              <div>Phone: ${phone}</div>
              <div>Email: ${email}</div>
            </div>
            
            <div class="shipping-info">
              <h3>Ship To:</h3>
              <div>${customerName}</div>
              <div>${shippingAddress}</div>
              <div>Phone: ${phone}</div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Unit Price (₹)</th>
                <th>Quantity</th>
                <th>Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${items.map((item: any) => `
                <tr>
                  <td>${item.name}</td>
                  <td>₹${item.price.toFixed(2)}</td>
                  <td>${item.quantity}</td>
                  <td class="text-right">₹${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right">Subtotal:</td>
                <td class="text-right">₹${subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="3" class="text-right">GST (18%):</td>
                <td class="text-right">₹${gst.toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                <td colspan="3" class="text-right">Total:</td>
                <td class="text-right">₹${total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          
          <div class="invoice-footer">
            <p>Thank you for shopping with Fresh Harvest Hub!</p>
            <p>Visit us at: N1/154, Near Baramunda Fire Station, Baramunda, Bhubaneswar, Odisha 751003</p>
            <p>Contact: +91 9337385677 | Email: contact@freshharvestHub.com</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Create a Blob with the HTML content
    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    
    // Create a link and click it to download
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${orderNumber}.html`;
    a.click();
    
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 mt-8 text-center">
            <div className="w-20 h-20 bg-harvest-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-up">
              <Check className="h-10 w-10 text-harvest-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-up">Order Confirmed!</h1>
            <p className="text-lg text-gray-600 mb-8 animate-fade-up" style={{animationDelay: '100ms'}}>
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 mb-8 animate-fade-up" style={{animationDelay: '200ms'}}>
              <p className="text-sm text-gray-500 mb-2">Order Number</p>
              <p className="text-xl font-bold text-harvest-700">{orderNumber}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className={cn(
                "p-4 border border-gray-100 rounded-lg animate-fade-up",
                "hover:border-harvest-200 transition-all"
              )} style={{animationDelay: '300ms'}}>
                <Clock className="h-6 w-6 text-harvest-600 mx-auto mb-2" />
                <h3 className="font-medium">Order Processing</h3>
                <p className="text-sm text-gray-500">5-15 minutes</p>
              </div>
              
              <div className={cn(
                "p-4 border border-gray-100 rounded-lg animate-fade-up",
                "hover:border-harvest-200 transition-all"
              )} style={{animationDelay: '400ms'}}>
                <Truck className="h-6 w-6 text-harvest-600 mx-auto mb-2" />
                <h3 className="font-medium">Estimated Delivery</h3>
                <p className="text-sm text-gray-500">30-60 minutes</p>
              </div>
              
              <div className={cn(
                "p-4 border border-gray-100 rounded-lg animate-fade-up",
                "hover:border-harvest-200 transition-all"
              )} style={{animationDelay: '500ms'}}>
                <ShoppingBag className="h-6 w-6 text-harvest-600 mx-auto mb-2" />
                <h3 className="font-medium">Order Details</h3>
                <p className="text-sm text-gray-500">Sent to your email</p>
              </div>
            </div>
            
            {/* Contact information for delivery tracking */}
            <div className="bg-harvest-50 rounded-lg p-4 mb-8 animate-fade-up" style={{animationDelay: '600ms'}}>
              <h3 className="font-medium text-harvest-700 flex items-center justify-center mb-2">
                <Phone className="h-4 w-4 mr-2" /> Track Your Delivery
              </h3>
              <p className="text-sm text-gray-600 mb-2">Contact your delivery agent to check status:</p>
              <p className="font-medium text-harvest-700">+91 8794561230</p>
              <p className="text-xs text-gray-500 mt-1">Available during delivery hours</p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up" style={{animationDelay: '700ms'}}>
              <Button 
                variant="outline"
                className="border-harvest-200 text-harvest-700 hover:bg-harvest-50"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </Button>
              
              <Button 
                className="bg-harvest-500 hover:bg-harvest-600"
                onClick={generateInvoicePDF}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Rating popup */}
      {showRating && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm text-center">
            <h3 className="text-xl font-bold mb-4">How was your experience?</h3>
            <p className="text-gray-600 mb-6">Please rate your shopping experience with us</p>
            
            <div className="flex justify-center space-x-2 mb-6">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleRating(value)}
                  className={`p-1 rounded-full transition-all ${
                    value <= rating ? 'text-yellow-500 scale-110' : 'text-gray-300 hover:text-yellow-400'
                  }`}
                  onMouseEnter={() => setRating(value)}
                >
                  <Star className="h-8 w-8 fill-current" />
                </button>
              ))}
            </div>
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowRating(false)}
              >
                Skip
              </Button>
              <Button 
                onClick={() => handleRating(rating)} 
                disabled={rating === 0}
                className="bg-harvest-500 hover:bg-harvest-600"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
