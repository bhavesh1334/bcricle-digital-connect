
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Phone, Filter, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdSlider from '@/components/common/AdSlider';

const BusinessDirectory = () => {
  const [filter, setFilter] = useState({
    category: '',
    location: '',
    rating: 0
  });

  // Mock data for businesses
  const businesses = [
    {
      id: 1,
      name: 'TechSphere Solutions',
      category: 'Web Development & IT',
      rating: 4.8,
      reviewCount: 47,
      location: 'Civil Lines, Raipur',
      description: 'Professional web development, app development, and IT consulting services for businesses of all sizes.',
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
      description: 'Comprehensive accounting, taxation, and financial consultation services for businesses and individuals.',
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
      description: 'Result-oriented digital marketing, SEO, social media management, and online advertising services.',
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
      description: 'Premium residential and commercial properties across Raipur. Construction, sale, and property management.',
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
      description: 'Comprehensive healthcare services with specialized departments and cutting-edge medical technology.',
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
      description: 'Creative interior design solutions for residential and commercial spaces. Quality craftsmanship guaranteed.',
      imageUrl: 'https://images.unsplash.com/photo-1595514535215-9a5e23f712ad',
      slug: 'spaceworks-interiors'
    }
  ];

  // Mock data for ad slider
  const adSlides = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
      alt: 'Premium Office Space for Rent',
      targetUrl: '#ad1'
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7',
      alt: 'Business Conference 2023',
      targetUrl: '#ad2'
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      alt: 'Digital Marketing Services',
      targetUrl: '#ad3'
    },
    {
      id: 4,
      imageUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6',
      alt: 'Financial Services',
      targetUrl: '#ad4'
    },
    {
      id: 5,
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
      alt: 'IT Consulting',
      targetUrl: '#ad5'
    }
  ];

  // Generate stars based on rating
  const renderStars = (rating: number) => {
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
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-bcircle-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 animate-fade-in">
              Explore Raipur's Businesses
            </h1>
            <p className="text-xl max-w-2xl mx-auto text-white/80 animate-slide-up">
              Discover and connect with the best local businesses in your area
            </p>
            
            {/* Search Bar */}
            <div className="mt-10 bg-white/10 backdrop-blur-md rounded-lg p-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5" />
                  <Input 
                    type="search" 
                    placeholder="Search businesses, services..." 
                    className="pl-10 pr-4 w-full bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-white"
                  />
                </div>
                <Button className="bg-bcircle-orange hover:bg-bcircle-orange/90 text-white">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtering and Business Listings */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-border p-6 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-montserrat font-semibold text-lg">Filters</h2>
                  <Filter className="h-5 w-5 text-muted-foreground" />
                </div>
                
                <div className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Category</h3>
                    <select
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-bcircle-blue focus:ring-bcircle-blue sm:text-sm h-10 px-3 py-2 bg-white border"
                      value={filter.category}
                      onChange={(e) => setFilter({...filter, category: e.target.value})}
                    >
                      <option value="">All Categories</option>
                      <option value="web-development">Web Development & IT</option>
                      <option value="accounting">Accounting Services</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="real-estate">Real Estate & Builders</option>
                      <option value="healthcare">Healthcare Services</option>
                      <option value="interior-design">Interior Design</option>
                    </select>
                  </div>
                  
                  {/* Location Filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Location</h3>
                    <select
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-bcircle-blue focus:ring-bcircle-blue sm:text-sm h-10 px-3 py-2 bg-white border"
                      value={filter.location}
                      onChange={(e) => setFilter({...filter, location: e.target.value})}
                    >
                      <option value="">All Locations</option>
                      <option value="civil-lines">Civil Lines</option>
                      <option value="shyam-nagar">Shyam Nagar</option>
                      <option value="samta-colony">Samta Colony</option>
                      <option value="shankar-nagar">Shankar Nagar</option>
                      <option value="devendra-nagar">Devendra Nagar</option>
                      <option value="tatibandh">Tatibandh</option>
                    </select>
                  </div>
                  
                  {/* Rating Filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Rating</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="rating" value="0" checked={filter.rating === 0} onChange={() => setFilter({...filter, rating: 0})} className="mr-2" />
                        <span>All Ratings</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="rating" value="4" checked={filter.rating === 4} onChange={() => setFilter({...filter, rating: 4})} className="mr-2" />
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-bcircle-orange text-bcircle-orange" />
                          <Star className="h-4 w-4 fill-bcircle-orange text-bcircle-orange" />
                          <Star className="h-4 w-4 fill-bcircle-orange text-bcircle-orange" />
                          <Star className="h-4 w-4 fill-bcircle-orange text-bcircle-orange" />
                          <Star className="h-4 w-4 text-gray-300" />
                          <span className="ml-1">& up</span>
                        </div>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="rating" value="3" checked={filter.rating === 3} onChange={() => setFilter({...filter, rating: 3})} className="mr-2" />
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-bcircle-orange text-bcircle-orange" />
                          <Star className="h-4 w-4 fill-bcircle-orange text-bcircle-orange" />
                          <Star className="h-4 w-4 fill-bcircle-orange text-bcircle-orange" />
                          <Star className="h-4 w-4 text-gray-300" />
                          <Star className="h-4 w-4 text-gray-300" />
                          <span className="ml-1">& up</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  {/* Verified Filter */}
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Verified Businesses Only</span>
                    </label>
                  </div>
                  
                  <Button className="w-full bg-bcircle-blue hover:bg-bcircle-blue/90">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Business Listings */}
            <div className="lg:col-span-3">
              {/* Ad Slider */}
              <div className="mb-6">
                <AdSlider slides={adSlides} size="medium" />
              </div>
              
              <div className="space-y-6">
                {businesses.map((business) => (
                  <div key={business.id} className="bg-white rounded-lg border border-border overflow-hidden shadow-sm hover-lift">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 relative">
                        <img 
                          src={business.imageUrl} 
                          alt={business.name}
                          className="w-full h-48 md:h-full object-cover"
                        />
                        {business.verified && (
                          <div className="absolute top-2 left-2 bg-bcircle-blue text-white text-xs px-2 py-1 rounded-full">
                            Verified
                          </div>
                        )}
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-montserrat font-semibold text-xl text-bcircle-blue">{business.name}</h3>
                          <div className="flex items-center space-x-1">
                            {renderStars(business.rating)}
                            <span className="text-sm text-muted-foreground ml-1">({business.reviewCount})</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-bcircle-orange font-medium mb-2">{business.category}</p>
                        
                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span>{business.location}</span>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-2">{business.description}</p>
                        
                        <div className="flex flex-wrap gap-3">
                          <Button asChild variant="default" size="sm" className="bg-bcircle-blue hover:bg-bcircle-blue/90">
                            <Link to={`/business/${business.slug}`}>View Details</Link>
                          </Button>
                          <Button asChild variant="outline" size="sm">
                            <a href={`tel:+1234567890`}>
                              <Phone className="h-4 w-4 mr-1" />
                              Call Now
                            </a>
                          </Button>
                          <Button asChild variant="outline" size="sm" className="bg-green-500 text-white hover:bg-green-600 border-0">
                            <a href={`https://wa.me/911234567890`} target="_blank" rel="noopener noreferrer">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                              </svg>
                              WhatsApp
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <nav className="inline-flex rounded-md shadow">
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 bg-bcircle-blue text-sm font-medium text-white"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    3
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Next
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Action Buttons */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-bcircle-blue/5 rounded-lg border border-bcircle-blue/20 p-6 text-center">
              <h3 className="font-montserrat font-semibold text-xl mb-4 text-bcircle-blue">Own a Business?</h3>
              <p className="text-muted-foreground mb-6">List your business on CBN and get discovered by potential customers in Raipur.</p>
              <Button asChild className="bg-bcircle-blue hover:bg-bcircle-blue/90">
                <Link to="/register">List Your Business</Link>
              </Button>
            </div>
            
            <div className="bg-bcircle-orange/5 rounded-lg border border-bcircle-orange/20 p-6 text-center">
              <h3 className="font-montserrat font-semibold text-xl mb-4 text-bcircle-orange">Is This Your Business?</h3>
              <p className="text-muted-foreground mb-6">Claim and verify your business listing to update information and respond to reviews.</p>
              <Button asChild className="bg-bcircle-orange hover:bg-bcircle-orange/90 text-white">
                <Link to="/claim-business">Claim This Listing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default BusinessDirectory;
