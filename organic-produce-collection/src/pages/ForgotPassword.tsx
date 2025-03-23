
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, ArrowRight, KeyRound } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to send OTP
    setTimeout(() => {
      // This is where you would actually send an OTP in a real application
      toast.success('OTP sent to your email');
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp) {
      toast.error('Please enter the OTP');
      return;
    }
    
    if (otp.length !== 6) {
      toast.error('OTP must be 6 digits');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      // In a real app, you would verify the OTP against what was sent
      if (otp === '123456') { // Hardcoded for demo
        toast.success('OTP verified successfully');
        setIsOtpVerified(true);
        navigate('/reset-password', { state: { email, verified: true } });
      } else {
        toast.error('Invalid OTP. Try again or request a new one.');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30 mt-16">
        <Card className="w-full max-w-md mx-auto scale-up-1">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                {isSubmitted ? <KeyRound className="h-6 w-6 text-orange-600" /> : <Mail className="h-6 w-6 text-orange-600" />}
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              {isSubmitted ? 'Verify OTP' : 'Forgot Password'}
            </CardTitle>
            <CardDescription>
              {isSubmitted 
                ? 'Enter the 6-digit code sent to your email' 
                : "Enter your email and we'll send you a reset link"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="hello@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white"
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Reset OTP'}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">6-Digit OTP</Label>
                  <Input 
                    id="otp" 
                    type="text" 
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                    required
                    maxLength={6}
                    className="bg-white text-center tracking-widest text-xl"
                  />
                  <p className="text-xs text-muted-foreground">
                    For demonstration, use OTP: 123456
                  </p>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </Button>
                
                <div className="text-center">
                  <Button 
                    variant="link" 
                    className="text-sm"
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setOtp('');
                    }}
                  >
                    Try a different email
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Remember your password?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Back to login <ArrowRight className="inline h-3 w-3" />
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;
