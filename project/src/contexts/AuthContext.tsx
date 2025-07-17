import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  role: 'parent' | 'teacher' | 'admin';
  name: string;
  children?: Child[];
}

interface Child {
  id: string;
  name: string;
  age: number;
  avatar: string;
  gender: 'boy' | 'girl';
  progress: {
    literacy: number;
    creativity: number;
    maths: number;
    emotions: number;
    body: number;
    family: number;
  };
  streak: number;
  badges: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: string) => Promise<void>;
  logout: () => void;
  createChild: (childData: Omit<Child, 'id' | 'progress' | 'streak' | 'badges'>) => void;
  updateChildProgress: (childId: string, hub: string, progress: number) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user from localStorage or API
    const savedUser = localStorage.getItem('kodeit_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email
      let mockUser: User;
      if (email.includes('admin')) {
        mockUser = {
          id: '1',
          email,
          role: 'admin',
          name: 'Admin User'
        };
      } else if (email.includes('teacher')) {
        mockUser = {
          id: '2',
          email,
          role: 'teacher',
          name: 'Teacher Smith'
        };
      } else {
        mockUser = {
          id: '3',
          email,
          role: 'parent',
          name: 'Parent Johnson',
          children: [
            {
              id: 'child1',
              name: 'Emma',
              age: 5,
              avatar: '👧',
              gender: 'girl',
              progress: {
                literacy: 65,
                creativity: 80,
                maths: 45,
                emotions: 70,
                body: 55,
                family: 90
              },
              streak: 7,
              badges: ['first_letter', 'color_master', 'family_tree']
            }
          ]
        };
      }
      
      setUser(mockUser);
      localStorage.setItem('kodeit_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        email,
        role: role as 'parent' | 'teacher' | 'admin',
        name,
        children: role === 'parent' ? [] : undefined
      };
      
      setUser(newUser);
      localStorage.setItem('kodeit_user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kodeit_user');
  };

  const createChild = (childData: Omit<Child, 'id' | 'progress' | 'streak' | 'badges'>) => {
    if (!user || user.role !== 'parent') return;
    
    const newChild: Child = {
      ...childData,
      id: Date.now().toString(),
      progress: {
        literacy: 0,
        creativity: 0,
        maths: 0,
        emotions: 0,
        body: 0,
        family: 0
      },
      streak: 0,
      badges: []
    };
    
    const updatedUser = {
      ...user,
      children: [...(user.children || []), newChild]
    };
    
    setUser(updatedUser);
    localStorage.setItem('kodeit_user', JSON.stringify(updatedUser));
  };

  const updateChildProgress = (childId: string, hub: string, progress: number) => {
    if (!user || !user.children) return;
    
    const updatedChildren = user.children.map(child => {
      if (child.id === childId) {
        return {
          ...child,
          progress: {
            ...child.progress,
            [hub]: Math.max(child.progress[hub as keyof typeof child.progress], progress)
          }
        };
      }
      return child;
    });
    
    const updatedUser = { ...user, children: updatedChildren };
    setUser(updatedUser);
    localStorage.setItem('kodeit_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    register,
    logout,
    createChild,
    updateChildProgress,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};