
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
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full">
        <div className="h-56 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10"></div>
          <img 
            src={business.imageUrl} 
            alt={business.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Content overlay on the image */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
            <h3 className="font-semibold text-lg mb-1">{business.name}</h3>
            <p className="text-sm text-white/90 line-clamp-2">{business.description}</p>
          </div>
        </div>
        
        <div className="p-4 bg-white">
          <div className="flex justify-between items-center">
            <span className="text-sm bg-bcircle-blue/10 text-bcircle-blue px-2 py-0.5 rounded-md">{business.category}</span>
            <span className="text-bcircle-blue text-sm group-hover:underline">View Details</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RelatedBusinesses;
