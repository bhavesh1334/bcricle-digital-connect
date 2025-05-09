
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bcircle-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className=" rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-2xl">CBN</span>
              </div>
              {/* <span className="font-montserrat font-bold text-2xl">
                <span className="text-white">B</span>
                <span className="text-bcircle-orange">CIRCLE</span>
              </span> */} 
            </div>
            <p className="text-sm text-gray-300">
              The digital backbone of Chhattisgarh's business community — one connection at a time.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-bcircle-orange transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-bcircle-orange transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-bcircle-orange transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-bcircle-orange transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-bcircle-orange transition-colors">Home</Link></li>
              <li><Link to="/businesses" className="text-gray-300 hover:text-bcircle-orange transition-colors">Categories</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-bcircle-orange transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-bcircle-orange transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-bcircle-orange transition-colors">Contact Us</Link></li>
              <li><Link to="/register" className="text-gray-300 hover:text-bcircle-orange transition-colors">Register Your Business</Link></li>
            </ul>
          </div>

          {/* Column 3: Business Categories */}
          {/* <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Top Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/businesses" className="text-gray-300 hover:text-bcircle-orange transition-colors">Web Development & IT</Link></li>
              <li><Link to="/businesses" className="text-gray-300 hover:text-bcircle-orange transition-colors">Accounting Services</Link></li>
              <li><Link to="/businesses" className="text-gray-300 hover:text-bcircle-orange transition-colors">Digital Marketing</Link></li>
              <li><Link to="/businesses" className="text-gray-300 hover:text-bcircle-orange transition-colors">Real Estate & Builders</Link></li>
              <li><Link to="/businesses" className="text-gray-300 hover:text-bcircle-orange transition-colors">Healthcare Services</Link></li>
              <li><Link to="/businesses" className="text-bcircle-orange hover:underline transition-colors">View All Categories</Link></li>
            </ul>
          </div> */}

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="min-w-4 h-4 mt-1" />
                <span className="text-gray-300">CBN Office, Civil Lines, Raipur, Chhattisgarh 492001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="min-w-4 h-4" />
                <a href="tel:+917000123456" className="text-gray-300 hover:text-bcircle-orange transition-colors">+91 7000 123 456</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="min-w-4 h-4" />
                <a href="mailto:info@bcircle.in" className="text-gray-300 hover:text-bcircle-orange transition-colors">info@bcircle.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} CBN. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-bcircle-orange transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-bcircle-orange transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
