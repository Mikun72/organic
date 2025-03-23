
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/data';
import { toast } from 'sonner';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize cart from localStorage if available
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [itemCount, setItemCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    
    // Update item count and subtotal whenever cart items change
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setItemCount(count);

    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setSubtotal(total);
  }, [items]);

  const addItem = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.product.id === product.id
      );

      if (existingItem) {
        // Item already exists, update quantity
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...prevItems, { product, quantity }];
      }
    });

    toast(`Added ${quantity} ${product.name} to cart`, {
      description: `₹${product.price.toFixed(2)} / ${product.unit}`,
      action: {
        label: "View Cart",
        onClick: () => {
          window.location.href = "/cart";
        }
      }
    });
  };

  const removeItem = (productId: string) => {
    setItems(prevItems =>
      prevItems.filter(item => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
