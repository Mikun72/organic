
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ShieldAlert, Lock, User, Home, Info } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Admin credentials
const ADMIN_CREDENTIALS = [
  { id: 1, username: 'admin1', password: 'admin123', name: 'Swastik Kumar Das' },
  { id: 2, username: 'admin2', password: 'admin123', name: 'Soumyashree Nayak' },
  { id: 3, username: 'admin3', password: 'admin123', name: 'Subhransu Mohapatra' }
];

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    
    // Find admin with matching credentials
    const admin = ADMIN_CREDENTIALS.find(
      admin => admin.username === username && admin.password === password
    );
    
    // Simulate API delay
    setTimeout(() => {
      if (admin) {
        // Store admin info in localStorage
        localStorage.setItem('isAdminAuthenticated', 'true');
        localStorage.setItem('adminUser', JSON.stringify({
          id: admin.id,
          name: admin.name,
          username: admin.username,
          role: 'admin'
        }));
        
        toast.success('Admin login successful');
        navigate(`/admin/dashboard/${admin.id}`);
      } else {
        toast.error('Invalid admin credentials');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <ShieldAlert className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <User size={16} /> Username
                </Label>
                <Input 
                  id="username" 
                  type="text" 
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock size={16} /> Password
                </Label>
                <Input 
                  id="password" 
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                  className="bg-white"
                />
              </div>
              
              <div className="flex justify-between pt-2">
                <Link to="/">
                  <Button variant="outline" type="button" size="sm" className="flex items-center gap-1">
                    <Home size={16} /> Back to Home
                  </Button>
                </Link>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col items-start gap-2 border-t pt-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-sm text-muted-foreground hover:text-primary cursor-help transition-colors">
                    <Info size={14} className="mr-1" />
                    <span>Admin login credentials hint</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-sm">
                  <ul className="space-y-2 text-xs">
                    {ADMIN_CREDENTIALS.map((admin, index) => (
                      <li key={index} className="flex flex-col">
                        <span className="font-semibold">{admin.name}:</span>
                        <span>Username: {admin.username}</span>
                        <span>Password: {admin.password}</span>
                      </li>
                    ))}
                  </ul>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="w-full text-center text-sm text-muted-foreground mt-2">
              Protected area. Authorized personnel only.
            </div>
          </CardFooter>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminLogin;
