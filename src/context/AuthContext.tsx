
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper function to get normalized email (case insensitive)
const normalizeEmail = (email: string): string => email.toLowerCase();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Check if a user already exists with the given email (case insensitive)
  const userExists = (email: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const normalizedEmail = normalizeEmail(email);
    return users.some((u: any) => normalizeEmail(u.email) === normalizedEmail);
  };

  // Get user by email (case insensitive)
  const getUserByEmail = (email: string): any => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const normalizedEmail = normalizeEmail(email);
    return users.find((u: any) => normalizeEmail(u.email) === normalizedEmail);
  };

  // Save users to localStorage
  const saveUsers = (users: any[]) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (!email || !password) {
        throw new Error('请输入邮箱和密码');
      }
      
      // Get the user with this email (case insensitive)
      const foundUser = getUserByEmail(email);
      
      if (!foundUser) {
        throw new Error('用户不存在');
      }
      
      // Check password
      if (foundUser.password !== password) {
        throw new Error('密码错误');
      }
      
      // Create user session - Use the original case from stored user
      const sessionUser = {
        id: foundUser.id,
        email: foundUser.email, // Keep original case as stored
        username: foundUser.username,
      };
      
      // Save user in local storage
      localStorage.setItem('user', JSON.stringify(sessionUser));
      setUser(sessionUser);
      toast({
        title: '登录成功',
        description: `欢迎回来, ${sessionUser.username}!`,
      });
    } catch (error) {
      toast({
        title: '登录失败',
        description: error instanceof Error ? error.message : '登录时出现错误',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock register function
  const register = async (email: string, password: string, username: string) => {
    setIsLoading(true);
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (!email || !password || !username) {
        throw new Error('所有字段都是必填的');
      }
      if (password.length < 6) {
        throw new Error('密码至少需要6个字符');
      }
      
      // Check if user already exists (case insensitive)
      if (userExists(email)) {
        throw new Error('该邮箱已被注册');
      }
      
      // Create new user - store original email but use normalized email for checks
      const newUser = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        email, // Store original email format
        username,
        password, // In a real app, this would be hashed
      };
      
      // Add to users list
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(newUser);
      saveUsers(users);
      
      // Create user session
      const sessionUser = {
        id: newUser.id,
        email: newUser.email, // Preserve original case
        username: newUser.username,
      };
      
      // Save user in local storage
      localStorage.setItem('user', JSON.stringify(sessionUser));
      setUser(sessionUser);
      toast({
        title: '注册成功',
        description: `欢迎, ${username}!`,
      });
    } catch (error) {
      toast({
        title: '注册失败',
        description: error instanceof Error ? error.message : '注册时出现错误',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: '已登出',
      description: '您已成功登出',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
