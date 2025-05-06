
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedBusinesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    </div>
  );
};

const BusinessCard: React.FC<{ business: Business }> = ({ business }) => {
  return (
    <Link to={`/business/${business.slug}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="h-48 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 z-10 transition-opacity"></div>
          <img 
            src={business.imageUrl} 
            alt={business.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-bcircle-blue transition-colors">{business.name}</h3>
          <p className="text-sm bg-bcircle-blue/10 text-bcircle-blue px-2 py-0.5 rounded-md inline-block mb-3 w-fit">{business.category}</p>
          <p className="text-gray-600 text-sm flex-grow">{business.description}</p>
          
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <div className="text-sm text-gray-500">{business.location}</div>
            <span className="text-bcircle-blue font-medium text-sm group-hover:underline">View Details</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RelatedBusinesses;
