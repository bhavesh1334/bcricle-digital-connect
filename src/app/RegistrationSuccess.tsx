
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const RegistrationSuccess = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setEmail(user.email);
      }
    };
    
    getUser();
  }, []);
  
  const handleResendEmail = async () => {
    if (!email) return;
    
    setIsResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Email Sent!",
        description: "A new verification email has been sent to your inbox."
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to Resend",
        description: error.message || "An error occurred. Please try again later."
      });
    } finally {
      setIsResending(false);
    }
  };
  
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center bg-gray-50'>
      <div className="max-w-lg w-full bg-white rounded-xl shadow-sm p-8 border border-gray-200">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h1 className="mt-4 text-3xl font-montserrat font-bold text-gray-900">Registration Started!</h1>
          <p className="mt-2 text-lg text-gray-600">
            Thank you for starting your registration with Business Circle.
          </p>
          
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h2 className="text-xl font-semibold text-blue-800">Verify Your Email</h2>
            <p className="mt-2 text-blue-700">
              Please check your email inbox to verify your account. 
              We've sent a verification link to {email || "your email address"}.
            </p>
            <p className="mt-2 text-blue-700">
              You need to verify your email before you can continue with your business registration.
            </p>
          </div>
          
          <div className="mt-8 space-y-4">
            <p className="text-gray-600">
              Didn't receive the email? Check your spam folder or request a new verification email.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                variant="outline" 
                className="border-bcircle-blue text-bcircle-blue hover:bg-bcircle-blue/10"
                onClick={handleResendEmail}
                disabled={isResending}
              >
                {isResending ? "Sending..." : "Resend Verification Email"}
              </Button>
              
              <Link to="/login">
                <Button className="w-full sm:w-auto bg-bcircle-blue hover:bg-bcircle-blue/90">
                  Go to Login
                </Button>
              </Link>
            </div>
            
            <div className="mt-6">
              <p className="text-center text-gray-500 text-sm">
                Already verified your email?
              </p>
              <div className="flex justify-center mt-2">
                <Link to="/complete-registration">
                  <Button variant="link" className="text-bcircle-blue">
                    Continue Business Registration
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
