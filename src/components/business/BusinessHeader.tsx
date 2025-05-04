
import React from 'react';
import { ArrowLeft, MapPin, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Business } from '@/data/businessData';

interface BusinessHeaderProps {
  business: Business;
}

const BusinessHeader: React.FC<BusinessHeaderProps> = ({ business }) => {
  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(business.rating);
    const hasHalfStar = business.rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-bcircle-orange text-bcircle-orange" />);
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="relative">
          <Star className="h-4 w-4 text-bcircle-orange" />
          <Star className="absolute top-0 left-0 h-4 w-4 fill-bcircle-orange text-bcircle-orange overflow-hidden" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </span>
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-64 md:h-80 w-full overflow-hidden">
        <img
          src={business.coverImage}
          alt={`${business.name} cover`}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Business Header Content */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-16 md:-mt-24 mb-8">
          <div className="bg-white rounded-md p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center">
              {/* Back Button */}
              <Link to="/businesses" className="absolute top-6 left-6 flex items-center text-sm text-bcircle-blue hover:text-bcircle-orange transition-colors">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Businesses
              </Link>
              
              {/* Logo */}
              <div className="flex-shrink-0 md:mr-6 mb-4 md:mb-0">
                <div className="h-20 w-20 rounded-md overflow-hidden border border-gray-100 shadow-sm">
                  <img
                    src={business.logo}
                    alt={`${business.name} logo`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              
              {/* Business Info */}
              <div className="flex-grow">
                <div className="flex items-center mb-1">
                  <h1 className="text-2xl font-montserrat font-semibold text-bcircle-blue mr-2">
                    {business.name}
                  </h1>
                  {business.verified && (
                    <div className="flex items-center text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </div>
                  )}
                </div>
                
                <p className="text-bcircle-orange font-medium mb-2">{business.category}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 mb-3">
                  <div className="flex items-center mb-2 sm:mb-0 sm:mr-4">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    {business.location}
                  </div>
                  <div className="flex items-center">
                    <div className="flex mr-1">
                      {renderStars()}
                    </div>
                    <span className="text-gray-500">{business.rating} ({business.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 italic">
                  {business.tagline || business.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessHeader;
