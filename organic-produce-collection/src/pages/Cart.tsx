
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CartItem from '@/components/CartItem';
import { ArrowLeft, ShoppingBag, Truck } from 'lucide-react';
import { toast } from 'sonner';

const Cart = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const handleProceedToCheckout = () => {
    if (items.length > 0) {
      navigate('/checkout');
    } else {
      toast.error("Your cart is empty", {
        description: "Please add items to your cart before checking out."
      });
    }
  };
  
  const estimatedTax = subtotal * 0.07;
  const shipping = subtotal > 500 ? 0 : 49; // Updated to ₹500 and ₹49
  const total = subtotal + estimatedTax + shipping;
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-1 pt-24 pb-16">
          <div className="page-container">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 opacity-0 animate-fade-up" style={{animationFillMode: 'forwards'}}>Your Cart</h1>
            
            <div className="flex flex-col items-center justify-center py-16 opacity-0 animate-fade-up" style={{animationDelay: '150ms', animationFillMode: 'forwards'}}>
              <div className="bg-gray-100 rounded-full p-6 mb-6">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-gray-800">Your cart is empty</h2>
              <p className="text-gray-600 text-center mb-8 max-w-md">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button 
                asChild
                className="px-8 rounded-full bg-harvest-500 hover:bg-harvest-600 button-hover"
              >
                <Link to="/shop">
                  Browse Products
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-16">
        <div className="page-container">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 opacity-0 animate-fade-up" style={{animationFillMode: 'forwards'}}>Your Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 opacity-0 animate-fade-up" style={{animationDelay: '100ms', animationFillMode: 'forwards'}}>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{items.length} {items.length === 1 ? 'Item' : 'Items'}</h2>
                  {items.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-500 hover:text-gray-700 text-sm"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  )}
                </div>
                <Separator className="mb-6" />
                
                {items.map((item, index) => (
                  <CartItem 
                    key={item.product.id} 
                    productId={item.product.id} 
                    quantity={item.quantity} 
                    product={item.product}
                    index={index + 1}
                  />
                ))}
                
                <div className="mt-6 pt-4">
                  <Link 
                    to="/shop" 
                    className="text-harvest-600 hover:text-harvest-700 inline-flex items-center text-sm font-medium"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="opacity-0 animate-fade-up" style={{animationDelay: '200ms', animationFillMode: 'forwards'}}>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <Separator className="mb-6" />
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Tax</span>
                    <span className="font-medium">₹{estimatedTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Shipping</span>
                    {shipping === 0 ? (
                      <span className="text-harvest-600 font-medium">Free</span>
                    ) : (
                      <span className="font-medium">₹{shipping.toFixed(2)}</span>
                    )}
                  </div>
                  
                  {shipping > 0 && (
                    <div className="bg-harvest-50 p-3 rounded-lg text-sm flex items-start space-x-2">
                      <Truck className="h-5 w-5 text-harvest-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">
                        Free shipping on orders over ₹500!
                      </p>
                    </div>
                  )}
                </div>
                
                <Separator className="mb-6" />
                
                <div className="flex justify-between mb-6">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-xl">₹{total.toFixed(2)}</span>
                </div>
                
                <Button 
                  className="w-full bg-harvest-500 hover:bg-harvest-600 button-hover"
                  size="lg"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </Button>
                
                <p className="text-center text-xs text-gray-500 mt-4">
                  By proceeding, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
