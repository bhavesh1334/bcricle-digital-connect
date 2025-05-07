
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  AccountFormData, 
  BusinessFormData, 
  DetailsFormData, 
  RegisterFormData,
  accountSchema, 
  businessSchema, 
  detailsSchema 
} from '@/schemas/registerSchema';

export const useRegisterForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegisterFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form for step 1
  const form1 = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      designation: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Form for step 2
  const form2 = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      businessName: '',
      category: '',
      address: '',
      city: 'Raipur',
      state: 'Chhattisgarh',
      pincode: '',
    },
  });

  // Form for step 3
  const form3 = useForm<DetailsFormData>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      description: '',
      instagramLink: '',
      website: '',
      whatsapp: '',
      founded: '',
      termsAgreed: false,
    },
  });

  const nextStep = async () => {
    if (step === 1) {
      const valid = await form1.trigger();
      if (valid) {
        const step1Data = form1.getValues();
        setFormData(prev => ({ ...prev, ...step1Data }));
        setStep(2);
      }
    } else if (step === 2) {
      const valid = await form2.trigger();
      if (valid) {
        const step2Data = form2.getValues();
        setFormData(prev => ({ ...prev, ...step2Data }));
        setStep(3);
      }
    }
  };

  const prevStep = () => {
    setStep(currentStep => currentStep - 1);
  };

  const onSubmit = async () => {
    const valid = await form3.trigger();
    if (valid) {
      const step3Data = form3.getValues();
      const completeFormData = { ...formData, ...step3Data };
      
      setIsLoading(true);
      
      try {
        // Sign up with Supabase
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email: completeFormData.email as string,
          password: completeFormData.password as string,
          options: {
            data: {
              first_name: completeFormData.firstName,
              last_name: completeFormData.lastName,
              phone: completeFormData.phone,
              designation: completeFormData.designation || ''
            }
          }
        });

        if (signUpError) {
          throw new Error(signUpError.message);
        }

        if (authData?.user) {
          // Now insert business data
          const { error: businessError } = await supabase
            .from('businesses')
            .insert({
              owner_id: authData.user.id,
              name: completeFormData.businessName as string,
              description: completeFormData.description as string,
              category: completeFormData.category as string,
              address: completeFormData.address || null,
              city: completeFormData.city as string,
              state: completeFormData.state as string,
              pincode: completeFormData.pincode || null,
              website: completeFormData.website || null,
              instagram_link: completeFormData.instagramLink || null,
              whatsapp: completeFormData.whatsapp as string,
              founded: completeFormData.founded || null,
              logo_url: null, // We'll handle file uploads separately
              cover_image: null, // New field for cover image
              verified: false, // Default value for new field
              payment_status: 'pending' // Default value for new field
            });

          if (businessError) {
            throw new Error(businessError.message);
          }
          
          // For now, display registration success and verification message
          toast({
            title: "Registration successful!",
            description: "Please check your email to verify your account."
          });
          
          navigate('/registration-success');
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: error.message || "Something went wrong. Please try again."
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    step,
    form1,
    form2,
    form3,
    isLoading,
    nextStep,
    prevStep,
    onSubmit
  };
};
