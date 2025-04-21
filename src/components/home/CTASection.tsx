import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-red-100 to-red-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">
            Ready to Join Raipur's Business Circle?
          </h2>
          
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Register your business today and become part of Chhattisgarh's growing digital business ecosystem. Get discovered by new customers and connect with other local businesses.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-bcircle-orange hover:bg-white/90 font-semibold">
              <Link to="/register">
                Register Your Business
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white bg-white/5 hover:bg-white/10">
              <Link to="/categories">
                Explore Businesses
              </Link>
            </Button>
          </div>
          
          <p className="mt-6 text-white/80 text-sm">
            Join 500+ businesses already growing with CBN
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
