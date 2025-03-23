
import React from 'react';
import { Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ShoppingCart, Leaf } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const delay = index * 100;
  
  return (
    <div 
      className={cn(
        "bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 card-hover opacity-0",
        "group cursor-pointer border border-gray-100",
        index === 0 ? "animate-fade-up" : "animate-scale-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden aspect-square">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {product.organic && (
          <Badge 
            variant="secondary" 
            className="absolute top-3 left-3 bg-harvest-100 text-harvest-800 border border-harvest-200"
          >
            <Leaf className="w-3 h-3 mr-1" /> Organic
          </Badge>
        )}
        {product.local && (
          <Badge 
            variant="secondary" 
            className="absolute top-3 right-3 bg-soil-50 text-soil-800 border border-soil-100"
          >
            Local
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-900 group-hover:text-harvest-700 transition-colors">
            {product.name}
          </h3>
          <p className="font-bold text-harvest-700">
            ₹{product.price}
            <span className="text-xs text-gray-500 font-normal ml-1">/ {product.unit}</span>
          </p>
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">{product.description}</p>
        
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-harvest-500 hover:bg-harvest-600 text-white group-hover:shadow-md transition-all"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
