import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/utils/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "Something went wrong. Please try again."
      });
    }
  };

  const getInitials = () => {
    if (!user) return "?";
    
    const userMetadata = user.user_metadata;
    if (userMetadata?.first_name && userMetadata?.last_name) {
      return `${userMetadata.first_name.charAt(0)}${userMetadata.last_name.charAt(0)}`.toUpperCase();
    } else {
      return user.email?.charAt(0).toUpperCase() || "?";
    }
  };

  // Get avatar URL from user profile or user metadata
  const getAvatarUrl = () => {
    if (!user) return null;
    
    // Check for profile_image_url in user metadata first, then fallback to avatar_url
    const userMetadata = user.user_metadata;
    return userMetadata?.profile_image_url || userMetadata?.avatar_url || null;
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          {/* <div className="h-10 w-10 rounded-full bg-bcircle-blue flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div> */}
          <img 
            src="/cbn-logo.png" 
            alt="CBN Logo" 
            className="w-24 object-contain rounded-sm "
          />
          {/* <span className="font-montserrat font-bold text-2xl text-bcircle-blue hidden sm:inline-flex">
            <span className="text-bcircle-blue">CBN</span>
            <span className="text-bcircle-orange">CIRCLE</span>
          </span> */}
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
          <Link 
            to="/" 
            className={cn(
              "font-medium text-sm transition-colors",
              isActive('/') 
                ? "text-bcircle-blue border-b-2 border-bcircle-blue pb-1" 
                : "text-foreground hover:text-bcircle-blue"
            )}
          >
            Home
          </Link>
          
          <Link 
            to="/businesses" 
            className={cn(
              "font-medium text-sm transition-colors",
              isActive('/businesses') 
                ? "text-bcircle-blue border-b-2 border-bcircle-blue pb-1" 
                : "text-foreground hover:text-bcircle-blue"
            )}
          >
            Categories
          </Link>
          
          <Link 
            to="/services" 
            className={cn(
              "font-medium text-sm transition-colors",
              isActive('/services') 
                ? "text-bcircle-blue border-b-2 border-bcircle-blue pb-1" 
                : "text-foreground hover:text-bcircle-blue"
            )}
          >
            Services
          </Link>
          
          <Link 
            to="/about" 
            className={cn(
              "font-medium text-sm transition-colors",
              isActive('/about') 
                ? "text-bcircle-blue border-b-2 border-bcircle-blue pb-1" 
                : "text-foreground hover:text-bcircle-blue"
            )}
          >
            About
          </Link>
          
          <Link 
            to="/contact" 
            className={cn(
              "font-medium text-sm transition-colors",
              isActive('/contact') 
                ? "text-bcircle-blue border-b-2 border-bcircle-blue pb-1" 
                : "text-foreground hover:text-bcircle-blue"
            )}
          >
            Contact
          </Link>
          
          {/* Conditional rendering based on auth state */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={getAvatarUrl()} />
                  <AvatarFallback className="bg-bcircle-blue text-white">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
             
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              {/* <Button asChild variant="outline" className="ml-2 font-medium">
                <Link to="/login">Login</Link>
              </Button> */}
              <Button asChild className="bg-bcircle-orange hover:bg-bcircle-orange/90 text-white">
                <Link to="/register">Join Now</Link>
              </Button>
            </>
          )}
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
              <Link 
                to="/" 
                className={cn(
                  "py-2 border-b border-border",
                  isActive('/') 
                    ? "text-bcircle-blue font-medium" 
                    : "text-foreground hover:text-bcircle-blue"
                )}
              >
                Home
              </Link>
              
              <Link 
                to="/businesses" 
                className={cn(
                  "py-2 border-b border-border",
                  isActive('/businesses') 
                    ? "text-bcircle-blue font-medium" 
                    : "text-foreground hover:text-bcircle-blue"
                )}
              >
                Categories
              </Link>
              
              <Link 
                to="/services" 
                className={cn(
                  "py-2 border-b border-border",
                  isActive('/services') 
                    ? "text-bcircle-blue font-medium" 
                    : "text-foreground hover:text-bcircle-blue"
                )}
              >
                Services
              </Link>
              
              <Link 
                to="/about" 
                className={cn(
                  "py-2 border-b border-border",
                  isActive('/about') 
                    ? "text-bcircle-blue font-medium" 
                    : "text-foreground hover:text-bcircle-blue"
                )}
              >
                About
              </Link>
              
              <Link 
                to="/contact" 
                className={cn(
                  "py-2 border-b border-border",
                  isActive('/contact') 
                    ? "text-bcircle-blue font-medium" 
                    : "text-foreground hover:text-bcircle-blue"
                )}
              >
                Contact
              </Link>
              
              {user && (
                <>
                  <Link 
                    to="/profile" 
                    className={cn(
                      "py-2 border-b border-border",
                      isActive('/profile') 
                        ? "text-bcircle-blue font-medium" 
                        : "text-foreground hover:text-bcircle-blue"
                    )}
                  >
                    Profile
                  </Link>
                  
                  <Link 
                    to="/dashboard" 
                    className={cn(
                      "py-2 border-b border-border",
                      isActive('/dashboard') 
                        ? "text-bcircle-blue font-medium" 
                        : "text-foreground hover:text-bcircle-blue"
                    )}
                  >
                    Dashboard
                  </Link>
                  
                  <Link 
                    to="/settings" 
                    className={cn(
                      "py-2 border-b border-border",
                      isActive('/settings') 
                        ? "text-bcircle-blue font-medium" 
                        : "text-foreground hover:text-bcircle-blue"
                    )}
                  >
                    Settings
                  </Link>
                </>
              )}
            </nav>
            
            <div className="flex gap-4 mt-4">
              {user ? (
                <Button onClick={handleLogout} variant="destructive" className="flex-1">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline" className="flex-1">
                    <Link to="/login">Login</Link>
                  </Button>
                  {/* <Button asChild className="bg-bcircle-orange hover:bg-bcircle-orange/90 text-white flex-1">
                    <Link to="/register">Complete Registration</Link>
                  </Button> */}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
