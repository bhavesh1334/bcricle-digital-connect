
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

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
          
          {/* Conditional rendering based on auth state */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-9 w-9 border-2 border-bcircle-blue">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
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
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="outline" className="ml-2 font-medium">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="bg-bcircle-orange hover:bg-bcircle-orange/90 text-white">
                <Link to="/register">Register Now</Link>
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
              <Link to="/" className="py-2 border-b border-border text-foreground hover:text-bcircle-blue">Home</Link>
              <Link to="/categories" className="py-2 border-b border-border text-foreground hover:text-bcircle-blue">Categories</Link>
              <Link to="/services" className="py-2 border-b border-border text-foreground hover:text-bcircle-blue">Services</Link>
              <Link to="/about" className="py-2 border-b border-border text-foreground hover:text-bcircle-blue">About</Link>
              <Link to="/contact" className="py-2 border-b border-border text-foreground hover:text-bcircle-blue">Contact</Link>
              
              {user && (
                <>
                  <Link to="/profile" className="py-2 border-b border-border text-foreground hover:text-bcircle-blue">Profile</Link>
                  <Link to="/dashboard" className="py-2 border-b border-border text-foreground hover:text-bcircle-blue">Dashboard</Link>
                  <Link to="/settings" className="py-2 border-b border-border text-foreground hover:text-bcircle-blue">Settings</Link>
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
                  <Button asChild className="bg-bcircle-orange hover:bg-bcircle-orange/90 text-white flex-1">
                    <Link to="/register">Register Now</Link>
                  </Button>
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
