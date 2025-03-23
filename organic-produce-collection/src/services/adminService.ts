
// This service would typically connect to a MySQL database
// This is a mock implementation that uses localStorage instead

import { Product } from '@/lib/data';

// Types for customer data
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  dateJoined: string;
  photoURL?: string;
  ordersCount: number;
  totalSpent: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  shippingAddress: string;
  paymentMethod: string;
  notes?: string;
}

export interface Feedback {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  rating: number;
  message: string;
  orderIds?: string[];
  status: 'new' | 'reviewed' | 'responded';
}

// Helper for formatting rupee amounts
export const formatRupee = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// USD to INR conversion (using a fixed rate for demonstration)
const USD_TO_INR = 82.5;

// Mock data initialization
const initMockData = () => {
  // Check if we already have data
  if (!localStorage.getItem('mock_customers')) {
    // Generate 20 customers
    const customers: Customer[] = Array.from({ length: 20 }, (_, i) => ({
      id: `CUST-${1000 + i}`,
      name: `Customer ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      phone: `+91 ${Math.floor(Math.random() * 900) + 100}${Math.floor(Math.random() * 900) + 100}${Math.floor(Math.random() * 9000) + 1000}`,
      address: `${Math.floor(Math.random() * 999) + 1} ${['Rajaji Nagar', 'MG Road', 'Koramangala', 'HSR Layout', 'Indiranagar'][Math.floor(Math.random() * 5)]}, ${['Bangalore', 'Delhi', 'Mumbai', 'Hyderabad', 'Chennai'][Math.floor(Math.random() * 5)]}`,
      dateJoined: new Date(Date.now() - Math.floor(Math.random() * 31536000000)).toISOString(), // Random date in the last year
      photoURL: `https://ui-avatars.com/api/?name=Customer+${i + 1}&background=a7d171&color=fff`,
      ordersCount: Math.floor(Math.random() * 10),
      totalSpent: Math.floor(Math.random() * 10000) + 500 // Higher values in INR
    }));
    
    localStorage.setItem('mock_customers', JSON.stringify(customers));
    
    // Generate random orders
    const orders: Order[] = [];
    customers.forEach(customer => {
      const orderCount = Math.floor(Math.random() * 5); // 0-4 orders per customer
      for (let i = 0; i < orderCount; i++) {
        const orderItems: OrderItem[] = [];
        const itemCount = Math.floor(Math.random() * 5) + 1; // 1-5 items per order
        let orderTotal = 0;
        
        for (let j = 0; j < itemCount; j++) {
          const quantity = Math.floor(Math.random() * 3) + 1;
          const unitPrice = (Math.floor(Math.random() * 500) + 100); // Higher prices in INR
          const itemTotal = quantity * unitPrice;
          orderTotal += itemTotal;
          
          orderItems.push({
            id: `ITEM-${orders.length}-${j}`,
            productId: `PROD-${Math.floor(Math.random() * 100)}`,
            productName: `Product ${Math.floor(Math.random() * 100)}`,
            quantity,
            unitPrice,
            total: itemTotal
          });
        }
        
        const statuses: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        orders.push({
          id: `ORD-${2000 + orders.length}`,
          customerId: customer.id,
          customerName: customer.name,
          customerEmail: customer.email,
          date: new Date(Date.now() - Math.floor(Math.random() * 7776000000)).toISOString(), // Random date in the last 90 days
          status: randomStatus,
          items: orderItems,
          total: orderTotal,
          shippingAddress: customer.address || 'No address provided',
          paymentMethod: Math.random() > 0.5 ? 'Credit Card' : 'Cash on Delivery'
        });
      }
    });
    
    localStorage.setItem('mock_orders', JSON.stringify(orders));
    
    // Generate feedback
    const feedbacks: Feedback[] = [];
    customers.forEach(customer => {
      if (Math.random() > 0.7) { // Only 30% of customers leave feedback
        const customerOrders = orders.filter(order => order.customerId === customer.id);
        const orderIds = customerOrders.length > 0 
          ? customerOrders.slice(0, Math.floor(Math.random() * customerOrders.length) + 1).map(o => o.id)
          : undefined;
          
        const statuses: Feedback['status'][] = ['new', 'reviewed', 'responded'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        feedbacks.push({
          id: `FEED-${3000 + feedbacks.length}`,
          customerId: customer.id,
          customerName: customer.name,
          date: new Date(Date.now() - Math.floor(Math.random() * 2592000000)).toISOString(), // Random date in the last 30 days
          rating: Math.floor(Math.random() * 5) + 1, // 1-5 stars
          message: `This is feedback message ${feedbacks.length + 1}. ${Math.random() > 0.5 ? 'Great service!' : 'Could be better.'}`,
          orderIds,
          status: randomStatus
        });
      }
    });
    
    localStorage.setItem('mock_feedback', JSON.stringify(feedbacks));
  }
};

// Initialize mock data
initMockData();

// Admin service for handling customer and order data
export const adminService = {
  // Customers
  getCustomers: async (): Promise<Customer[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const customers = JSON.parse(localStorage.getItem('mock_customers') || '[]');
        resolve(customers);
      }, 500);
    });
  },
  
  getCustomerById: async (id: string): Promise<Customer | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const customers = JSON.parse(localStorage.getItem('mock_customers') || '[]');
        const customer = customers.find((c: Customer) => c.id === id) || null;
        resolve(customer);
      }, 300);
    });
  },
  
  // Orders
  getOrders: async (): Promise<Order[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders = JSON.parse(localStorage.getItem('mock_orders') || '[]');
        resolve(orders);
      }, 500);
    });
  },
  
  getOrderById: async (id: string): Promise<Order | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders = JSON.parse(localStorage.getItem('mock_orders') || '[]');
        const order = orders.find((o: Order) => o.id === id) || null;
        resolve(order);
      }, 300);
    });
  },
  
  getOrdersByCustomerId: async (customerId: string): Promise<Order[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders = JSON.parse(localStorage.getItem('mock_orders') || '[]');
        const customerOrders = orders.filter((o: Order) => o.customerId === customerId);
        resolve(customerOrders);
      }, 400);
    });
  },
  
  // Feedback
  getFeedback: async (): Promise<Feedback[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const feedback = JSON.parse(localStorage.getItem('mock_feedback') || '[]');
        resolve(feedback);
      }, 500);
    });
  },
  
  getFeedbackById: async (id: string): Promise<Feedback | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const feedback = JSON.parse(localStorage.getItem('mock_feedback') || '[]');
        const feedbackItem = feedback.find((f: Feedback) => f.id === id) || null;
        resolve(feedbackItem);
      }, 300);
    });
  },
  
  getFeedbackByCustomerId: async (customerId: string): Promise<Feedback[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const feedback = JSON.parse(localStorage.getItem('mock_feedback') || '[]');
        const customerFeedback = feedback.filter((f: Feedback) => f.customerId === customerId);
        resolve(customerFeedback);
      }, 400);
    });
  },
  
  // Dashboard stats
  getDashboardStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const customers = JSON.parse(localStorage.getItem('mock_customers') || '[]');
        const orders = JSON.parse(localStorage.getItem('mock_orders') || '[]');
        const feedback = JSON.parse(localStorage.getItem('mock_feedback') || '[]');
        
        // Calculate statistics
        const totalCustomers = customers.length;
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum: number, order: Order) => sum + order.total, 0);
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
        
        // Orders by status
        const ordersByStatus = {
          pending: orders.filter((o: Order) => o.status === 'pending').length,
          processing: orders.filter((o: Order) => o.status === 'processing').length,
          shipped: orders.filter((o: Order) => o.status === 'shipped').length,
          delivered: orders.filter((o: Order) => o.status === 'delivered').length,
          cancelled: orders.filter((o: Order) => o.status === 'cancelled').length,
        };
        
        // Recent orders and customers
        const recentOrders = [...orders].sort((a: Order, b: Order) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ).slice(0, 5);
        
        const recentCustomers = [...customers].sort((a: Customer, b: Customer) => 
          new Date(b.dateJoined).getTime() - new Date(a.dateJoined).getTime()
        ).slice(0, 5);
        
        // Average rating
        const ratings = feedback.map((f: Feedback) => f.rating);
        const averageRating = ratings.length > 0 
          ? ratings.reduce((sum: number, rating: number) => sum + rating, 0) / ratings.length 
          : 0;
        
        resolve({
          totalCustomers,
          totalOrders,
          totalRevenue,
          averageOrderValue,
          ordersByStatus,
          recentOrders,
          recentCustomers,
          totalFeedback: feedback.length,
          averageRating,
          newFeedback: feedback.filter((f: Feedback) => f.status === 'new').length
        });
      }, 600);
    });
  }
};
