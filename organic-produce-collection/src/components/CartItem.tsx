
import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Product } from '@/lib/data';
import { cn } from '@/lib/utils';

interface CartItemProps {
  productId: string;
  quantity: number;
  product: Product;
  index?: number;
}

const CartItem: React.FC<CartItemProps> = ({ productId, quantity, product, index = 0 }) => {
  const { updateQuantity, removeItem } = useCart();

  const incrementQuantity = () => {
    updateQuantity(productId, quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      updateQuantity(productId, quantity - 1);
    } else {
      removeItem(productId);
    }
  };

  const handleRemove = () => {
    removeItem(productId);
  };

  return (
    <div 
      className={cn(
        "flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-gray-100",
        "opacity-0 animate-fade-up"
      )}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-center space-x-4 mb-4 sm:mb-0">
        <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-1">₹{product.price.toFixed(2)} / {product.unit}</p>
          <div className="flex items-center space-x-2 sm:hidden mt-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full" 
              onClick={decrementQuantity}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="font-medium text-sm w-6 text-center">{quantity}</span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full" 
              onClick={incrementQuantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-6 w-full sm:w-auto justify-between">
        <div className="hidden sm:flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full" 
            onClick={decrementQuantity}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="font-medium text-sm w-6 text-center">{quantity}</span>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full" 
            onClick={incrementQuantity}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-harvest-800">
            ₹{(product.price * quantity).toFixed(2)}
          </span>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-400 hover:text-red-500 transition-colors"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
