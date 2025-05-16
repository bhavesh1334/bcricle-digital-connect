import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import BusinessHeader from '@/components/business/BusinessHeader';
import BusinessInfo from '@/components/business/BusinessInfo';
import BusinessGallery from '@/components/business/BusinessGallery';
import BusinessOwner from '@/components/business/BusinessOwner';
import BusinessServices from '@/components/business/BusinessServices';
import BusinessReviews from '@/components/business/BusinessReviews';
import BusinessContact from '@/components/business/BusinessContact';
import RelatedBusinesses from '@/components/business/RelatedBusinesses';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Business as BusinessType, BusinessOwner as BusinessOwnerType, GalleryImage } from '@/data/businessData';

interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  address: string | null;
  city: string;
  state: string;
  pincode: string | null;
  website: string | null;
  instagram_link: string | null;
  whatsapp: string;
  founded: string | null;
  logo_url: string | null;
  cover_image: string | null;
  owner_id: string;
  verified: boolean | null;
  payment_status: 'PENDING' | 'DONE' | null;
}

interface BusinessPhoto {
  id: string;
  business_id: string;
  photo_url: string;
  created_at: string | null;
}

interface Owner {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  designation: string | null;
  avatar_url: string | null;
  email?: string | null;
}

const BusinessDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<Business | null>(null);
  const [photos, setPhotos] = useState<BusinessPhoto[]>([]);
  const [owner, setOwner] = useState<Owner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(slug,"ID")
  useEffect(() => {
    const fetchBusinessDetails = async () => {
      if (!slug) {
        setError('Business ID is required');
        setIsLoading(false);
        return;
      }

      try {
        // Fetch business details
        const { data: businessData, error: businessError } = await supabase
          .from('businesses')
          .select('*')
          .eq('id', slug)
          .eq('payment_status', 'DONE')
          .single();

        if (businessError) throw businessError;
        if (!businessData) {
          setError('Business not found');
          setIsLoading(false);
          return;
        }
console.log(businessData, "businessData")
        setBusiness(businessData);

        // Fetch business photos
        const { data: photosData, error: photosError } = await supabase
          .from('business_photos')
          .select('*')
          .eq('business_id', slug);

        if (photosError) throw photosError;
        setPhotos(photosData || []);
console.log(photosData,"photosData")
        // Fetch owner details
        const { data: ownerData, error: ownerError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', businessData.owner_id)
          .single();

        if (ownerError) throw ownerError;
        setOwner(ownerData);

      } catch (err) {
        console.error('Error fetching business details:', err);
        setError('Failed to load business details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinessDetails();
  }, [slug]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="bg-gray-50 min-h-screen pb-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <div className="lg:col-span-2 space-y-8">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
              <div className="space-y-8">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !business) {
    return (
      <MainLayout>
        <div className="bg-gray-50 min-h-screen pb-16">
          <div className="container mx-auto px-4 mt-8">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error || 'Business not found'}
              </AlertDescription>
            </Alert>
            <div className="mt-4">
              <button
                onClick={() => navigate(-1)}
                className="text-bcircle-blue hover:text-bcircle-blue/80"
              >
                ← Back 
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Transform database business to component business type
  const transformedBusiness: BusinessType = {
    id: parseInt(business.id),
    name: business.name,
    slug: business.name.toLowerCase().replace(/\s+/g, '-'),
    category: business.category,
    description: business.description,
    longDescription: business.description,
    establishedYear: business.founded ? parseInt(business.founded) : new Date().getFullYear(),
    rating: 0,
    reviewCount: 0,
    verified: business.verified || false,
    featured: false,
    location: `${business.address || ''}, ${business.city}, ${business.state}`,
    imageUrl: business.logo_url || '',
    coverImage: business.cover_image || '',
    logo: business.logo_url || undefined,
    contact: {
      address: business.address || '',
      city: business.city,
      state: business.state,
      zip: business.pincode || '',
      email: '',
      phone: business.whatsapp,
      website: business.website || undefined,
      social: {
        instagram: business.instagram_link || undefined
      }
    },
    owner: {
      id: parseInt(owner?.id || '0'),
      name: `${owner?.first_name || ''} ${owner?.last_name || ''}`.trim(),
      position: owner?.designation || '',
      bio: '',
      imageUrl: owner?.avatar_url || '',
      contact: {
        email: owner?.email || undefined,
        phone: owner?.phone || undefined
      }
    },
    services: [],
    gallery: photos.map((photo, index) => ({
      id: index + 1,
      imageUrl: photo.photo_url,
      caption: `Business Photo ${index + 1}`
    })),
    reviews: []
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen pb-16">
        <BusinessHeader business={transformedBusiness} />
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <BusinessInfo business={transformedBusiness} />
              <BusinessGallery images={transformedBusiness.gallery} />
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {owner && <BusinessOwner owner={transformedBusiness.owner} />}
              <BusinessContact business={transformedBusiness} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BusinessDetails;
