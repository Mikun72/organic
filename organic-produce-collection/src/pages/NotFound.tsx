
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center bg-secondary/30 px-4">
        <div className="text-center max-w-md mx-auto py-16">
          <h1 className="text-6xl font-bold text-harvest-700 mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-3">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            We couldn't find the page you're looking for. The page might have been moved or doesn't exist.
          </p>
          <Button asChild className="px-6">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
