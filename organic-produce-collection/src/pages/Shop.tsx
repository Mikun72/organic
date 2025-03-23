import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { products, categories, getAllProducts, getProductsByCategory } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/data';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    organic: false,
    local: false,
    inSeason: false,
  });
  
  useEffect(() => {
    let initialProducts = categoryParam 
      ? getProductsByCategory(categoryParam) 
      : getAllProducts();
    
    setFilteredProducts(initialProducts);
    setSelectedCategory(categoryParam);
  }, [categoryParam]);
  
  useEffect(() => {
    let filtered = selectedCategory 
      ? getProductsByCategory(selectedCategory) 
      : getAllProducts();
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    if (activeFilters.organic) {
      filtered = filtered.filter(product => product.organic);
    }
    
    if (activeFilters.local) {
      filtered = filtered.filter(product => product.local);
    }
    
    if (activeFilters.inSeason) {
      filtered = filtered.filter(product => product.inSeason);
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, activeFilters]);
  
  const handleCategoryChange = (value: string) => {
    if (value === 'all') {
      setSelectedCategory(null);
      searchParams.delete('category');
    } else {
      setSelectedCategory(value);
      searchParams.set('category', value);
    }
    setSearchParams(searchParams);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  const toggleFilter = (filter: keyof typeof activeFilters) => {
    setActiveFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };
  
  const clearFilters = () => {
    setActiveFilters({
      organic: false,
      local: false,
      inSeason: false
    });
    setSearchQuery('');
  };
  
  const hasActiveFilters = Object.values(activeFilters).some(Boolean) || searchQuery !== '';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-24 mb-12">
        <div className="page-container">
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 opacity-0 animate-fade-down">
              {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name || 'Products' : 'All Products'}
            </h1>
            <p className="text-gray-600 max-w-2xl fade-up-1">
              Browse our selection of fresh, organic produce sourced directly from local farms.
            </p>
          </div>
          
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
              <Tabs 
                defaultValue={selectedCategory || 'all'} 
                className="w-full lg:w-auto fade-up-1" 
                onValueChange={handleCategoryChange}
              >
                <TabsList className="w-full lg:w-auto overflow-x-auto whitespace-nowrap">
                  <TabsTrigger value="all">All</TabsTrigger>
                  {categories.map(category => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              
              <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3 fade-up-2">
                <form onSubmit={handleSearch} className="relative w-full sm:w-auto flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-10 w-full sm:w-64 rounded-full border-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full border-gray-200 w-full sm:w-auto"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                  {hasActiveFilters && (
                    <Badge className="ml-2 bg-harvest-100 text-harvest-800 hover:bg-harvest-200 px-1.5">
                      {Object.values(activeFilters).filter(Boolean).length + (searchQuery ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
            
            {showFilters && (
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Filter Products</h3>
                  {hasActiveFilters && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={clearFilters}
                    >
                      Clear All <X className="ml-1 h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant={activeFilters.organic ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer rounded-full",
                      activeFilters.organic 
                        ? "bg-harvest-500 hover:bg-harvest-600" 
                        : "hover:bg-gray-100"
                    )}
                    onClick={() => toggleFilter('organic')}
                  >
                    Organic
                  </Badge>
                  <Badge 
                    variant={activeFilters.local ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer rounded-full",
                      activeFilters.local 
                        ? "bg-harvest-500 hover:bg-harvest-600" 
                        : "hover:bg-gray-100"
                    )}
                    onClick={() => toggleFilter('local')}
                  >
                    Local
                  </Badge>
                  <Badge 
                    variant={activeFilters.inSeason ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer rounded-full",
                      activeFilters.inSeason 
                        ? "bg-harvest-500 hover:bg-harvest-600" 
                        : "hover:bg-gray-100"
                    )}
                    onClick={() => toggleFilter('inSeason')}
                  >
                    In Season
                  </Badge>
                </div>
              </div>
            )}
            
            {hasActiveFilters && (
              <div className="flex items-center gap-2 mb-4 fade-up-2">
                <span className="text-sm text-gray-500">Active Filters:</span>
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700">
                      Search: {searchQuery}
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => setSearchQuery('')}
                      />
                    </Badge>
                  )}
                  {activeFilters.organic && (
                    <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700">
                      Organic
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => toggleFilter('organic')}
                      />
                    </Badge>
                  )}
                  {activeFilters.local && (
                    <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700">
                      Local
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => toggleFilter('local')}
                      />
                    </Badge>
                  )}
                  {activeFilters.inSeason && (
                    <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700">
                      In Season
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer" 
                        onClick={() => toggleFilter('inSeason')}
                      />
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            <Separator className="my-4" />
            
            <p className="text-sm text-gray-500 fade-up-2">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg fade-up-1">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or search terms.</p>
              <Button 
                variant="outline" 
                onClick={clearFilters} 
                className="rounded-full"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shop;
