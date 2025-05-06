import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Step 1 schema
const accountSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  profileImage: z.any().optional(),
  designation: z.string().optional(),
  phone: z.string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid Indian phone number"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string()
    .min(8, "Password must be at least 8 characters long"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Step 2 schema
const businessSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  category: z.string().min(1, "Category is required"),
  address: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().optional(),
});

// Step 3 schema
const detailsSchema = z.object({
  description: z.string().min(1, "Business description is required"),
  instagramLink: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal('')),
  whatsapp: z.string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid Indian WhatsApp number"),
  founded: z.string().optional(),
  logo: z.any().optional(),
  businessPhotos: z.any().optional(),
  termsAgreed: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type FormData = z.infer<typeof accountSchema> & 
                z.infer<typeof businessSchema> & 
                z.infer<typeof detailsSchema>;

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Form for step 1
  const form1 = useForm<z.infer<typeof accountSchema>>({
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
  const form2 = useForm<z.infer<typeof businessSchema>>({
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
  const form3 = useForm<z.infer<typeof detailsSchema>>({
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
          // Save business data to a database table (in a future implementation)
          // For now, we'll just log the data
          console.log('Business registration data:', completeFormData);
          
          toast({
            title: "Registration successful!",
            description: "Your account has been created. Please check your email to verify your account."
          });
          
          navigate('/');
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

  return (
    <MainLayout>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-montserrat font-bold text-bcircle-blue">Register Your Business</h1>
              <p className="mt-2 text-gray-600">Join Chhattisgarh's premier business network</p>
            </div>
            
            {/* Progress Steps */}
            <div className="mb-10">
              <div className="flex items-center justify-between">
                <div className={`flex flex-col items-center ${step >= 1 ? 'text-bcircle-blue' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-bcircle-blue bg-bcircle-blue/10' : 'border-gray-300'}`}>
                    1
                  </div>
                  <span className="text-sm mt-1">Account</span>
                </div>
                
                <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-bcircle-blue' : 'bg-gray-300'}`}></div>
                
                <div className={`flex flex-col items-center ${step >= 2 ? 'text-bcircle-blue' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-bcircle-blue bg-bcircle-blue/10' : 'border-gray-300'}`}>
                    2
                  </div>
                  <span className="text-sm mt-1">Business</span>
                </div>
                
                <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-bcircle-blue' : 'bg-gray-300'}`}></div>
                
                <div className={`flex flex-col items-center ${step >= 3 ? 'text-bcircle-blue' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-bcircle-blue bg-bcircle-blue/10' : 'border-gray-300'}`}>
                    3
                  </div>
                  <span className="text-sm mt-1">Details</span>
                </div>
              </div>
            </div>
            
            {/* Step 1: Account Information */}
            {step === 1 && (
              <Form {...form1}>
                <form onSubmit={form1.handleSubmit(nextStep)} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form1.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form1.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form1.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form1.control}
                      name="designation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Designation (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form1.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form1.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Create Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form1.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-bcircle-blue hover:bg-bcircle-blue/90">
                      Next Step
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            
            {/* Step 2: Business Information */}
            {step === 2 && (
              <Form {...form2}>
                <form onSubmit={form2.handleSubmit(nextStep)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={form2.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form2.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Category</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm h-10"
                            >
                              <option value="">Select a category</option>
                              <option value="web-development">Web Development & IT</option>
                              <option value="accounting">Accounting Services</option>
                              <option value="marketing">Digital Marketing</option>
                              <option value="real-estate">Real Estate & Builders</option>
                              <option value="healthcare">Healthcare Services</option>
                              {/* More options would be added here */}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form2.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Address (Optional)</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form2.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form2.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form2.control}
                        name="pincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pincode (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button type="button" onClick={prevStep} variant="outline" className="border-bcircle-blue text-bcircle-blue hover:bg-bcircle-blue/10">
                      Previous
                    </Button>
                    <Button type="submit" className="bg-bcircle-blue hover:bg-bcircle-blue/90">
                      Next Step
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            
            {/* Step 3: Business Details */}
            {step === 3 && (
              <Form {...form3}>
                <form onSubmit={form3.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={form3.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={5} placeholder="Tell us about your business, services offered, etc." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form3.control}
                      name="instagramLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram Link (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://instagram.com/yourbusiness" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form3.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} type="url" placeholder="https://example.com" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form3.control}
                        name="whatsapp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>WhatsApp Business Number</FormLabel>
                            <FormControl>
                              <Input {...field} type="tel" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form3.control}
                        name="founded"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year Founded (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" min="1900" max={new Date().getFullYear()} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Logo (Optional)</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="logo-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-bcircle-blue hover:text-bcircle-blue/80"
                            >
                              <span>Upload a file</span>
                              <input id="logo-upload" name="logo-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Photos (Optional, Max 6)</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="photos-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-bcircle-blue hover:text-bcircle-blue/80"
                            >
                              <span>Upload files</span>
                              <input id="photos-upload" name="photos-upload" type="file" className="sr-only" multiple />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB each</p>
                        </div>
                      </div>
                    </div>
                    
                    <FormField
                      control={form3.control}
                      name="termsAgreed"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange}
                              id="terms"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel htmlFor="terms">
                              I agree to the{' '}
                              <Link to="/terms-of-service" className="text-bcircle-blue hover:text-bcircle-blue/80">
                                Terms of Service
                              </Link>{' '}
                              and{' '}
                              <Link to="/privacy-policy" className="text-bcircle-blue hover:text-bcircle-blue/80">
                                Privacy Policy
                              </Link>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      onClick={prevStep} 
                      variant="outline" 
                      className="border-bcircle-blue text-bcircle-blue hover:bg-bcircle-blue/10"
                      disabled={isLoading}
                    >
                      Previous
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-bcircle-orange hover:bg-bcircle-orange/90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Registering..." : "Complete Registration"}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-bcircle-blue hover:text-bcircle-blue/80">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
