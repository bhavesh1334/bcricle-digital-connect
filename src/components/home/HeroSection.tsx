
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

const HeroSection = () => {
  const {user}= useAuth()
  return (
    <div className="relative bg-gradient-to-br from-bcircle-blue to-bcircle-blue/90 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4yIj48Y2lyY2xlIGN4PSI5IiBjeT0iOSIgcj0iMSIgZmlsbD0iI2ZmZiIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-montserrat font-bold text-4xl sm:text-5xl md:text-6xl mb-6 animate-fade-in">
            Connecting <span className="text-bcircle-orange">Chhattisgarh's</span> Business Community
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Find businesses, services, and professionals in Chhattisgarh. The digital backbone for your business networking needs.
          </p>
          
          {/* Search Box */}
          {/* <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5" />
                <Input 
                  type="search" 
                  placeholder="Search for businesses, services, or categories..." 
                  className="pl-10 pr-4 w-full bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-white"
                />
              </div>
              <Button className="bg-bcircle-orange hover:bg-bcircle-orange/90 text-white font-medium">
                Search
              </Button>
            </div>
          </div>
           */}
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
          { !user &&   <Button asChild size="lg" className="bg-bcircle-orange hover:bg-bcircle-orange/90 text-white font-medium">
              <Link to="/register">Join Now</Link>
            </Button>}
            <Button asChild size="lg" variant="outline" className="border-white text-white bg-white/5 hover:bg-white/10">
              <Link to="/businesses">
                Explore Chhattisgarh Business Network
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
