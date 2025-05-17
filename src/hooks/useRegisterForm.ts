import { useState, useEffect } from 'react';
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
  const [isVerified, setIsVerified] = useState(false); // Added state for verification status
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const referrerId = searchParams.get('ref');

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
      founded: '', // Assuming this is a string or Date and not required for initial steps
      logo: undefined,
      coverImage: undefined,
      businessPhotos: [],
      termsAgreed: false,
    },
  });
  const { toast } = useToast();

  // Check user verification status on component mount
  useEffect(() => {
    const checkVerification = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email_confirmed_at) {
        setIsVerified(true);
        setStep(2); // Skip step 1 if already verified
      }
    };
    checkVerification();
  }, []);

  // Function to handle moving to the next step based on current step
  const nextStep = async () => {
    if (step === 1) {
      try {
        // Validate step 1
        const valid = await form1.trigger();
        console.log('Form validation result:', valid);
        
        if (valid) {
          const step1Data = form1.getValues();
          console.log('Form data:', step1Data);
          setFormData(prev => ({ ...prev, ...step1Data }));

          setIsLoading(true);
          try {
            console.log('Attempting to sign up with Supabase...');
            const { error: signUpError } = await supabase.auth.signUp({
              email: step1Data.email,
              password: step1Data.password,
              options: {
                emailRedirectTo: referrerId? `${window.location.origin}/verify-email?ref=${referrerId}`:`${window.location.origin}/verify-email`,
                data: {
                  first_name: step1Data.firstName,
                  last_name: step1Data.lastName,
                  phone: step1Data.phone,
                  designation: step1Data.designation || ''
                }
              }
            });

            if (signUpError) {
              console.error('Signup error:', signUpError);
              if (signUpError.message.includes('already registered')) {
                throw new Error("This email is already registered. Please try logging in or use a different email.");
              }
              throw signUpError;
            }

            console.log('Signup successful, showing toast and moving to next step');
            toast({
              title: "Account Created!",
              description: "Please check your email to verify your account before proceeding."
            });
            
            const successParams = new URLSearchParams({
              email: step1Data.email,
              ...(referrerId && { ref: referrerId })
            });
            
            navigate(`/registration-success?${successParams.toString()}`);
          } catch (error: any) {
            console.error('Error during signup:', error);
            toast({
              variant: "destructive",
              title: "Registration Failed",
              description: error.message || "An error occurred during signup. Please try again."
            });
          } finally {
            setIsLoading(false);
          }
        } else {
          console.log('Form validation failed:', form1.formState.errors);
        }
      } catch (error) {
        console.error('Error in nextStep:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred. Please try again."
        });
      }
    } else if (step === 2) {
      const valid = await form2.trigger();
      if (valid) {
        setFormData(prev => ({ ...prev, ...form2.getValues() }));
        setStep(3);
      }
    }
  };

  // Function to move to the previous step
  const prevStep = () => {
    setStep(currentStep => Math.max(1, currentStep - 1));
  };

  // Upload a file to Supabase Storage
  const uploadFile = async (file: File, bucket: string, path: string) => {
    if (!file) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, { cacheControl: '3600', upsert: false }); // Added upsert: false to prevent overwriting

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      throw uploadError; // Throw error to be caught by the main try/catch
    }
    
    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return publicUrl;
  };

  const onSubmit = async () => {
    const valid = await form3.trigger();
    if (valid) {
      const step3Data = form3.getValues();
      const completeFormData = { ...formData, ...step3Data };
      
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session || !session.user) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Please log in to complete the registration process."
        });
        return;
      }

      setIsLoading(true);
      try {
        let logoUrl = null;
        let coverImageUrl = null;
        if (completeFormData.logo instanceof File) {
          console.log("Uploading business logo...");
          logoUrl = await uploadFile(completeFormData.logo, 'business-images', 'logos');
          console.log("Logo uploaded:", logoUrl);
        }
        
        // 4. Upload cover image if provided
        if (completeFormData.coverImage instanceof File) {
          console.log("Uploading cover image...");
          coverImageUrl = await uploadFile(completeFormData.coverImage, 'business-images', 'covers');
          console.log("Cover image uploaded:", coverImageUrl);
        }

        // 5. Verify session and get user ID before inserting business data
        const currentUserId = session.user.id;
        console.log("Inserting business data with authenticated user ID:", currentUserId);
        console.log("Session user ID for insertion:", session.user.id);
        
       

        const businessData = {
          owner_id: currentUserId,
          name: completeFormData.businessName as string,
          description: completeFormData.description as string,
          category: completeFormData.category as string,
          address: completeFormData.address || undefined,
          city: completeFormData.city as string,
          state: completeFormData.state as string,
          pincode: completeFormData.pincode || undefined,
          website: completeFormData.website || undefined,
          instagram_link: completeFormData.instagramLink || undefined,
          whatsapp: completeFormData.whatsapp as string,
          founded: completeFormData.founded || undefined,
          logo_url: logoUrl,
          cover_image: coverImageUrl,
          verified: false,
          payment_status: 'PENDING' as const
          // referral fields will be added after migration
        };

        // Create business
        const { data: insertedBusiness, error: businessError } = await supabase
          .from('businesses')
          .insert(businessData)
          .select()
          .single();

        if (businessError) {
          console.error('Error creating business:', businessError);
          throw businessError;
        }
        
        console.log("Successfully created business with ID:", insertedBusiness?.id);

        // If there's a referrer, increment their referral count
        if (referrerId) {
          const { error: referralError } = await supabase.rpc('increment_referral_count', { business_id: referrerId });
          if (referralError) {
            console.error('Error incrementing referral count:', referralError);
          }
        }
        
        // 6. Upload business photos if provided
        if (Array.isArray(completeFormData.businessPhotos) && completeFormData.businessPhotos.length > 0 && insertedBusiness) {
          console.log(`Uploading ${completeFormData.businessPhotos.length} business photos`);
          const failedUploads: { index: number, error: any }[] = [];
          const photoPromises = completeFormData.businessPhotos.map(async (photo: File, index: number) => {
            try {
              const photoUrl = await uploadFile(photo, 'business-images', `photos/${insertedBusiness.id}`);
              console.log(`Photo ${index + 1} uploaded:`, photoUrl);
              if (photoUrl) {
                const { error: photoError } = await supabase
                  .from('business_photos')
                  .insert({
                    business_id: insertedBusiness.id,
                    photo_url: photoUrl
                  });
                if (photoError) {
                  console.error(`Error inserting photo ${index + 1}:`, photoError);
                  failedUploads.push({ index, error: photoError });
                }
                return photoUrl;
              } else {
                failedUploads.push({ index, error: 'No photoUrl returned from uploadFile' });
              }
            } catch (err) {
              console.error(`Error uploading photo ${index + 1}:`, err);
              failedUploads.push({ index, error: err });
            }
            return null;
          });
          await Promise.all(photoPromises);
          if (failedUploads.length > 0) {
            console.warn('Some business photos failed to upload or insert:', failedUploads);
          } else {
            console.log('All business photos uploaded and inserted successfully.');
          }
        }
        
        // Show success dialog instead of navigating
        setShowSuccessDialog(true);
        
      } catch (error: any) {
        console.error('Registration error:', error);
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
    isVerified,
    showSuccessDialog,
    setShowSuccessDialog,
    nextStep,
    prevStep,
    onSubmit
  };
};
