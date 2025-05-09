
import React from 'react';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CompleteRegistration = () => {
  const { step, form2, form3, isLoading, nextStep, prevStep, onSubmit } = useRegisterForm();

  return (
    <div className='container mx-auto mt-10'>
      <h1 className='text-3xl font-bold text-center mb-8'>Complete Your Registration</h1>
      {step === 2 && (
        <form onSubmit={form2.handleSubmit(nextStep)} className='max-w-md mx-auto'>
          <div className='mb-4'>
            <Label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='businessName'>
              Business Name
            </Label>
            <Input
              {...form2.register('businessName')}
              type='text'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='businessName'
              placeholder='Enter your business name'
            />
            {form2.formState.errors.businessName && (
              <p className='text-red-500 text-xs italic'>{form2.formState.errors.businessName.message?.toString()}</p>
            )}
          </div>
          <div className='mb-4'>
             <Label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='category'>
               Category
             </Label>
             <Input
               {...form2.register('category')}
               type='text'
               className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
               id='category'
               placeholder='Enter your business category'
             />
             {form2.formState.errors.category && (
               <p className='text-red-500 text-xs italic'>{form2.formState.errors.category.message?.toString()}</p>
             )}
          </div>
          <div className='mb-4'>
             <Label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='address'>
               Address
             </Label>
             <Input
               {...form2.register('address')}
               type='text'
               className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
               id='address'
               placeholder='Enter your business address'
             />
             {form2.formState.errors.address && (
               <p className='text-red-500 text-xs italic'>{form2.formState.errors.address.message?.toString()}</p>
             )}
          </div>
          <div className='mb-4'>
             <Label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='city'>
               City
             </Label>
             <Input
               {...form2.register('city')}
               type='text'
               className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
               id='city'
               placeholder='Enter your city'
             />
             {form2.formState.errors.city && (
               <p className='text-red-500 text-xs italic'>{form2.formState.errors.city.message?.toString()}</p>
             )}
          </div>
          <div className='mb-4'>
             <Label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='state'>
               State
             </Label>
             <Input
               {...form2.register('state')}
               type='text'
               className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
               id='state'
               placeholder='Enter your state'
             />
             {form2.formState.errors.state && (
               <p className='text-red-500 text-xs italic'>{form2.formState.errors.state.message?.toString()}</p>
             )}
          </div>
          <div className='mb-4'>
             <Label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='pincode'>
               Pincode
             </Label>
             <Input
               {...form2.register('pincode')}
               type='text'
               className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
               id='pincode'
               placeholder='Enter your pincode'
             />
             {form2.formState.errors.pincode && (
               <p className='text-red-500 text-xs italic'>{form2.formState.errors.pincode.message?.toString()}</p>
             )}
          </div>
          <Button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            {isLoading ? 'Loading...' : 'Next'}
          </Button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={form3.handleSubmit(onSubmit)} className='max-w-md mx-auto'>
          <div className='mb-4'>
            <Label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
              Description
            </Label>
            <textarea
              {...form3.register('description')}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='description'
              placeholder='Enter your description'
            />
            {form3.formState.errors.description && (
              <p className='text-red-500 text-xs italic'>{form3.formState.errors.description.message?.toString()}</p>
            )}
          </div>
          <div className='mb-4'>
              <Label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='instagramLink'>
                Instagram Link
              </Label>
              <Input
                {...form3.register('instagramLink')}
                type='text'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='instagramLink'
                placeholder='Enter your instagram link'
              />
              {form3.formState.errors.instagramLink && (
                <p className='text-red-500 text-xs italic'>{form3.formState.errors.instagramLink.message?.toString()}</p>
              )}
           </div>
           <div className='mb-4'>
              <Label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='website'>
                Website
              </Label>
              <Input
                {...form3.register('website')}
                type='text'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='website'
                placeholder='Enter your website'
              />
              {form3.formState.errors.website && (
                <p className='text-red-500 text-xs italic'>{form3.formState.errors.website.message?.toString()}</p>
              )}
           </div>
           <div className='mb-4'>
              <Label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='whatsapp'>
                Whatsapp
              </Label>
              <Input
                {...form3.register('whatsapp')}
                type='text'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='whatsapp'
                placeholder='Enter your whatsapp number'
              />
              {form3.formState.errors.whatsapp && (
                <p className='text-red-500 text-xs italic'>{form3.formState.errors.whatsapp.message?.toString()}</p>
              )}
           </div>
           <div className='mb-4'>
              <Label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='founded'>
                Founded
              </Label>
              <Input
                {...form3.register('founded')}
                type='text'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='founded'
                placeholder='Enter when was your business founded'
              />
              {form3.formState.errors.founded && (
                <p className='text-red-500 text-xs italic'>{form3.formState.errors.founded.message?.toString()}</p>
              )}
           </div>
           <div className='mb-4'>
              <Label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='logo'>
                Logo
              </Label>
              <Input
                {...form3.register('logo')}
                type='file'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='logo'
              />
              {form3.formState.errors.logo && (
                <p className='text-red-500 text-xs italic'>{form3.formState.errors.logo.message?.toString()}</p>
              )}
           </div>
           <div className='mb-4'>
              <Label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='coverImage'>
                Cover Image
              </Label>
              <Input
                {...form3.register('coverImage')}
                type='file'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='coverImage'
              />
              {form3.formState.errors.coverImage && (
                <p className='text-red-500 text-xs italic'>{form3.formState.errors.coverImage.message?.toString()}</p>
              )}
           </div>
           <div className='mb-4'>
              <Label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='businessPhotos'>
                Business Photos
              </Label>
              <Input
                {...form3.register('businessPhotos')}
                type='file'
                multiple
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='businessPhotos'
              />
              {form3.formState.errors.businessPhotos && (
                <p className='text-red-500 text-xs italic'>{form3.formState.errors.businessPhotos.message?.toString()}</p>
              )}
           </div>
           <div className='mb-4'>
              <Label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='termsAgreed'>
                Terms Agreed
              </Label>
              <Input
                {...form3.register('termsAgreed')}
                type='checkbox'
                className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='termsAgreed'
              />
              {form3.formState.errors.termsAgreed && (
                <p className='text-red-500 text-xs italic'>{form3.formState.errors.termsAgreed.message?.toString()}</p>
              )}
           </div>
          <div className='flex justify-between'>
            <Button
              onClick={prevStep}
              type='button'
              className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Previous
            </Button>
            <Button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              {isLoading ? 'Loading...' : 'Submit'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CompleteRegistration;
