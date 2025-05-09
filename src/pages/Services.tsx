
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Briefcase, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
}

// Sample services data (in a real app, this would come from the database)
const sampleServices: Service[] = [
  {
    id: '1',
    name: 'Web Development',
    description: 'Professional website design and development services for businesses of all sizes.',
    category: 'web-development',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072'
  },
  {
    id: '2',
    name: 'Digital Marketing',
    description: 'Comprehensive digital marketing solutions to grow your online presence.',
    category: 'marketing',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015'
  },
  {
    id: '3',
    name: 'Accounting Services',
    description: 'Professional accounting and bookkeeping services for small to medium businesses.',
    category: 'accounting',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011'
  },
  {
    id: '4',
    name: 'Real Estate Consulting',
    description: 'Expert guidance on property investments and real estate development.',
    category: 'real-estate',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973'
  },
  {
    id: '5',
    name: 'Healthcare Services',
    description: 'Quality healthcare services for individuals and families.',
    category: 'healthcare',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=1974'
  },
  {
    id: '6',
    name: 'Event Management',
    description: 'Professional event planning and management services for all occasions.',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=1974'
  }
];

const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'web-development', name: 'Web Development' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'accounting', name: 'Accounting' },
  { id: 'real-estate', name: 'Real Estate' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'events', name: 'Events' }
];

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const { data, error } = await supabase
          .from('businesses')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setBusinesses(data || []);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBusinesses();
  }, []);
  
  // Filter services based on search query and selected category
  const filteredServices = sampleServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <MainLayout>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-bcircle-blue">
              Our Services
            </h1>
            <p className="mt-2 text-gray-600 max-w-3xl mx-auto">
              Discover specialized services offered by local businesses in Chhattisgarh. 
              Find the perfect solution for your business needs.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  type="search" 
                  placeholder="Search services..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button 
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    className={selectedCategory === category.id ? 
                      "bg-bcircle-blue hover:bg-bcircle-blue/90" : 
                      "border-bcircle-blue/20 text-bcircle-blue hover:bg-bcircle-blue/10"}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map(service => (
              <div 
                key={service.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <Briefcase className="mr-1 h-3 w-3" />
                        {categories.find(cat => cat.id === service.category)?.name || service.category}
                      </span>
                    </div>
                    
                    <Link to={`/services/${service.id}`}>
                      <Button variant="outline" size="sm" className="text-bcircle-blue border-bcircle-blue hover:bg-bcircle-blue/10">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Businesses providing services */}
          {businesses.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center mb-8">Businesses Providing These Services</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {businesses.slice(0, 3).map((business) => (
                  <div key={business.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="h-40 bg-gray-200 relative">
                      {business.cover_image ? (
                        <img 
                          src={business.cover_image} 
                          alt={business.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-50">
                          <Building className="h-12 w-12 text-blue-300" />
                        </div>
                      )}
                      
                      {business.logo_url && (
                        <div className="absolute -bottom-6 left-4 h-12 w-12 rounded-full border-2 border-white bg-white overflow-hidden">
                          <img 
                            src={business.logo_url} 
                            alt={`${business.name} logo`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 pt-8">
                      <h3 className="text-lg font-semibold mb-2">{business.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{business.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{business.city}, {business.state}</span>
                        
                        <Link to={`/business/${business.id}`}>
                          <Button size="sm" className="bg-bcircle-blue hover:bg-bcircle-blue/90">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Link to="/businesses">
                  <Button variant="outline" className="border-bcircle-blue text-bcircle-blue hover:bg-bcircle-blue/10">
                    View All Businesses
                  </Button>
                </Link>
              </div>
            </div>
          )}
          
          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-bcircle-blue to-blue-500 rounded-xl overflow-hidden shadow-md">
            <div className="p-8 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">List Your Business Services</h2>
              <p className="max-w-2xl mx-auto mb-6">
                Join our business network to showcase your services to potential customers and grow your business.
              </p>
              <Link to="/register">
                <Button size="lg" variant="secondary" className="bg-white text-bcircle-blue hover:bg-gray-100">
                  Complete Your Registration
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Services;
