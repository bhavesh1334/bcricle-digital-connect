import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface AuthRouteProps {
  children: JSX.Element;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        if (!session) {
          navigate('/'); // Redirect to home if not authenticated
        }
      } catch (error: any) {
        console.error('Error checking session:', error);
        navigate('/'); // Redirect to home on error
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [navigate]);

  if (isLoading) {
    return <div className='h-screen w-screen flex flex-col items-center justify-center'>
                <h1 className='text-4xl font-bold'>Loading...</h1>
           </div>;
  }

  return <>{children}</>;
};

export default AuthRoute;