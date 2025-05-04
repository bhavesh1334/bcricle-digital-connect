
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import BusinessHeader from '@/components/business/BusinessHeader';
import BusinessInfo from '@/components/business/BusinessInfo';
import BusinessGallery from '@/components/business/BusinessGallery';
import BusinessOwner from '@/components/business/BusinessOwner';
import BusinessServices from '@/components/business/BusinessServices';
import BusinessReviews from '@/components/business/BusinessReviews';
import BusinessContact from '@/components/business/BusinessContact';
import RelatedBusinesses from '@/components/business/RelatedBusinesses';
import { businessData } from '@/data/businessData';

const BusinessDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Find the business by slug or show fallback content
  const business = businessData.find(b => b.slug === slug) || businessData[0];
  
  return (
    <MainLayout>
      <div className="bg-white min-h-screen">
        <BusinessHeader business={business} />
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <BusinessInfo business={business} />
              <BusinessGallery images={business.gallery} />
              <BusinessServices services={business.services} />
              <BusinessReviews reviews={business.reviews} />
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              <BusinessOwner owner={business.owner} />
              <BusinessContact business={business} />
            </div>
          </div>
          
          <div className="mt-16">
            <RelatedBusinesses 
              currentCategory={business.category} 
              currentId={business.id} 
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BusinessDetails;
