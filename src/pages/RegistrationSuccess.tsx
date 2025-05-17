import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const COOLDOWN_DURATION = 60; // seconds

const RegistrationSuccess = () => {
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(COOLDOWN_DURATION);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  const email = searchParams.get('email') || '';
  const referrerId = searchParams.get('ref') || '';
  
  const maskEmail = (email: string) => {
    const [username, domain] = email.split('@');
    const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
    return `${maskedUsername}@${domain}`;
  };

  const getRedirectUrl = () => {
    const baseUrl = `${window.location.origin}/verify-email`;
    return referrerId ? `${baseUrl}?ref=${referrerId}` : baseUrl;
  };

  // Handle countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleResendVerificationEmail = async () => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Email address not found. Please try registering again."
      });
      return;
    }

    setIsResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: getRedirectUrl()
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Verification Email Sent",
        description: "Please check your inbox for the verification link."
      });
      
      // Reset countdown after successful resend
      setCountdown(COOLDOWN_DURATION);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to resend verification email. Please try again."
      });
    } finally {
      setIsResending(false);
    }
  };

  const getButtonText = () => {
    if (isResending) return "Sending...";
    if (countdown > 0) return `Resend in ${countdown}s`;
    return "Resend Verification Email";
  };

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
              
              <h1 className="mt-4 text-3xl font-montserrat font-bold text-gray-900">Verify Your Email</h1>
              <p className="mt-2 text-lg text-gray-600">
                Thank you for registering with CBN.
              </p>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
                <p className="mt-2 text-blue-700">
                  Please check your email inbox to verify your account. 
                  We've sent a verification link to:
                </p>
                <div className="mt-2 space-y-1">
                  <p className="text-blue-600 font-medium">{maskEmail(email)}</p>
                </div>
                <p className="mt-2 text-blue-700">
                  You need to verify your email before you can login and access all features.
                </p>
              </div>
              
              <div className="mt-8 space-y-4">
                <p className="text-gray-600">
                  Didn't receive the email? Check your spam folder or request a new verification email.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    variant="outline" 
                    className="border-bcircle-blue text-bcircle-blue hover:bg-bcircle-blue/80"
                    onClick={handleResendVerificationEmail}
                    disabled={isResending || countdown > 0}
                  >
                    {getButtonText()}
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
