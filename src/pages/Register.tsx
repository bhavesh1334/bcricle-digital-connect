
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import ProgressSteps from '@/components/register/ProgressSteps';
import AccountForm from '@/components/register/AccountForm';
import BusinessForm from '@/components/register/BusinessForm';
import DetailsForm from '@/components/register/DetailsForm';

const Register = () => {
  const {
    step,
    form1,
    form2,
    form3,
    isLoading,
    nextStep,
    prevStep,
    onSubmit
  } = useRegisterForm();
  
  return (
    <MainLayout>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-montserrat font-bold text-bcircle-blue">Register Your Business</h1>
              <p className="mt-2 text-gray-600">Join Chhattisgarh's premier business network</p>
            </div>
            
            <ProgressSteps currentStep={step} />
            
            {step === 1 && (
              <AccountForm form={form1} onNext={nextStep} />
            )}
            
            {step === 2 && (
              <BusinessForm 
                form={form2} 
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            
            {step === 3 && (
              <DetailsForm 
                form={form3}
                onSubmit={onSubmit}
                onPrev={prevStep}
                isLoading={isLoading}
              />
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
