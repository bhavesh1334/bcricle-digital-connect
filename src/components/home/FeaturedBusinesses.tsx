import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import BusinessCard, { Business } from '@/components/common/BusinessCard';

const FeaturedBusinesses = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBusinesses = async () => {
      try {
        const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('payment_status', 'DONE')
          .limit(6);
        
        if (error) {
          console.error('Error fetching featured businesses:', error);
          return;
        }

        // Map data to expected shape
        setBusinesses(
          (data as any[]).map((b) => ({
            id: b.id,  
            name: b.name,
            category: b.category,
            address: b.address || b.location || '',
            cover_image: b.cover_image || b.coverImage || b.imageUrl || '',
            logo_url: b.logo_url || b.logo || '',
            description: b.description,
            verified: b.verified,
            whatsapp: b.whatsapp || '',
          }))
        );
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBusinesses();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-2 text-bcircle-blue">
              Featured Businesses
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Discover top-rated businesses in Raipur that are part of the CBN network.
            </p>
          </div>
          <Link to="/businesses" className="mt-4 md:mt-0 inline-flex items-center text-bcircle-blue hover:text-bcircle-orange transition-colors font-medium">
            View All Businesses
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white rounded-xl h-[400px]">
                  <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : businesses.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No featured businesses found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <BusinessCard key={business.id} {...business} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedBusinesses;
