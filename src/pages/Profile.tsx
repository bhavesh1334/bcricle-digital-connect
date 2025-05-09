
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Building, Mail, Phone, User, Briefcase, Upload, Camera, Image } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  city: string;
  state: string;
  whatsapp: string;
  logo_url: string | null;
  cover_image: string | null;
}

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfileAndBusiness = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Fetch business details
        const { data: businessData, error: businessError } = await supabase
          .from('businesses')
          .select('*')
          .eq('owner_id', user.id)
          .maybeSingle();

        if (!businessError) {
          setBusiness(businessData);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileAndBusiness();
  }, [user]);

  const handleUploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return;
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "You must be logged in to update your profile image."
      });
      return;
    }

    const file = event.target.files[0];
    const fileSize = file.size / 1024 / 1024; // in MB
    
    // Validate file size (max 2MB)
    if (fileSize > 2) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please select an image smaller than 2MB."
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please select an image file."
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('profile-avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL of the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('profile-avatars')
        .getPublicUrl(filePath);

      // Update user profile with the new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Update local profile state
      setProfile(prev => ({ ...prev, avatar_url: publicUrl }));

      toast({
        title: "Profile updated",
        description: "Your profile image has been updated successfully."
      });
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message || "An error occurred during the upload."
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="container mx-auto py-16 px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Please Sign In</h1>
            <p className="mb-6">You need to be logged in to view your profile</p>
            <Link to="/login">
              <Button className="bg-bcircle-blue hover:bg-bcircle-blue/90">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const getInitials = () => {
    if (profile) {
      return `${profile.first_name?.charAt(0) || ''}${profile.last_name?.charAt(0) || ''}`.toUpperCase();
    }
    return user.email?.charAt(0).toUpperCase() || '?';
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-bcircle-blue to-blue-500 text-white p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-4 border-white">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="bg-white text-bcircle-blue text-2xl font-bold">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                
                <button 
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 bg-white text-bcircle-blue p-1.5 rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
                  disabled={isUploading}
                  aria-label="Change profile picture"
                >
                  {isUploading ? (
                    <div className="h-5 w-5 border-2 border-bcircle-blue border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Camera className="h-5 w-5" />
                  )}
                </button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUploadAvatar}
                  disabled={isUploading}
                />
              </div>
              
              <div className="text-center md:text-left">
                {isLoading ? (
                  <>
                    <Skeleton className="h-8 w-48 bg-white/20 mb-2" />
                    <Skeleton className="h-5 w-32 bg-white/20" />
                  </>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold">
                      {profile?.first_name || ''} {profile?.last_name || ''}
                    </h1>
                    <p className="text-lg opacity-90">
                      {profile?.designation || 'Business Member'}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <User className="mr-2 h-5 w-5" /> Personal Information
                </h2>
                
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-gray-500" />
                        {user.email}
                      </p>
                    </div>
                    
                    {profile?.phone && (
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-gray-500" />
                          {profile.phone}
                        </p>
                      </div>
                    )}
                    
                    {profile?.designation && (
                      <div>
                        <p className="text-sm text-gray-500">Designation</p>
                        <p className="flex items-center">
                          <Briefcase className="mr-2 h-4 w-4 text-gray-500" />
                          {profile.designation}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Business Information */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Building className="mr-2 h-5 w-5" /> Business Information
                </h2>
                
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                ) : business ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Business Name</p>
                      <p className="font-medium">{business.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p>{business.category}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p>{business.city}, {business.state}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Description</p>
                      <p className="line-clamp-3">{business.description}</p>
                    </div>
                    
                    <div className="pt-2">
                      <Link to={`/business/${business.id}`}>
                        <Button variant="outline" className="text-bcircle-blue border-bcircle-blue hover:bg-bcircle-blue/10">
                          View Business Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
                    <h3 className="font-semibold text-blue-800 mb-2">No Business Registered Yet</h3>
                    <p className="text-blue-700 mb-4">Complete your business registration to join our network and grow your business.</p>
                    <Link to="/complete-registration">
                      <Button className="bg-bcircle-blue hover:bg-bcircle-blue/90">
                        Complete Registration
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
