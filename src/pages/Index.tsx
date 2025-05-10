
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';

const Index = () => {
  const navigate = useNavigate();
  
  // Card data for featured items
  const featuredItems = [
    {
      id: 1,
      title: "Join Us for a Yoga Class Today!",
      imageUrl: "/lovable-uploads/526b96c9-fb32-49dc-9156-294d6c4cbe60.png",
      ctaText: "Get started",
      ctaAction: () => navigate("/services")
    },
    {
      id: 2,
      title: "Explore Local Business Directory",
      imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca",
      ctaText: "Browse businesses",
      ctaAction: () => navigate("/businesses")
    },
    {
      id: 3,
      title: "Register Your Business Today",
      imageUrl: "https://images.unsplash.com/photo-1497215842964-222b430dc094",
      ctaText: "Register now",
      ctaAction: () => navigate("/register")
    }
  ];
  
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-bcircle-blue text-white pt-16 pb-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold mb-6 animate-fade-in">
              Welcome to BCIRCLE
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-white/90 animate-slide-up">
              Your complete business network in Raipur, connecting local businesses and customers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/businesses")}
                className="bg-bcircle-orange hover:bg-bcircle-orange/90"
              >
                Explore Businesses
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate("/register")}
                className="border-white text-white hover:bg-white hover:text-bcircle-blue"
              >
                Register Your Business
              </Button>
            </div>
          </div>
        </div>
        
        {/* Featured Cards Section */}
        <div className="container mx-auto px-4 py-12 -mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map(item => (
              <div key={item.id} className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <div className="relative h-64">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10"></div>
                  
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Content overlay on the image */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <input 
                        type="email" 
                        placeholder="Your email" 
                        className="px-4 py-2 rounded-l-md flex-grow text-sm focus:outline-none focus:ring-2 focus:ring-bcircle-blue"
                      />
                      <Button 
                        onClick={item.ctaAction}
                        className="rounded-l-none"
                      >
                        {item.ctaText}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Additional Content Section */}
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-montserrat font-bold mb-6 text-bcircle-blue">
            Discover What BCIRCLE Has to Offer
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            BCIRCLE connects businesses and customers across Raipur, providing a comprehensive 
            platform for discovery, networking, and growth.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/about")}
            className="bg-bcircle-blue hover:bg-bcircle-blue/90"
          >
            Learn More About Us
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
