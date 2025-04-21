
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

const HeroSection = () => {
  return (
    <div className="relative min-h-[450px] bg-gradient-to-br from-[#3847a0] via-[#1eaedb] to-[#b8ccff] text-white overflow-hidden pb-4 shadow-[0_10px_45px_0_rgba(66,100,243,0.18)]">
      {/* Glassmorphism Effect Overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl pointer-events-none" />
      {/* Modern Gradient Overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-2/6 bg-gradient-to-tr from-transparent via-[#9b87f5]/30 to-white/15 opacity-60" />
      
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl md:text-6xl mb-6 animate-fade-in drop-shadow-xl">
            <span className="bg-gradient-to-r from-[#9b87f5] to-[#1eaedb] bg-clip-text text-transparent">Chhattisgarh's</span> <span className="whitespace-nowrap">Business Network</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Find, connect & grow with local businesses, services, and professionals in Raipur & beyond. <span className="font-semibold text-[#b9e8fe]">Start your business journey now.</span>
          </p>

          {/* Search Box */}
          <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl shadow-xl max-w-2xl mx-auto mb-8 animate-slide-up border-none" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9b87f5] h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Search for businesses, services, or categories..."
                  className="pl-10 pr-4 w-full bg-white/20 border-none rounded-lg text-white placeholder:text-white/70 focus:ring-[#9b87f5] transition shadow-md"
                />
              </div>
              <Button className="px-7 font-semibold bg-gradient-to-tr from-[#9b87f5] to-[#1eaedb] text-white shadow-lg hover:from-[#3847a0] hover:to-[#b8ccff] hover:scale-105 transition-transform">
                Search
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Button asChild size="lg"
              className="bg-gradient-to-r from-[#9b87f5] to-[#1eaedb] text-white font-extrabold shadow-xl hover:from-[#3847a0] hover:to-[#b8ccff] hover:scale-105 transition-transform">
              <Link to="/register">Register Now</Link>
            </Button>
            <Button asChild size="lg"
              variant="outline"
              className="shadow-lg border-none bg-white/10 text-white hover:bg-white/20 hover:text-[#9b87f5] transition-colors font-semibold">
              <Link to="/categories" className="flex items-center gap-1">
                Explore Raipur's Business Circle
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
