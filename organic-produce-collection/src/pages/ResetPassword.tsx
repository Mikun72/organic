
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Key, ArrowRight } from 'lucide-react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the user came from the OTP verification
  useEffect(() => {
    const state = location.state as { email?: string, verified?: boolean } | undefined;
    
    if (!state || !state.verified) {
      // If not verified, redirect to forgot password
      toast.error('Please verify your email first');
      navigate('/forgot-password');
    }
  }, [location, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to reset password
    setTimeout(() => {
      toast.success('Password reset successfully');
      setIsSuccess(true);
      setIsLoading(false);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30 mt-16">
        <Card className="w-full max-w-md mx-auto scale-up-1">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                {isSuccess ? <Check className="h-6 w-6 text-green-600" /> : <Key className="h-6 w-6 text-green-600" />}
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              {isSuccess ? 'Password Reset Complete' : 'Create New Password'}
            </CardTitle>
            <CardDescription>
              {isSuccess 
                ? 'You can now use your new password to log in' 
                : 'Your new password must be different from previously used passwords'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white"
                  />
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-white"
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </form>
            ) : (
              <div className="text-center p-4">
                <div className="mb-4 bg-green-50 text-green-700 p-3 rounded-md">
                  Your password has been reset successfully!
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  You will be redirected to the login page shortly.
                </p>
                <Button onClick={() => navigate('/login')} className="w-full">
                  Go to Login
                </Button>
              </div>
            )}
          </CardContent>
          
          {!isSuccess && (
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                Remember your password?{' '}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  Back to login <ArrowRight className="inline h-3 w-3" />
                </Link>
              </p>
            </CardFooter>
          )}
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResetPassword;
