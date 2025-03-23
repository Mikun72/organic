
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Menu, X, LogIn, LogOut, UserPlus, ShieldAlert, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/authService';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';
  const isAuthPage = isLoginPage || isSignupPage;
  
  // Check authentication status and get current user
  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
    setCurrentUser(authService.getCurrentUser());
  }, [location]);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Customer Support', path: '/customer-support', icon: <HeadphonesIcon size={16} className="mr-1" /> }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!currentUser || !currentUser.name) return 'U';
    
    const nameParts = currentUser.name.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isHomePage
          ? isScrolled 
            ? 'bg-white/60 backdrop-blur-md shadow-sm py-3' 
            : 'bg-transparent py-5'
          : isAuthPage
            ? isScrolled
              ? 'bg-lime-500/30 backdrop-blur-md shadow-sm py-3'
              : 'bg-lime-500/20 py-5'
            : isScrolled
              ? 'bg-lime-500/60 backdrop-blur-md shadow-sm py-3'
              : 'bg-lime-500/50 py-5'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="w-10 h-10 bg-harvest-500 rounded-full flex items-center justify-center overflow-hidden">
              <img src="https://ik.imagekit.io/Subhransu/logo-cropped.png?updatedAt=1742743038655" alt="Fresh Harvest Hub" className="w-8 h-8 object-contain" />
            </div>
            <span className={cn(
              "text-lg font-bold transition-colors",
              isHomePage
                ? isScrolled ? "text-harvest-800" : "text-white"
                : "text-gray-900" // Changed to black text for non-home pages
            )}>Fresh Harvest Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors duration-200 flex items-center',
                  isActive(link.path)
                    ? isHomePage
                      ? isScrolled ? 'text-harvest-700 font-semibold' : 'text-white font-semibold'
                      : 'text-gray-900 font-semibold' // Changed to black text for non-home pages
                    : isHomePage
                      ? isScrolled ? 'text-gray-600 hover:text-harvest-600' : 'text-white/90 hover:text-white'
                      : 'text-gray-900 hover:text-harvest-600' // Changed to black text for non-home pages
                )}
              >
                {link.icon}{link.name}
              </Link>
            ))}
            
            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4 ml-4">
                <Avatar className="h-8 w-8 border-2 border-harvest-200 transition-transform hover:scale-110">
                  <AvatarImage 
                    src={currentUser?.photoURL || ''} 
                    alt={currentUser?.name || 'User'} 
                  />
                  <AvatarFallback 
                    className="bg-harvest-100 text-harvest-700 font-medium"
                  >
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'transition-all duration-300',
                    isHomePage
                      ? isScrolled 
                        ? 'bg-white/70 text-harvest-700 border-gray-200' 
                        : 'bg-white/20 text-white border-white/30'
                      : 'bg-white/70 text-gray-900 border-gray-200' // Changed for non-home pages
                  )}
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      'ml-4 transition-all duration-300',
                      isHomePage
                        ? isScrolled 
                          ? 'bg-white/70 text-harvest-700 border-gray-200' 
                          : 'bg-white/20 text-white border-white/30'
                        : 'bg-white/70 text-gray-900 border-gray-200' // Changed for non-home pages
                    )}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="ml-2"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign up
                  </Button>
                </Link>
              </>
            )}
            
            {/* Admin Login Button */}
            <Link to="/admin">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  'ml-2 transition-all duration-300',
                  isHomePage
                    ? isScrolled 
                      ? 'bg-white/70 text-gray-700 border-gray-200' 
                      : 'bg-white/20 text-white border-white/30'
                    : 'bg-white/70 text-gray-900 border-gray-200' // Changed for non-home pages
                )}
              >
                <ShieldAlert className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
            
            <Link to="/cart" className="relative ml-2">
              <Button
                size="icon"
                variant="outline"
                className={cn(
                  'rounded-full transition-all duration-300',
                  isHomePage
                    ? isScrolled 
                      ? 'bg-white/70 text-harvest-700 border-gray-200' 
                      : 'bg-white/20 text-white border-white/30'
                    : 'bg-white/70 text-gray-900 border-gray-200' // Changed for non-home pages
                )}
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-harvest-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-scale-up">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Auth Buttons for Mobile */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 border-2 border-harvest-200">
                  <AvatarImage 
                    src={currentUser?.photoURL || ''} 
                    alt={currentUser?.name || 'User'} 
                  />
                  <AvatarFallback 
                    className="bg-harvest-100 text-harvest-700 font-medium"
                  >
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'transition-all duration-300',
                    isHomePage
                      ? isScrolled 
                        ? 'bg-white/70 text-harvest-700 border-gray-200' 
                        : 'bg-white/20 text-white border-white/30'
                      : 'bg-white/70 text-gray-900 border-gray-200' // Changed for non-home pages
                  )}
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'transition-all duration-300',
                    isHomePage
                      ? isScrolled 
                        ? 'bg-white/70 text-harvest-700 border-gray-200' 
                        : 'bg-white/20 text-white border-white/30'
                      : 'bg-white/70 text-gray-900 border-gray-200' // Changed for non-home pages
                  )}
                >
                  <LogIn className="h-4 w-4" />
                </Button>
              </Link>
            )}
          
            <Link to="/cart" className="relative">
              <Button
                size="icon"
                variant="outline"
                className={cn(
                  'rounded-full transition-all duration-300',
                  isHomePage
                    ? isScrolled 
                      ? 'bg-white/70 text-harvest-700 border-gray-200' 
                      : 'bg-white/20 text-white border-white/30'
                    : 'bg-white/70 text-gray-900 border-gray-200' // Changed for non-home pages
                )}
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-harvest-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-scale-up">
                  {itemCount}
                </span>
              )}
            </Link>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "transition-colors",
                isHomePage 
                  ? isScrolled ? "text-gray-700" : "text-white" 
                  : "text-gray-900" // Changed to black for non-home pages
              )}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-md shadow-md animate-fade-down">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'block py-2 text-base font-medium transition-colors flex items-center',
                    isActive(link.path)
                      ? 'text-harvest-700 font-semibold'
                      : 'text-gray-600 hover:text-harvest-600'
                  )}
                >
                  {link.icon}{link.name}
                </Link>
              ))}
              
              {/* Admin Link for Mobile Menu */}
              <Link
                to="/admin"
                className="block py-2 text-base font-medium transition-colors text-gray-600 hover:text-harvest-600"
              >
                <div className="flex items-center">
                  <ShieldAlert className="h-4 w-4 mr-2" />
                  Admin Login
                </div>
              </Link>
              
              {/* Auth Buttons for Mobile Menu */}
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  className="w-full mt-2 justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <>
                  <Link to="/login" className="block w-full">
                    <Button
                      variant="outline"
                      className="w-full mt-2 justify-start"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" className="block w-full">
                    <Button
                      className="w-full mt-2 justify-start"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
