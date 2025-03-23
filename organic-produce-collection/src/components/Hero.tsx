
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Only fruit and vegetable images, no flowers
const heroImages = [
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
];

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Preload images for smoother transitions
  useEffect(() => {
    const preloadImages = () => {
      heroImages.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          if (src === heroImages[0]) {
            setIsLoading(false);
          }
        };
      });
    };
    
    preloadImages();
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % heroImages.length);
    }, 5000); // Slower transitions (5 seconds) for smoother experience
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-harvest-500"></div>
        </div>
      )}
      
      {/* Background Images */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out bg-center bg-cover",
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="page-container text-left max-w-3xl mx-auto md:mx-10 lg:mx-20">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 opacity-0 animate-fade-up" style={{ animationDuration: "500ms" }}>
              From Farm to Table, Fresh Every Day
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "150ms", animationDuration: "500ms" }}>
              Discover organic, locally-sourced produce from Indian farms delivered directly to your doorstep in 30-60 minutes.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 opacity-0 animate-fade-up" style={{ animationDelay: "300ms", animationDuration: "500ms" }}>
              <Button 
                asChild
                size="lg" 
                className="bg-harvest-500 hover:bg-harvest-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-medium rounded-full px-8 button-hover"
              >
                <Link to="/shop">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="bg-transparent text-white border-white hover:bg-white/10 hover:border-white hover:text-white rounded-full px-8 button-hover"
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom curve overlay */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L80,85.3C160,75,320,53,480,53.3C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
