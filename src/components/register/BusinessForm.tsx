
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { BusinessFormData } from '@/schemas/registerSchema';
import { UseFormReturn } from 'react-hook-form';

interface BusinessFormProps {
  form: UseFormReturn<BusinessFormData>;
  onNext: () => void;
  onPrev: () => void;
}

const BusinessForm: React.FC<BusinessFormProps> = ({ form, onNext, onPrev }) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
          <Button type="button" onClick={onPrev} variant="outline" className="border-bcircle-blue text-bcircle-blue hover:bg-bcircle-blue/10">
            Previous
          </Button>
          <Button type="submit" className="bg-bcircle-blue hover:bg-bcircle-blue/90">
            Next Step
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BusinessForm;
