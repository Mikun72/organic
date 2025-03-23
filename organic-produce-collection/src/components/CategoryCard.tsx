
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
  const delay = index * 100 + 300; // stagger the animation
  
  return (
    <Link 
      to={`/shop?category=${category.id}`}
      className={cn(
        "group relative rounded-xl overflow-hidden aspect-[4/3] lg:aspect-[3/2] shadow-md transition-all duration-300",
        "hover:shadow-xl hover:-translate-y-1 opacity-0 animate-scale-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image Background */}
      <div className="absolute inset-0">
        <img 
          src={category.id === 'fruits' 
            ? 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
            : category.id === 'vegetables' 
            ? 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            : category.id === 'dairy' 
            ? 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            : 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
          } 
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-black/30 group-hover:from-black/70 transition-colors duration-300" />
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2 transition-all duration-300 transform group-hover:translate-x-2">
            {category.name}
          </h3>
          <p className="text-sm text-white/80 mb-4 transition-all duration-300 transform group-hover:translate-x-2">
            {category.description}
          </p>
          <div className="flex items-center text-white text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
            Shop Now <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
