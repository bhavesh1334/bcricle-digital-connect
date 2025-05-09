
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BusinessCardProps {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
  imageUrl: string;
  verified?: boolean;
  slug: string;
  description: string;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  name,
  category,
  rating,
  reviewCount,
  location,
  imageUrl,
  verified = false,
  slug,
  description
}) => {
  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-3 w-3 fill-bcircle-orange text-bcircle-orange" />);
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="relative">
          <Star className="h-3 w-3 text-bcircle-orange" />
          <Star className="absolute top-0 left-0 h-3 w-3 fill-bcircle-orange text-bcircle-orange overflow-hidden" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </span>
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-3 w-3 text-gray-300" />);
    }

    return stars;
  };

  return (
    <Link to={`/business/${slug}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full">
        <div className="h-56 overflow-hidden relative">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10"></div>
          
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {verified && (
            <div className="absolute top-2 right-2 bg-bcircle-blue text-white text-xs px-2 py-1 rounded-full z-20">
              Verified
            </div>
          )}
          
          {/* Content overlay on the image */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
            <h3 className="font-montserrat font-semibold text-lg">{name}</h3>
            <p className="text-sm text-white/90 mb-2 line-clamp-2">{description}</p>
            <div className="flex items-center space-x-1">
              {renderStars()}
              <span className="text-xs text-white/80 ml-1">({reviewCount})</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <span className="text-sm bg-bcircle-blue/10 text-bcircle-blue px-2 py-0.5 rounded-md">{category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const FeaturedBusinesses = () => {
  const businesses = [
    {
      id: 1,
      name: 'TechSphere Solutions',
      category: 'Web Development & IT',
      rating: 4.8,
      reviewCount: 47,
      location: 'Civil Lines, Raipur',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
      description: 'Expert web development and IT solutions for businesses of all sizes.',
      verified: true,
      slug: 'techsphere-solutions'
    },
    {
      id: 2,
      name: 'FinEdge Accounting',
      category: 'Accounting Services',
      rating: 4.6,
      reviewCount: 32,
      location: 'Shyam Nagar, Raipur',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
      description: 'Professional accounting and financial services for startups and enterprises.',
      verified: true,
      slug: 'finedge-accounting'
    },
    {
      id: 3,
      name: 'Digital Boost Marketing',
      category: 'Digital Marketing',
      rating: 4.7,
      reviewCount: 39,
      location: 'Samta Colony, Raipur',
      imageUrl: 'https://images.unsplash.com/photo-1557838923-2985c318be48',
      description: 'Comprehensive digital marketing services to grow your online presence.',
      slug: 'digital-boost-marketing'
    },
    {
      id: 4,
      name: 'Raipur Premier Properties',
      category: 'Real Estate & Builders',
      rating: 4.5,
      reviewCount: 51,
      location: 'Shankar Nagar, Raipur',
      imageUrl: 'https://images.unsplash.com/photo-1626178793926-22b28830aa30',
      description: 'Find your dream property with Raipur's leading real estate experts.',
      verified: true,
      slug: 'raipur-premier-properties'
    },
    {
      id: 5,
      name: 'HealthFirst Clinic',
      category: 'Healthcare Services',
      rating: 4.9,
      reviewCount: 64,
      location: 'Devendra Nagar, Raipur',
      imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d',
      description: 'Quality healthcare services with state-of-the-art medical facilities.',
      verified: true,
      slug: 'healthfirst-clinic'
    },
    {
      id: 6,
      name: 'SpaceWorks Interiors',
      category: 'Interior Design',
      rating: 4.4,
      reviewCount: 28,
      location: 'Tatibandh, Raipur',
      imageUrl: 'https://images.unsplash.com/photo-1595514535215-9a5e23f712ad',
      description: 'Transform your space with our creative and functional interior design solutions.',
      slug: 'spaceworks-interiors'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-2 text-bcircle-blue">
              Featured Businesses
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Discover top-rated businesses in Raipur that are part of the BCIRCLE network.
            </p>
          </div>
          <Link to="/businesses" className="mt-4 md:mt-0 inline-flex items-center text-bcircle-blue hover:text-bcircle-orange transition-colors font-medium">
            View All Businesses
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => (
            <BusinessCard key={business.id} {...business} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBusinesses;
