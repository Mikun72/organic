
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { toast } from 'sonner';

interface ProtectedAdminRouteProps {
  children: ReactNode;
}

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!authService.isAdminAuthenticated()) {
      toast.error('You must be logged in as an admin to access this page');
      navigate('/admin');
    }
  }, [navigate]);
  
  if (!authService.isAdminAuthenticated()) {
    return null;
  }
  
  return <>{children}</>;
};

export default ProtectedAdminRoute;
