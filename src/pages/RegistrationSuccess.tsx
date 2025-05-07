
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const RegistrationSuccess = () => {
  return (
    <MainLayout>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <Mail className="h-12 w-12 text-green-600" />
                </div>
              </div>
              
              <h1 className="mt-4 text-3xl font-montserrat font-bold text-gray-900">Registration Successful!</h1>
              <p className="mt-2 text-lg text-gray-600">
                Thank you for registering with Business Circle.
              </p>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
                <h2 className="text-xl font-semibold text-blue-800">Verify Your Email</h2>
                <p className="mt-2 text-blue-700">
                  Please check your email inbox to verify your account. 
                  We've sent a verification link to the email address you provided.
                </p>
                <p className="mt-2 text-blue-700">
                  You need to verify your email before you can login and access all features.
                </p>
              </div>
              
              <div className="mt-8 space-y-4">
                <p className="text-gray-600">
                  Didn't receive the email? Check your spam folder or request a new verification email.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button variant="outline" className="border-bcircle-blue text-bcircle-blue hover:bg-bcircle-blue/10">
                    Resend Verification Email
                  </Button>
                  
                  <Link to="/login">
                    <Button className="w-full sm:w-auto bg-bcircle-blue hover:bg-bcircle-blue/90">
                      Go to Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RegistrationSuccess;
