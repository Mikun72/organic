import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Leaf, Star, Truck, ArrowRight } from 'lucide-react';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import FeedbackForm from '@/components/FeedbackForm';
import { getFeaturedProducts, categories } from '@/lib/data';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Categories Section */}
      <section className="section bg-white">
        <div className="page-container">
          <h2 className="section-title text-center">Our Categories</h2>
          <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto fade-up-1">
            Browse our wide selection of fresh produce, carefully selected from trusted local Indian farms and growers.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="section bg-harvest-50">
        <div className="page-container">
          <h2 className="section-title text-center">Featured Products</h2>
          <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto fade-up-1">
            Check out our handpicked seasonal favorites, packed with freshness and flavor.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          
          <div className="mt-12 text-center opacity-0 animate-fade-up" style={{ animationDelay: "600ms" }}>
            <Button 
              asChild
              className="bg-harvest-500 hover:bg-harvest-600 rounded-full px-8 button-hover"
            >
              <Link to="/shop">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="section bg-white">
        <div className="page-container">
          <h2 className="section-title text-center">Why Choose Harvest Hub</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto fade-up-1">
            We're committed to providing the best farm-to-table experience with every order.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-0">
            {/* Card 1 */}
            <div className={cn(
              "bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all duration-300",
              "hover:shadow-md hover:-translate-y-1 text-center opacity-0 animate-fade-up"
            )} style={{ animationDelay: "200ms" }}>
              <div className="w-14 h-14 bg-harvest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-7 w-7 text-harvest-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Always Organic</h3>
              <p className="text-gray-600">
                Our products is grown using organic methods, free from harmful pesticides and chemicals.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className={cn(
              "bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all duration-300",
              "hover:shadow-md hover:-translate-y-1 text-center opacity-0 animate-fade-up"
            )} style={{ animationDelay: "300ms" }}>
              <div className="w-14 h-14 bg-harvest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-7 w-7 text-harvest-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Premium Quality</h3>
              <p className="text-gray-600">
                We select only the freshest and highest quality products for our customers.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className={cn(
              "bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all duration-300",
              "hover:shadow-md hover:-translate-y-1 text-center opacity-0 animate-fade-up"
            )} style={{ animationDelay: "400ms" }}>
              <div className="w-14 h-14 bg-harvest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-7 w-7 text-harvest-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Fast Delivery</h3>
              <p className="text-gray-600">
                From harvest to your doorstep in record time to ensure maximum freshness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Farmer's field" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative page-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 opacity-0 animate-fade-up">
            Ready to Experience Fresh?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "200ms" }}>
            Start your journey to healthier eating with farm-fresh products delivered to your door.
          </p>
          <Button 
            asChild
            size="lg" 
            className="bg-harvest-500 hover:bg-harvest-600 rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 animate-fade-up button-hover"
            style={{ animationDelay: "400ms" }}
          >
            <Link to="/shop">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Feedback Section */}
      <section className="section bg-harvest-50">
        <div className="page-container">
          <h2 className="section-title text-center">Share Your Thoughts</h2>
          <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto fade-up-1">
            We're constantly improving to serve you better. Your feedback helps us grow!
          </p>
          
          <div className="max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <FeedbackForm />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
