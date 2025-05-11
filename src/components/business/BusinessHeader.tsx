import React from 'react';
import { ArrowLeft, MapPin, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Business } from '@/data/businessData';

interface BusinessHeaderProps {
  business: Business;
}

const BusinessHeader: React.FC<BusinessHeaderProps> = ({ business }) => {
  // Generate stars based on rating


  return (
    <div className="relative">
      {/* Cover Image with Overlay */}
      <div className="h-72 md:h-96 w-full overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10"></div>
        <img
          src={business.coverImage}
          alt={`${business.name} cover`}
          className="w-full h-full object-cover"
        />
        
        {/* Back Button - Positioned on top of the image */}
        <div className="absolute top-6 left-6 z-20">
          <Link 
            to="/businesses" 
            className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-md text-bcircle-blue hover:bg-white transition-all shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium capitalize">Back</span>
          </Link>
        </div>
        
        {/* Verification Badge - Shown on top of the image */}
        {business.verified && (
          <div className="absolute top-6 right-6 z-20 flex items-center gap-1.5 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-md shadow-md">
            <CheckCircle className="h-4 w-4" />
            <span className="text-xs font-medium capitalize">Verified</span>
          </div>
        )}
      </div>
      
      {/* Business Header Content */}
      <div className="container mx-auto px-4 -mt-24 relative z-20">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Logo */}
            
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-lg overflow-hidden border-4 border-white shadow-md bg-white">
              {business.logo ? (
                  <img
                    src={business.logo}
                    alt={`${business.name} logo`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-bcircle-blue text-white text-2xl font-bold">
                    {business.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
            
            {/* Business Info */}
            <div className="flex-grow">
              <h1 className="text-3xl font-montserrat font-bold text-bcircle-blue capitalize">
                {business.name}
              </h1>
              
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-bcircle-blue/10 text-bcircle-blue px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {business.category}
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 mt-3 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm capitalize">{business.location}</span>
              </div>
              
              <p className="mt-3 text-sm text-gray-600 italic max-w-2xl capitalize">
                {business.tagline || business.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessHeader;
