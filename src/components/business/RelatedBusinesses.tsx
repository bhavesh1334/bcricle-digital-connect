
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { businessData, Business } from '@/data/businessData';

interface RelatedBusinessesProps {
  currentCategory: string;
  currentId: number;
}

const RelatedBusinesses: React.FC<RelatedBusinessesProps> = ({ currentCategory, currentId }) => {
  // Find related businesses in the same category, excluding the current business
  const relatedBusinesses = businessData
    .filter(business => business.category === currentCategory && business.id !== currentId)
    .slice(0, 3);
  
  if (relatedBusinesses.length === 0) return null;
  
  return (
    <div className="bg-white rounded-md p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-montserrat font-semibold">Related Businesses</h2>
        <Link 
          to={`/categories?category=${encodeURIComponent(currentCategory)}`} 
          className="text-sm text-bcircle-blue hover:text-bcircle-orange flex items-center"
        >
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedBusinesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    </div>
  );
};

const BusinessCard: React.FC<{ business: Business }> = ({ business }) => {
  return (
    <Link to={`/business/${business.slug}`} className="block group">
      <div className="bg-white border border-transparent rounded-md overflow-hidden shadow-sm group-hover:shadow-md group-hover:border-gray-100 transition-all">
        <div className="h-40 overflow-hidden">
          <img 
            src={business.imageUrl} 
            alt={business.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium mb-1 group-hover:text-bcircle-blue transition-colors">{business.name}</h3>
          <p className="text-xs text-bcircle-orange mb-2">{business.category}</p>
          <p className="text-sm text-gray-600 line-clamp-2">{business.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default RelatedBusinesses;
