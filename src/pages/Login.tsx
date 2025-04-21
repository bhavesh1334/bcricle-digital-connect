
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <h1 className="text-3xl font-montserrat font-bold text-bcircle-blue">Welcome Back</h1>
            <p className="mt-2 text-sm text-gray-600">Sign in to access your BCIRCLE account</p>
          </div>
          
          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-bcircle-blue hover:text-bcircle-blue/80">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1"
                  placeholder="Enter your password"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-bcircle-blue focus:ring-bcircle-blue border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full bg-bcircle-blue hover:bg-bcircle-blue/90">
              Sign in
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-bcircle-orange hover:text-bcircle-orange/80">
                  Register now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
