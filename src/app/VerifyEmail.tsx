import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const searchParams = new URLSearchParams(window.location.search);
  const referrerId = searchParams.get('ref');

  useEffect(() => {
    const verifyFromHash = async () => {
      const hash = window.location.hash.substring(1); // Remove the `#`
      const params = new URLSearchParams(hash);
      const access_token = params.get('access_token');
      const refresh_token = params.get('refresh_token');
      console.log(access_token, refresh_token, "AT RT")

      if (!access_token || !refresh_token) {
        toast({
          variant: 'destructive',
          title: 'Verification Failed',
          description: 'Missing access or refresh token in the URL.',
        });
        navigate('/');
        return;
      }

      try {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (sessionError) throw sessionError;

        toast({
          title: 'Email Verified',
          description: 'You have been successfully signed in.',
        });
        if (referrerId) {
          navigate(`/register?ref=${referrerId}`);
        } else {
          navigate('/register');
        }
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Session Error',
          description: error.message || 'Could not establish a session.',
        });
        navigate('/');
      }
    };

    verifyFromHash();
  }, [navigate, referrerId]);

  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold'>Verifying Email...</h1>
    </div>
  );
};

export default VerifyEmail;
