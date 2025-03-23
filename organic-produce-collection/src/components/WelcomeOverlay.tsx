
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const WelcomeOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    // Show the overlay every time the user visits
    setIsOpen(true);
    setIsAnimating(true);
  }, []);
  
  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className={`fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white rounded-xl p-6 max-w-md relative transition-all duration-300 ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2" 
          onClick={handleClose}
        >
          <X size={18} />
        </Button>
        
        <div className="text-center mb-6">
          <img src="https://ik.imagekit.io/Subhransu/logo-cropped.png?updatedAt=1742743038655" alt="Fresh Harvest Hub" className="w-24 h-24 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-harvest-700">Welcome to Fresh Harvest Hub!</h2>
        </div>
        
        <p className="mb-4 text-gray-700">
          Thank you for visiting our website. We're dedicated to bringing the freshest farm produce directly to your doorstep in just 30-60 minutes!
        </p>
        
        <div className="bg-orange-50 border border-orange-200 rounded-md p-3 mb-4">
          <p className="text-sm text-orange-800 font-medium">DISCLAIMER</p>
          <p className="text-sm text-orange-700">
            This is a project-based website and is not used for actual business purposes. All products, prices, and delivery options are for demonstration only.
          </p>
        </div>
        
        <Button 
          onClick={handleClose} 
          className="w-full bg-harvest-500 hover:bg-harvest-600"
        >
          Start Exploring
        </Button>
      </div>
    </div>
  );
};

export default WelcomeOverlay;
