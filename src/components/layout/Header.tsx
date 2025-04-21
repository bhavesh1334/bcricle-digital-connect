
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Branding */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/9e3bab4e-832a-46bf-8305-79a8b5ab2584.png" 
            alt="Chhattisgarh Business Logo" 
            className="h-12 w-12 rounded-xl shadow-lg bg-white object-contain"
            style={{ objectFit: 'contain' }}
          />
          <span className="hidden sm:flex flex-col ml-2">
            <span className="font-montserrat font-bold text-xl sm:text-2xl text-[#003378] tracking-wide">
              CBN <span className="font-thin tracking-widest text-[10px] block text-[#003378]/60">YOUR BUSINESS CIRCLE</span>
            </span>
          </span>
        </Link>

        {/* Search Bar - Hidden on Mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#003378] h-4 w-4" />
            <Input 
              type="search" 
              placeholder="Search businesses, services..." 
              className="pl-10 pr-4 w-full rounded-lg bg-gray-100 text-[#222] placeholder:text-gray-400 focus:border-[#003378] focus:ring-2 focus:ring-[#003378] shadow"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {[
            { path: "/", label: "Home" },
            { path: "/categories", label: "Categories" },
            { path: "/services", label: "Services" },
            { path: "/about", label: "About" },
            { path: "/contact", label: "Contact" },
          ].map(({ path, label }) => (
            <Link
              key={label}
              to={path}
              className={`px-2 py-1 font-medium text-[#003378] hover:text-black transition-colors text-sm ${location.pathname === path ? 'font-semibold underline underline-offset-4 decoration-[#003378]' : ''}`}
            >
              {label}
            </Link>
          ))}
          <Button asChild variant="outline" className="ml-2 border border-[#003378] text-[#003378] bg-white shadow-md hover:bg-[#003378] hover:text-white transition">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild className="bg-[#003378] text-white font-bold shadow-md hover:bg-black transition">
            <Link to="/register">Register Now</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-[#003378] rounded-full hover:bg-gray-100 shadow transition"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu and Search */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-8 flex flex-col gap-7">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#003378] h-4 w-4" />
              <Input 
                type="search"
                placeholder="Search businesses, services..."
                className="pl-10 pr-4 w-full rounded-lg bg-gray-100 text-[#222] placeholder:text-gray-400 shadow"
              />
            </div>
            <nav className="flex flex-col gap-2">
              {[
                { path: "/", label: "Home" },
                { path: "/categories", label: "Categories" },
                { path: "/services", label: "Services" },
                { path: "/about", label: "About" },
                { path: "/contact", label: "Contact" }
              ].map(({ path, label }) => (
                <Link key={label} to={path} className="px-2 py-3 rounded-md text-[#003378] text-base font-semibold hover:bg-gray-100 transition shadow">
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2 mt-2">
              <Button asChild variant="outline" className="w-full border border-[#003378] text-[#003378] bg-white shadow">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="w-full bg-[#003378] text-white font-bold shadow hover:bg-black">
                <Link to="/register">Register Now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
