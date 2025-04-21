
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-bcircle-blue flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <span className="font-montserrat font-bold text-2xl text-bcircle-blue hidden sm:inline-flex">
            <span className="text-bcircle-blue">B</span>
            <span className="text-bcircle-orange">CIRCLE</span>
          </span>
        </Link>

        {/* Search Bar - Hidden on Mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              type="search" 
              placeholder="Search businesses, services..." 
              className="pl-10 pr-4 w-full rounded-full border-bcircle-blue/20 focus:border-bcircle-blue"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground hover:text-bcircle-blue font-medium text-sm">Home</Link>
          <Link to="/categories" className="text-foreground hover:text-bcircle-blue font-medium text-sm">Categories</Link>
          <Link to="/services" className="text-foreground hover:text-bcircle-blue font-medium text-sm">Services</Link>
          <Link to="/about" className="text-foreground hover:text-bcircle-blue font-medium text-sm">About</Link>
          <Link to="/contact" className="text-foreground hover:text-bcircle-blue font-medium text-sm">Contact</Link>
          <Button asChild variant="outline" className="ml-2 font-medium">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild className="bg-bcircle-orange hover:bg-bcircle-orange/90 text-white">
            <Link to="/register">Register Now</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden p-2 text-foreground rounded-md hover:bg-muted"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu and Search */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 animate-fade-in">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                type="search" 
                placeholder="Search businesses, services..." 
                className="pl-10 pr-4 w-full rounded-full border-bcircle-blue/20 focus:border-bcircle-blue"
              />
            </div>
            <nav className="flex flex-col gap-4">
              <Link to="/" className="py-2 border-b border-border text-foreground hover:text-bcircle-blue">Home</Link>
              <Link to="/categories" className="py-2 border-b border-border text-foreground hover:text-bcircle-blue">Categories</Link>
              <Link to="/services" className="py-2 border-b border-border text-foreground hover:text-bcircle-blue">Services</Link>
              <Link to="/about" className="py-2 border-b border-border text-foreground hover:text-bcircle-blue">About</Link>
              <Link to="/contact" className="py-2 border-b border-border text-foreground hover:text-bcircle-blue">Contact</Link>
            </nav>
            <div className="flex gap-4 mt-4">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="bg-bcircle-orange hover:bg-bcircle-orange/90 text-white flex-1">
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
