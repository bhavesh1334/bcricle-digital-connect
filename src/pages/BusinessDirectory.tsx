
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom'; // Import Link
import { Search, MapPin, Phone, Filter } from 'lucide-react';
import AdSlider from '@/components/common/AdSlider';
import { supabase } from '@/integrations/supabase/client';



interface Business {
    address: string | null // This should be location for filtering
    category: string
    city: string | null
    cover_image: string | null // This is image url
    created_at: string | null
    description: string
    founded: string | null
    id: string
    instagram_link: string | null
    logo_url: string | null
    name: string
    owner_id: string | null
    payment_status: string | null
    pincode: string | null
    state: string
    updated_at: string | null
    verified: boolean | null
    website: string | null
    whatsapp: string

}

const BusinessDirectory = () => {
  const [filter, setFilter] = useState({
    category: '',
    location: '',
  });  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  // State for pagination
  const [businessesPerPage] = useState(8); // Display 8 businesses per page

  // Async function to fetch businesses from API
  const fetchBusinessesFromApi = async (): Promise<Business[]> => {
    // Placeholder for API call
    const { data, error } = await supabase.from('businesses').select('*');

    if (error) {
      console.error('Error fetching businesses:', error);
      return [];
    }
    return data as Business[];
  };

  const [allBusinesses, setAllBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    const getBusinesses = async () => {
      const businesses = await fetchBusinessesFromApi();
      setAllBusinesses(businesses);
    }
    getBusinesses();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // Update filtered businesses when allBusinesses, searchTerm, or filter changes
 useEffect(() => {
    let filtered = allBusinesses;

    // Apply search filter
 if (searchTerm) {
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filter.category) {
      filtered = filtered.filter(business => business.category === filter.category);
    }

    // Apply location filter
    if (filter.location) {
      filtered = filtered.filter(business => business.address?.includes(filter.location));
    }

    // Apply verified filter (assuming a checkbox controls this)
    // if (filter.verified) {
    //   filtered = filtered.filter(business => business.verified);
    // }

    setFilteredBusinesses(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [allBusinesses, searchTerm, filter]);

  // Pagination logic
  const indexOfLastBusiness = currentPage * businessesPerPage;
  const indexOfFirstBusiness = indexOfLastBusiness - businessesPerPage;
  const currentBusinesses = filteredBusinesses.slice(indexOfFirstBusiness, indexOfLastBusiness);

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredBusinesses.length / businessesPerPage); i++) { // Calculate total pages and generate numbers
    pageNumbers.push(i);
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <>
      <section className="bg-bcircle-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-bold text-4xl md:text-5xl mb-6 animate-fade-in">
              Explore Raipur's Businesses
            </h1>
            <p className="text-xl max-w-2xl mx-auto text-white/80 animate-slide-up">
              Discover and connect with the best local businesses in your area
            </p>

            {/* Search Bar */}
            <div className="mt-10 bg-white/10 backdrop-blur-md rounded-lg p-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-grow ">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5" />
                  <Input
 type="search"
 placeholder="Search businesses, services..."
 className="pl-10 pr-4 w-full bg-white/20 border-white/30 text-white placeholder:text-white/80 focus:border-white rounded-lg h-12 outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200"
 value={searchTerm}
 onChange={handleSearch}
 />
              </div>
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentBusinesses.map((business: Business) => (
                  <div key={business.id} className="bg-white rounded-lg border border-border overflow-hidden shadow-sm hover-lift">
                    <div className="relative h-40">
                      <img className="w-full h-full object-cover rounded-t-lg"
                        src={business.cover_image}
                        alt={business.name}
                    
                      />
                      {business.verified && (
                        <div className="absolute top-2 left-2 bg-bcircle-blue text-white text-xs px-2 py-1 rounded-full">
                          Verified
                        </div>
                      )}
                    </div>
                    <div className="p-4 space-y-3 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-bcircle-blue text-lg line-clamp-2">{business.name}</h3>
                        </div>
                        
                        <div className="flex items-center text-muted-foreground text-sm line-clamp-1 flex-grow">
                          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span>{business.address}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                          <Button asChild variant="default" size="sm" className="bg-bcircle-blue hover:bg-bcircle-blue/90">
                            <Link to={`/business/${business.id}`}>View Details</Link>
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
                ))}
              </div>
              
              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="sr-only">Previous</span>
                    Previous
                  </button>
                  {pageNumbers.map(number => (
                    <button
 key={number}
                      onClick={() => paginate(number)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium transition-colors ${currentPage === number ? 'bg-bcircle-blue text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                      {number}
                    </button>
                  ))}
                  <button
 onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === pageNumbers.length || pageNumbers.length === 0} // Disable next on last page or if no pages
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
          </div>
       </section>
      </>
    </MainLayout>
  );
};

export default BusinessDirectory;
