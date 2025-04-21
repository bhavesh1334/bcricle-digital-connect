
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
    <header className="sticky top-0 z-50 w-full shadow-xl bg-gradient-to-br from-[#23235b] via-[#3847a0] to-[#1eaedb]">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Branding */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/10a18d3b-6829-46c0-8b79-72e5fa51da98.png" 
            alt="CBN Business Logo" 
            className="h-12 w-12 rounded-2xl shadow-[0_6px_30px_0_rgba(80,122,231,0.50)] bg-white/95 p-1.5"
            style={{ objectFit: 'contain' }}
          />
          <span className="hidden sm:flex flex-col ml-2">
            <span className="font-montserrat font-bold text-xl sm:text-2xl text-white tracking-wide drop-shadow-lg">
              CBN <span className="font-thin tracking-widest text-[10px] block text-white/60">YOUR BUSINESS CIRCLE</span>
            </span>
          </span>
        </Link>

        {/* Search Bar - Hidden on Mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
            <Input 
              type="search" 
              placeholder="Search businesses, services..." 
              className="pl-10 pr-4 w-full rounded-full bg-white/20 border-transparent text-white placeholder:text-white/60 focus:border-primary focus:ring-2 focus:ring-primary transition shadow-md"
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
              className={`relative px-2 py-1 font-medium text-white/90 hover:text-[#9b87f5] transition-colors text-sm ${location.pathname === path ? 'after:content-[""] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-[#1eaedb] after:rounded-lg' : ''}`}
            >
              {label}
            </Link>
          ))}
          <Button asChild variant="outline" className="ml-2 border-none bg-gradient-to-r from-[#3847a0] to-[#1eaedb] text-white/90 shadow-lg hover:scale-105 transition">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-[#9b87f5] to-[#1eaedb] text-white font-extrabold drop-shadow-md hover:from-[#3847a0] hover:to-[#9b87f5] transition">
            <Link to="/register">Register Now</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-white/95 rounded-full hover:bg-white/10 shadow-lg transition"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu and Search */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-gradient-to-br from-[#23235b] via-[#3847a0] to-[#1eaedb] z-40 animate-fade-in shadow-xl">
          <div className="container mx-auto px-4 py-8 flex flex-col gap-7">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-4 w-4" />
              <Input 
                type="search"
                placeholder="Search businesses, services..."
                className="pl-10 pr-4 w-full rounded-full bg-white/20 border-none text-white placeholder:text-white/70 shadow-md"
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
                <Link key={label} to={path} className="px-2 py-3 rounded-lg text-white text-base font-semibold hover:bg-white/10 transition-colors shadow">
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2 mt-2">
              <Button asChild variant="outline" className="w-full border-none bg-blue-800/70 text-white/90 shadow">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="w-full bg-gradient-to-r from-[#9b87f5] to-[#1eaedb] text-white font-extrabold shadow-lg hover:from-[#3847a0] hover:to-[#9b87f5]">
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
