
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';

const Register = () => {
  const [step, setStep] = useState(1);
  
  const nextStep = () => {
    setStep(currentStep => currentStep + 1);
  };
  
  const prevStep = () => {
    setStep(currentStep => currentStep - 1);
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
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                      <Input id="firstName" type="text" required className="mt-1" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                      <Input id="lastName" type="text" required className="mt-1" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <Input id="email" type="email" required className="mt-1" />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <Input id="phone" type="tel" required className="mt-1" />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Create Password</label>
                    <Input id="password" type="password" required className="mt-1" />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <Input id="confirmPassword" type="password" required className="mt-1" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={nextStep} className="bg-bcircle-blue hover:bg-bcircle-blue/90">
                    Next Step
                  </Button>
                </div>
              </form>
            )}
            
            {/* Step 2: Business Information */}
            {step === 2 && (
              <form className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Business Name</label>
                    <Input id="businessName" type="text" required className="mt-1" />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Business Category</label>
                    <select
                      id="category"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bcircle-blue focus:ring-bcircle-blue sm:text-sm h-10 px-3 py-2 bg-white border"
                    >
                      <option value="">Select a category</option>
                      <option value="web-development">Web Development & IT</option>
                      <option value="accounting">Accounting Services</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="real-estate">Real Estate & Builders</option>
                      <option value="healthcare">Healthcare Services</option>
                      {/* More options would be added here */}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Business Address</label>
                    <Textarea id="address" required className="mt-1" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                      <Input id="city" type="text" defaultValue="Raipur" required className="mt-1" />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                      <Input id="state" type="text" defaultValue="Chhattisgarh" required className="mt-1" />
                    </div>
                    <div>
                      <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
                      <Input id="pincode" type="text" required className="mt-1" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button onClick={prevStep} variant="outline" className="border-bcircle-blue text-bcircle-blue hover:bg-bcircle-blue/10">
                    Previous
                  </Button>
                  <Button onClick={nextStep} className="bg-bcircle-blue hover:bg-bcircle-blue/90">
                    Next Step
                  </Button>
                </div>
              </form>
            )}
            
            {/* Step 3: Business Details */}
            {step === 3 && (
              <form className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Business Description</label>
                    <Textarea id="description" required className="mt-1" rows={5} placeholder="Tell us about your business, services offered, etc." />
                  </div>
                  
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website (Optional)</label>
                    <Input id="website" type="url" className="mt-1" placeholder="https://example.com" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">WhatsApp Business Number</label>
                      <Input id="whatsapp" type="tel" className="mt-1" />
                    </div>
                    <div>
                      <label htmlFor="founded" className="block text-sm font-medium text-gray-700">Year Founded</label>
                      <Input id="founded" type="number" className="mt-1" min="1900" max={new Date().getFullYear()} />
                    </div>
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
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-bcircle-blue hover:text-bcircle-blue/80"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="h-4 w-4 text-bcircle-blue focus:ring-bcircle-blue border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                      I agree to the{' '}
                      <Link to="/terms-of-service" className="text-bcircle-blue hover:text-bcircle-blue/80">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy-policy" className="text-bcircle-blue hover:text-bcircle-blue/80">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button onClick={prevStep} variant="outline" className="border-bcircle-blue text-bcircle-blue hover:bg-bcircle-blue/10">
                    Previous
                  </Button>
                  <Button type="submit" className="bg-bcircle-orange hover:bg-bcircle-orange/90">
                    Complete Registration
                  </Button>
                </div>
              </form>
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
