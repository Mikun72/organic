
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import WelcomeOverlay from "./components/WelcomeOverlay";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard1 from "./pages/admin/Dashboard1";
import Dashboard2 from "./pages/admin/Dashboard2";
import Dashboard3 from "./pages/admin/Dashboard3";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OtpVerification from "./pages/OtpVerification";
import CustomerSupport from "./pages/CustomerSupport";
import BulkOrderRequest from "./pages/BulkOrderRequest";
import BulkOrderConfirmation from "./pages/BulkOrderConfirmation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <WelcomeOverlay />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
            <Route path="/customer-support" element={<CustomerSupport />} />
            <Route path="/bulk-order-request" element={<BulkOrderRequest />} />
            <Route path="/bulk-order-confirmation" element={<BulkOrderConfirmation />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard/1" element={<Dashboard1 />} />
            <Route path="/admin/dashboard/2" element={<Dashboard2 />} />
            <Route path="/admin/dashboard/3" element={<Dashboard3 />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
