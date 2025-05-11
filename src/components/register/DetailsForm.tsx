import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { X, Upload } from 'lucide-react';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { DetailsFormData } from '@/schemas/registerSchema';
import { UseFormReturn } from 'react-hook-form';

interface DetailsFormProps {
  form: UseFormReturn<DetailsFormData>;
  onSubmit: () => void;
  onPrev: () => void;
  isLoading: boolean;
}

const DetailsForm: React.FC<DetailsFormProps> = ({ form, onSubmit, onPrev, isLoading }) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('logo', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cover image upload
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('coverImage', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle business photos upload
  const handlePhotosUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      const newPhotos = Array.from(files);
      const currentPhotos = form.getValues('businessPhotos') || [];
      
      // Limit to 6 photos total
      const combinedPhotos = [...currentPhotos, ...newPhotos].slice(0, 6);
      form.setValue('businessPhotos', combinedPhotos);
      
      // Generate previews for all photos
      const newPreviews: string[] = [];
      combinedPhotos.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === combinedPhotos.length) {
            setPhotoPreviews(newPreviews);
          }
        };
        reader.readAsDataURL(file as File);
      });
    }
  };

  // Remove a photo from the selection
  const removePhoto = (index: number) => {
    const currentPhotos = form.getValues('businessPhotos') || [];
    const updatedPhotos = [...currentPhotos];
    updatedPhotos.splice(index, 1);
    form.setValue('businessPhotos', updatedPhotos);
    
    const updatedPreviews = [...photoPreviews];
    updatedPreviews.splice(index, 1);
    setPhotoPreviews(updatedPreviews);
  };

  // Remove logo
  const removeLogo = () => {
    form.setValue('logo', undefined);
    setLogoPreview(null);
  };

  // Remove cover image
  const removeCover = () => {
    form.setValue('coverImage', undefined);
    setCoverPreview(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
              control={form.control}
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
              control={form.control}
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
          
          {/* Logo Upload with Preview */}
          <div>
            <FormLabel className="block text-sm font-medium text-gray-700 mb-2">Business Logo (Optional)</FormLabel>
            <div className="mt-1 flex flex-col space-y-4">
              {logoPreview ? (
                <div className="relative w-40 h-40 border rounded-md overflow-hidden">
                  <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 h-6 w-6" 
                    onClick={removeLogo}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="logo-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-bcircle-blue hover:text-bcircle-blue/80"
                      >
                        <span>Upload a file</span>
                        <input 
                          id="logo-upload" 
                          name="logo-upload" 
                          type="file" 
                          className="sr-only"
                          accept="image/*"
                          onChange={handleLogoUpload} 
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Cover Image Upload with Preview */}
          <div>
            <FormLabel className="block text-sm font-medium text-gray-700 mb-2">Business Cover Image (Optional)</FormLabel>
            <div className="mt-1 flex flex-col space-y-4">
              {coverPreview ? (
                <div className="relative w-full h-40 border rounded-md overflow-hidden">
                  <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 h-6 w-6" 
                    onClick={removeCover}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="cover-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-bcircle-blue hover:text-bcircle-blue/80"
                      >
                        <span>Upload a file</span>
                        <input 
                          id="cover-upload" 
                          name="cover-upload" 
                          type="file" 
                          className="sr-only"
                          accept="image/*"
                          onChange={handleCoverUpload} 
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Business Photos Upload with Preview */}
          <div>
            <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
              Business Photos (Optional, Max 6)
              {photoPreviews.length > 0 && 
                <span className="ml-2 text-xs text-gray-500">
                  {photoPreviews.length}/6 uploaded
                </span>
              }
            </FormLabel>
            <div className="mt-1 space-y-4">
              {photoPreviews.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {photoPreviews.map((preview, index) => (
                    <div key={index} className="relative h-40 border rounded-md overflow-hidden">
                      <img src={preview} alt={`Business photo ${index + 1}`} className="w-full h-full object-cover" />
                      <Button 
                        type="button" 
                        variant="destructive" 
                        size="icon" 
                        className="absolute top-2 right-2 h-6 w-6" 
                        onClick={() => removePhoto(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  {photoPreviews.length < 6 && (
                    <div className="h-40 flex items-center justify-center border-2 border-gray-300 border-dashed rounded-md">
                      <label
                        htmlFor="photos-upload"
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="text-sm text-gray-500">Add more</span>
                        <input 
                          id="photos-upload" 
                          name="photos-upload" 
                          type="file" 
                          className="sr-only" 
                          accept="image/*"
                          multiple 
                          onChange={handlePhotosUpload}
                        />
                      </label>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="photos-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-bcircle-blue hover:text-bcircle-blue/80"
                      >
                        <span>Upload files</span>
                        <input 
                          id="photos-upload" 
                          name="photos-upload" 
                          type="file" 
                          className="sr-only" 
                          accept="image/*"
                          multiple 
                          onChange={handlePhotosUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB each</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Terms & Conditions Summary Box */}
          <div className="rounded-xl p-6 mb-6 max-h-64 overflow-y-auto shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Terms & Conditions:</h3>
            <hr className="mb-4 border-gray-300" />
            <ul className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
              <li>Membership is open to businesses, professionals, and freelancers in or linked to Chhattisgarh.</li>
              <li>Annual membership fee is ₹10,000, non-refundable and non-transferable.</li>
              <li>CBN creates your business profile, which you can later edit and manage.</li>
              <li>Members must provide accurate and legal business information.</li>
              <li>Platform is for networking, not for spam, fraud, or misuse.</li>
              <li>CBN may use your content for listings and promotional purposes.</li>
              <li>Members must maintain professional conduct at all times.</li>
              <li>Misuse or misconduct may lead to membership suspension or termination.</li>
              <li>Your data is kept private and only shared with trusted partners when needed.</li>
              <li>Features, pricing, or terms may change with prior notice.</li>
              <li>CBN is not liable for any losses or disputes between members.</li>
              <li>Legal matters fall under the jurisdiction of courts in Raipur, Chhattisgarh.</li>
            </ul>
          </div>

          <FormField
            control={form.control}
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
            onClick={onPrev} 
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
  );
};

export default DetailsForm;
