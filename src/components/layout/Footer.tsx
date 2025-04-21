
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-[#23235b] via-[#3847a0] to-[#bbe1fa] text-white pt-1 shadow-[0_-6px_42px_0_rgba(66,100,243,0.08)]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/lovable-uploads/10a18d3b-6829-46c0-8b79-72e5fa51da98.png"
                alt="CBN Business Logo"
                className="h-12 w-12 rounded-2xl bg-white/95 shadow-[0_6px_25px_0_rgba(80,122,231,0.24)] p-1.5"
                style={{ objectFit: 'contain' }}
              />
              <span className="font-montserrat font-bold text-xl text-white drop-shadow-lg">
                CBN <span className="font-thin block text-xs tracking-widest text-white/70">BUSINESS CIRCLE</span>
              </span>
            </div>
            <p className="text-sm text-white/80">
              The digital backbone of Chhattisgarh's business community — one connection at a time.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-[#9b87f5] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-[#9b87f5] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-[#1eaedb] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-[#9b87f5] transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4 text-[#9b87f5]">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/85 hover:text-[#9b87f5] transition-colors">Home</Link></li>
              <li><Link to="/categories" className="text-white/85 hover:text-[#1eaedb] transition-colors">Categories</Link></li>
              <li><Link to="/services" className="text-white/85 hover:text-[#9b87f5] transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-white/85 hover:text-[#9b87f5] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-white/85 hover:text-[#1eaedb] transition-colors">Contact Us</Link></li>
              <li><Link to="/register" className="text-[#1eaedb] hover:underline transition-colors">Register Your Business</Link></li>
            </ul>
          </div>

          {/* Top Categories */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4 text-[#9b87f5]">Top Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/categories/web-development" className="text-white/85 hover:text-[#9b87f5] transition-colors">Web Development & IT</Link></li>
              <li><Link to="/categories/accounting" className="text-white/85 hover:text-[#1eaedb] transition-colors">Accounting Services</Link></li>
              <li><Link to="/categories/marketing" className="text-white/85 hover:text-[#1eaedb] transition-colors">Digital Marketing</Link></li>
              <li><Link to="/categories/real-estate" className="text-white/85 hover:text-[#9b87f5] transition-colors">Real Estate & Builders</Link></li>
              <li><Link to="/categories/healthcare" className="text-white/85 hover:text-[#1eaedb] transition-colors">Healthcare Services</Link></li>
              <li><Link to="/categories" className="text-[#9b87f5] hover:underline transition-colors">View All Categories</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4 text-[#1eaedb]">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="min-w-4 h-4 mt-1" />
                <span className="text-white/80">BCIRCLE Office, Civil Lines, Raipur, Chhattisgarh 492001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="min-w-4 h-4" />
                <a href="tel:+917000123456" className="text-white/80 hover:text-[#1eaedb] transition-colors">+91 7000 123 456</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="min-w-4 h-4" />
                <a href="mailto:info@bcircle.in" className="text-white/80 hover:text-[#9b87f5] transition-colors">info@bcircle.in</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-12 pt-6 text-sm text-white/60 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} CBN Business Circle. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-[#1eaedb] transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-[#9b87f5] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
