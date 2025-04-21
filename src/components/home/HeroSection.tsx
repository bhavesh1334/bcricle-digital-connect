
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

const HeroSection = () => {
  return (
    <div className="relative min-h-[420px] bg-white text-[#003378] flex flex-col items-center justify-center py-16 sm:py-24">
      <img
        src="/lovable-uploads/9e3bab4e-832a-46bf-8305-79a8b5ab2584.png"
        alt="Chhattisgarh Business Logo"
        className="mx-auto mb-8 h-20 w-20 rounded-xl shadow-lg bg-white"
        style={{ objectFit: 'contain' }}
      />
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl md:text-6xl mb-5 drop-shadow-sm text-[#003378]">
          Chhattisgarh's Business Network
        </h1>
        <p className="text-lg md:text-xl mb-9 text-gray-800 max-w-2xl mx-auto">
          Find, connect & grow with local businesses, services, and professionals in Raipur & beyond.{' '}
          <span className="font-semibold text-black">Start your business journey now.</span>
        </p>

        {/* Search Box */}
        <div className="bg-gray-50 p-3 rounded-xl shadow-md max-w-2xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#003378] h-5 w-5" />
              <Input
                type="search"
                placeholder="Search for businesses, services, or categories..."
                className="pl-10 pr-4 w-full bg-white border-none rounded-lg text-[#003378] placeholder:text-gray-400 focus:ring-[#003378] shadow"
              />
            </div>
            <Button className="px-7 font-semibold bg-[#003378] text-white shadow-md hover:bg-black transition">
              Search
            </Button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-2">
          <Button asChild size="lg"
            className="bg-[#003378] text-white font-bold shadow-md hover:bg-black">
            <Link to="/register">Register Now</Link>
          </Button>
          <Button asChild size="lg"
            variant="outline"
            className="shadow-md border border-[#003378] bg-white text-[#003378] hover:bg-gray-100 font-semibold">
            <Link to="/categories" className="flex items-center gap-1">
              Explore Raipur's Business Circle
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
