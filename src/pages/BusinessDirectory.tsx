import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom'; // Import Link
import { Search, MapPin, Phone, Filter, AlertCircle } from 'lucide-react';
import AdSlider from '@/components/common/AdSlider';
import { supabase } from '@/integrations/supabase/client';
import BusinessCard from '@/components/common/BusinessCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
    location: '',
    verified: false,
  });  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [businessesPerPage] = useState(12); // Updated to 12 items per page
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allBusinesses, setAllBusinesses] = useState<Business[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const { id } = useParams<{ id: string }>();

  // Fetch category name when id changes
  useEffect(() => {
    const fetchCategoryName = async () => {
      if (id) {
        try {
          const { data, error } = await supabase
            .from('categories')
            .select('name')
            .eq('id', id)
            .single();

          if (error) throw error;
          setCategoryName(data?.name || '');
        } catch (err) {
          console.error('Error fetching category name:', err);
          setCategoryName('');
        }
      }
    };

    fetchCategoryName();
  }, [id]);

  // Async function to fetch businesses from API
  const fetchBusinessesFromApi = async (): Promise<Business[]> => {
    try {
      const query = supabase
        .from('businesses')
        .select(`
          *,
          categories:category(name)
        `)
        .eq('payment_status', 'DONE');

      if (id) {
        (query as any).eq('category', id);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Transform the data to include category name
      return (data as any[]).map(business => ({
        ...business,
        category: business.categories?.name || business.category
      })) as Business[];
    } catch (err) {
      console.error('Error fetching businesses:', err);
      throw err;
    }
  };

  useEffect(() => {
    const getBusinesses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const businesses = await fetchBusinessesFromApi();
        setAllBusinesses(businesses);
      } catch (err) {
        setError('Failed to load businesses. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    getBusinesses();
  }, [id]); // Re-fetch when category ID changes

  // Update filtered businesses when allBusinesses, searchTerm, or filter changes
  useEffect(() => {
    let filtered = allBusinesses;

    // Apply search filter - search in name and address
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(searchLower) ||
        (business.address?.toLowerCase().includes(searchLower) ?? false) ||
        (business.city?.toLowerCase().includes(searchLower) ?? false) ||
        business.state.toLowerCase().includes(searchLower)
      );
    }

    // Apply location filter
    if (filter.location) {
      filtered = filtered.filter(business => 
        (business.address?.toLowerCase().includes(filter.location.toLowerCase()) ?? false) ||
        (business.city?.toLowerCase().includes(filter.location.toLowerCase()) ?? false) ||
        business.state.toLowerCase().includes(filter.location.toLowerCase())
      );
    }

    // Apply verified filter
    if (filter.verified) {
      filtered = filtered.filter(business => business.verified === true);
    }

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

  // Loading state
  if (isLoading) {
    return (
      <MainLayout>
        <section className="bg-bcircle-blue text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Skeleton className="h-12 w-3/4 mx-auto mb-6 bg-white/20" />
              <Skeleton className="h-6 w-1/2 mx-auto bg-white/20" />
              <div className="mt-10">
                <Skeleton className="h-12 w-full bg-white/20" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Skeleton className="h-[400px] w-full" />
              </div>
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <Skeleton key={index} className="h-[300px] w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <MainLayout>
        <section className="bg-bcircle-blue text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-bold text-4xl md:text-5xl mb-6 animate-fade-in">
                Explore Chhattisgarh's Businesses
              </h1>
              <p className="text-xl max-w-2xl mx-auto text-white/80 animate-slide-up">
                Discover and connect with the best local businesses in your area
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          </div>
        </section>
      </MainLayout>
    );
  }

  // No results state
  if (filteredBusinesses.length === 0) {
    return (
      <MainLayout>
        <section className="bg-bcircle-blue text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-bold text-4xl md:text-5xl mb-6 animate-fade-in">
                Explore Chhattisgarh's Businesses
              </h1>
              <p className="text-xl max-w-2xl mx-auto text-white/80 animate-slide-up">
                Discover and connect with the best local businesses in your area
              </p>

              {/* Search Bar */}
              <div className="mt-10 bg-white/10 backdrop-blur-md rounded-lg p-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-grow w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5" />
                    <Input
                      type="search"
                      placeholder="Search by name, location..."
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
                        <input 
                          type="checkbox" 
                          className="mr-2"
                          checked={filter.verified}
                          onChange={(e) => setFilter({...filter, verified: e.target.checked})}
                        />
                        <span>Verified Businesses Only</span>
                      </label>
                    </div>
                    
                    <Button className="w-full bg-bcircle-blue hover:bg-bcircle-blue/90">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* No Results Message */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Businesses Found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || filter.location || filter.verified
                      ? "We couldn't find any businesses matching your search criteria. Try adjusting your filters or search terms."
                      : "There are no businesses listed yet. Check back later for new listings."}
                  </p>
                  {(searchTerm || filter.location || filter.verified) && (
                    <Button
                      onClick={() => {
                        setSearchTerm('');
                        setFilter({ location: '', verified: false });
                      }}
                      variant="outline"
                      className="text-bcircle-blue border-bcircle-blue hover:bg-bcircle-blue/10"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-bcircle-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-bold text-4xl md:text-5xl mb-6 animate-fade-in">
              {id ? `${categoryName} Businesses` : "Explore Chhattisgarh's Businesses"}
            </h1>
            <p className="text-xl max-w-2xl mx-auto text-white/80 animate-slide-up">
              {id 
                ? `Discover and connect with the best ${categoryName.toLowerCase()} businesses in your area`
                : "Discover and connect with the best local businesses in your area"}
            </p>

            {/* Search Bar */}
            <div className="mt-10 bg-white/10 backdrop-blur-md rounded-lg p-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-grow w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5" />
                  <Input
                    type="search"
                    placeholder="Search by name, or location..."
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
          <div className="mb-6">
            <AdSlider slides={adSlides} size="medium" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-border p-6 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-montserrat font-semibold text-lg">Filters</h2>
                  <Filter className="h-5 w-5 text-muted-foreground" />
                </div>
                
                <div className="space-y-6">
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
                      <input 
                        type="checkbox" 
                        className="mr-2"
                        checked={filter.verified}
                        onChange={(e) => setFilter({...filter, verified: e.target.checked})}
                      />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentBusinesses.map((business: Business) => (
                  <BusinessCard
                    key={business.id}
                    id={business.id}
                    name={business.name}
                    category={business.category}
                    address={business.address}
                    cover_image={business.cover_image}
                    logo_url={business.logo_url}
                    description={business.description}
                    verified={business.verified}
                    whatsapp={business.whatsapp}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              {pageNumbers.length > 1 && (
                <div className="mt-8 flex justify-center">
                  <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <span className="sr-only">Previous</span>
                      Previous
                    </button>
                    
                    {/* First Page */}
                    {currentPage > 2 && (
                      <>
                        <button
                          onClick={() => paginate(1)}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          1
                        </button>
                        {currentPage > 3 && (
                          <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            ...
                          </span>
                        )}
                      </>
                    )}

                    {/* Page Numbers */}
                    {pageNumbers.map(number => {
                      if (
                        number === 1 || // First page
                        number === pageNumbers.length || // Last page
                        (number >= currentPage - 1 && number <= currentPage + 1) // Pages around current
                      ) {
                        return (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium transition-colors ${
                              currentPage === number 
                                ? 'bg-bcircle-blue text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {number}
                          </button>
                        );
                      }
                      return null;
                    })}

                    {/* Last Page */}
                    {currentPage < pageNumbers.length - 1 && (
                      <>
                        {currentPage < pageNumbers.length - 2 && (
                          <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            ...
                          </span>
                        )}
                        <button
                          onClick={() => paginate(pageNumbers.length)}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          {pageNumbers.length}
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === pageNumbers.length}
                      className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Next</span>
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default BusinessDirectory;
