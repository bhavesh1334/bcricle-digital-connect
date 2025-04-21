
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

const HeroSection = () => {
  return (
    <div className="relative min-h-[450px] bg-gradient-to-br from-[#09488A] via-[#0a3572] to-[#164e92] text-white overflow-hidden pb-4">
      {/* Glassmorphism Effect Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl pointer-events-none" />
      {/* Angular Blue Pattern */}
      <div className="absolute right-0 top-0 bottom-0 w-2/6 bg-gradient-to-tr from-transparent via-[#1180d6]/10 to-white/10 opacity-60" />
      
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl md:text-6xl mb-6 animate-fade-in drop-shadow-xl">
            <span className="bg-gradient-to-r from-[#FFD700] to-[#f39c12] bg-clip-text text-transparent">Chhattisgarh's</span> <span className="whitespace-nowrap">Business Network</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Find, connect & grow with local businesses, services, and professionals in Raipur & beyond. <span className="font-semibold text-[#FFD700]">Start your business journey now.</span>
          </p>

          {/* Search Box */}
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-lg max-w-2xl mx-auto mb-8 animate-slide-up border border-white/10" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFD700] h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Search for businesses, services, or categories..."
                  className="pl-10 pr-4 w-full bg-white/20 border-white/30 rounded-lg text-white placeholder:text-white/70 focus:border-[#FFD700] focus:ring-[#FFD700] transition"
                />
              </div>
              <Button className="px-7 font-semibold bg-gradient-to-tr from-[#FFD700] to-[#f39c12] text-[#09488A] hover:from-[#f39c12] hover:to-[#FFD700] hover:scale-105 transition-transform">
                Search
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Button asChild size="lg"
              className="bg-gradient-to-r from-[#FFD700] to-[#f39c12] text-[#09488A] font-extrabold shadow-xl hover:from-[#f39c12] hover:to-[#FFD700] hover:scale-105 transition-transform">
              <Link to="/register">Register Now</Link>
            </Button>
            <Button asChild size="lg"
              variant="outline"
              className="border-[#FFD700] text-white hover:bg-white/10 hover:text-[#FFD700] hover:border-white/90 transition-colors font-semibold">
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
