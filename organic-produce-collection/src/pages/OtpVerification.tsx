
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Timer, Mail, ArrowLeft } from 'lucide-react';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  useEffect(() => {
    if (!email) {
      navigate('/login');
      toast.error('Please enter your email first');
    }
  }, [email, navigate]);

  useEffect(() => {
    let interval: number | undefined;
    
    if (timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp) {
      toast.error('Please enter the OTP');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // This would be replaced with an actual API call to verify the OTP
      setTimeout(() => {
        toast.success('OTP verified successfully');
        navigate('/');
      }, 1500);
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    
    setCanResend(false);
    setTimer(30);
    toast.success(`OTP sent to ${email}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30 mt-16">
        <Card className="w-full max-w-md mx-auto scale-up-1">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">OTP Verification</CardTitle>
            <CardDescription>
              Enter the verification code sent to your email
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="mb-4 flex items-center justify-center text-sm">
              <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">{email}</span>
            </div>
            
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp" className="sr-only">OTP</Label>
                <Input 
                  id="otp" 
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="text-center text-xl tracking-widest bg-white"
                  required
                />
              </div>
              
              <div className="flex items-center justify-center space-x-2 text-sm">
                <Timer className="w-4 h-4 text-muted-foreground" />
                <span className={timer > 0 ? "text-muted-foreground" : "text-primary"}>
                  {timer > 0 
                    ? `Resend available in ${timer} seconds` 
                    : "You can resend OTP now"}
                </span>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Button>
              
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full text-primary" 
                onClick={handleResendOtp}
                disabled={!canResend}
              >
                Resend OTP
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-muted-foreground"
              onClick={() => navigate('/login')}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Button>
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default OtpVerification;
