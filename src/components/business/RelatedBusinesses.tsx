import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BusinessCard, { Business } from '@/components/common/BusinessCard';

interface RelatedBusinessesProps {
  currentCategory: string;
  currentId: string;
  businesses: Business[];
}

const RelatedBusinesses: React.FC<RelatedBusinessesProps> = ({ currentCategory, currentId, businesses }) => {
  // Find related businesses in the same category, excluding the current business
  const relatedBusinesses = businesses
    .filter(business => business.category === currentCategory && business.id !== currentId)
    .slice(0, 3);
  
  if (relatedBusinesses.length === 0) return null;
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-montserrat font-semibold text-gray-800">Related Businesses</h2>
        <Link 
          to={`/categories?category=${encodeURIComponent(currentCategory)}`} 
          className="text-bcircle-blue hover:text-bcircle-orange flex items-center gap-1 font-medium"
        >
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedBusinesses.map((business) => (
          <BusinessCard
            key={business.id}
            id={business.id}
            name={business.name}
            category={business.category}
            address={business.address}
            cover_image={business.cover_image}
            logo_url={business.logo_url}
            description={business.description}
            verified={business.verified}
            whatsapp={business.whatsapp}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedBusinesses;
