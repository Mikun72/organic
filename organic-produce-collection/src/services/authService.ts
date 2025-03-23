
// This service would typically connect to a backend API
// that handles the MySQL database operations

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  name?: string;
  email: string;
  password: string;
  photoURL?: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    photoURL?: string;
    role?: string;
  };
  token?: string;
}

interface AdminLoginCredentials {
  username: string;
  password: string;
}

// Simulated authentication service
// In a real app, these would make API calls to your MySQL backend
export const authService = {
  // Login with email and password
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // This is where you would make an actual API call to your MySQL backend
        if (credentials.email && credentials.password) {
          // Success case
          const user = {
            id: '1',
            name: 'User',
            email: credentials.email,
            photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent('User')}&background=a7d171&color=fff`,
            role: 'customer'
          };
          
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('user', JSON.stringify(user));
          
          resolve({
            success: true,
            message: 'Login successful',
            user,
            token: 'simulated-jwt-token'
          });
        } else {
          // Failure case
          resolve({
            success: false,
            message: 'Invalid email or password',
          });
        }
      }, 1000);
    });
  },

  // Register a new user
  signup: async (data: SignupData): Promise<AuthResponse> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // This is where you would make an actual API call to your MySQL backend
        if (data.email && data.password) {
          // Generate avatar from name using UI Avatars service
          const name = data.name || 'User';
          const generatedPhotoURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=a7d171&color=fff`;
          
          const user = {
            id: '1',
            name: name,
            email: data.email,
            photoURL: data.photoURL || generatedPhotoURL,
            role: 'customer'
          };
          
          // Success case
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('user', JSON.stringify(user));
          
          resolve({
            success: true,
            message: 'Account created successfully',
            user,
            token: 'simulated-jwt-token'
          });
        } else {
          // Failure case
          resolve({
            success: false,
            message: 'Failed to create account',
          });
        }
      }, 1000);
    });
  },

  // Google login
  googleLogin: async (): Promise<AuthResponse> => {
    // Simulate Google authentication
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would handle the Google OAuth flow
        const mockGoogleUser = {
          id: 'google-123',
          name: 'Google User',
          email: 'google.user@example.com',
          photoURL: 'https://ui-avatars.com/api/?name=Google+User&background=a7d171&color=fff',
          role: 'customer'
        };
        
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(mockGoogleUser));
        
        resolve({
          success: true,
          message: 'Google login successful',
          user: mockGoogleUser,
          token: 'simulated-google-jwt-token'
        });
      }, 1000);
    });
  },

  // Admin login
  adminLogin: async (credentials: AdminLoginCredentials): Promise<AuthResponse> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would verify admin credentials against the MySQL database
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
          const adminUser = {
            id: 'admin-1',
            name: 'Admin User',
            email: 'admin@example.com',
            photoURL: 'https://ui-avatars.com/api/?name=Admin+User&background=4f46e5&color=fff',
            role: 'admin'
          };
          
          localStorage.setItem('isAdminAuthenticated', 'true');
          localStorage.setItem('adminUser', JSON.stringify(adminUser));
          
          resolve({
            success: true,
            message: 'Admin login successful',
            user: adminUser,
            token: 'simulated-admin-jwt-token'
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid admin credentials',
          });
        }
      }, 1000);
    });
  },

  // Logout
  logout: (): void => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  },

  // Admin logout
  adminLogout: (): void => {
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('adminUser');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return localStorage.getItem('isAuthenticated') === 'true';
  },

  // Check if admin is authenticated
  isAdminAuthenticated: (): boolean => {
    return localStorage.getItem('isAdminAuthenticated') === 'true';
  },

  // Get current user
  getCurrentUser: () => {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  },

  // Get current admin
  getCurrentAdmin: () => {
    const adminJson = localStorage.getItem('adminUser');
    return adminJson ? JSON.parse(adminJson) : null;
  }
};
