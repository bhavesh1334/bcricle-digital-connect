
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
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  name,
  category,
  rating,
  reviewCount,
  location,
  imageUrl,
  verified = false,
  slug
}) => {
  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

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
    <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm hover-lift card-hover">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {verified && (
          <div className="absolute top-2 right-2 bg-bcircle-blue text-white text-xs px-2 py-1 rounded-full">
            Verified
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-montserrat font-semibold text-lg truncate">{name}</h3>
            <p className="text-sm text-muted-foreground">{category}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 mb-3">
          {renderStars()}
          <span className="text-sm text-muted-foreground ml-1">({reviewCount})</span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>
        
        <div className="flex space-x-2">
          <Button asChild variant="default" size="sm" className="flex-1 bg-bcircle-blue hover:bg-bcircle-blue/90">
            <Link to={`/business/${slug}`}>View Details</Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="flex-1">
            <a href={`tel:+1234567890`}>
              <Phone className="h-4 w-4 mr-1" />
              Call
            </a>
          </Button>
        </div>
      </div>
    </div>
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
      imageUrl: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3',
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
              Discover top-rated businesses in Raipur that are part of the CBN network.
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
