
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
    if (step === 1 && !isVerified) {
      // Validate step 1 only if not verified and on step 1
      const valid = await form1.trigger();
      if (valid) {
        const step1Data = form1.getValues();
        setFormData(prev => ({ ...prev, ...step1Data })); // Preserve existing data

        setIsLoading(true);
        try {
          const { error: signUpError } = await supabase.auth.signUp({
            email: step1Data.email,
            password: step1Data.password,
            options: {
              emailRedirectTo: 'https://8080-firebase-bcricle-digital-connect-1746687994284.cluster-ys234awlzbhwoxmkkse6qo3fz6.cloudworkstations.dev/verify-email',
              data: {
                first_name: step1Data.firstName,
                last_name: step1Data.lastName,
                phone: step1Data.phone,
                designation: step1Data.designation || ''
              }
            }
          });
          if (signUpError) {
            if (signUpError.message.includes('already registered')) {
              throw new Error("This email is already registered. Please try logging in or use a different email.");
            }
            throw signUpError;
          }
          toast({
            title: "Account Created!",
            description: "Please check your email to verify your account before proceeding."
          });

        } catch (error: any) {
          console.error('Signup error:', error);
          toast({
            variant: "destructive",
            title: "Registration Failed",
            description: error.message || "An error occurred during signup. Please try again."
          });
        } finally {
          setIsLoading(false);
        }
      }
    } else if (step === 1 && isVerified) {
      // If already verified and on step 1, just move to step 2
      const valid = await form1.trigger(); // Still validate to ensure data is captured
      if (valid) {
        const step1Data = form1.getValues();
        setFormData(prev => ({ ...prev, ...step1Data })); // Preserve existing data
        setStep(2);
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
    setStep(currentStep => Math.max(1, currentStep - 1)); // Allow going back to step 1
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
          owner_id: currentUserId, // Corrected line: use currentUserId
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
          logo_url: logoUrl,
          cover_image: coverImageUrl,
          verified: false,
          payment_status: 'pending'
        };
        
        console.log("Business data for insertion:", businessData);
        
        // Add explicit check to ensure owner_id matches the current authenticated user ID
        if (businessData.owner_id !== currentUserId) {
           console.error("Owner ID mismatch:", { provided: businessData.owner_id, actual: currentUserId });
           throw new Error("Authentication mismatch. Cannot create business with incorrect owner ID.");
        }
        
        const { data: insertedBusiness, error: businessError } = await supabase
          .from('businesses')
          .insert(businessData)
          .select('id')
          .single();

        if (businessError) {
          console.error('Business insertion error details:', businessError);
          
          // Try to get more info about the error
          console.error('Error code:', businessError.code);
          console.error('Error message:', businessError.message);
          console.error('Error details:', businessError.details);
          
          // Check session status
          const sessionStatus = await supabase.auth.getSession();
          console.error('Current session status:', sessionStatus.data.session ? 'Active' : 'No session');
          
          throw businessError; // Rethrow business insertion errors
        }
        
        console.log("Successfully created business with ID:", insertedBusiness?.id);
        
        // 6. Upload business photos if provided
        if (Array.isArray(completeFormData.businessPhotos) && completeFormData.businessPhotos.length > 0 && insertedBusiness) {
          console.log(`Uploading ${completeFormData.businessPhotos.length} business photos`);
          
          const photoPromises = completeFormData.businessPhotos.map(async (photo: File, index: number) => {
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
              }
              
              return photoUrl;
            }
            return null;
          });
          
          await Promise.all(photoPromises);
          console.log("All photos processed");
        }
        
        // 7. Display registration success and verification message
        toast({
          title: "Registration successful!",
          description: "Your account has been created. You will receive an email to verify your account and activate your business listing."
        });        
        navigate('/registration-success');
      } catch (error: any) { // Catching any errors thrown during the process
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
    isVerified, // Expose isVerified state
    nextStep,
    prevStep,
    onSubmit
  };
};
