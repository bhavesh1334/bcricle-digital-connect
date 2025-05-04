
import React from 'react';
import { MapPin, Phone, Mail, Globe, Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Business } from '@/data/businessData';

interface BusinessContactProps {
  business: Business;
}

const BusinessContact: React.FC<BusinessContactProps> = ({ business }) => {
  const { contact } = business;
  
  // Format address
  const fullAddress = `${contact.address}, ${contact.city}, ${contact.state} ${contact.zip}`;
  const encodedAddress = encodeURIComponent(fullAddress);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  
  return (
    <div className="bg-white rounded-md p-6 shadow-sm">
      <h2 className="text-xl font-montserrat font-semibold mb-4">Contact Information</h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center mb-2">
            <MapPin className="h-4 w-4 text-bcircle-blue mr-2" />
            <h3 className="text-sm font-medium">Address</h3>
          </div>
          <p className="text-sm text-gray-700 ml-6">{fullAddress}</p>
          <a 
            href={googleMapsUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-bcircle-blue hover:underline ml-6 mt-1 block"
          >
            View on Google Maps
          </a>
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <Phone className="h-4 w-4 text-bcircle-blue mr-2" />
            <h3 className="text-sm font-medium">Phone</h3>
          </div>
          <a 
            href={`tel:${contact.phone}`} 
            className="text-sm text-gray-700 hover:text-bcircle-blue ml-6 block"
          >
            {contact.phone}
          </a>
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <Mail className="h-4 w-4 text-bcircle-blue mr-2" />
            <h3 className="text-sm font-medium">Email</h3>
          </div>
          <a 
            href={`mailto:${contact.email}`} 
            className="text-sm text-gray-700 hover:text-bcircle-blue ml-6 block"
          >
            {contact.email}
          </a>
        </div>
        
        {contact.website && (
          <div>
            <div className="flex items-center mb-2">
              <Globe className="h-4 w-4 text-bcircle-blue mr-2" />
              <h3 className="text-sm font-medium">Website</h3>
            </div>
            <a 
              href={contact.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-700 hover:text-bcircle-blue ml-6 block"
            >
              {contact.website.replace(/^https?:\/\//i, '')}
            </a>
          </div>
        )}
        
        {contact.social && Object.keys(contact.social).length > 0 && (
          <div>
            <div className="flex items-center mb-3">
              <h3 className="text-sm font-medium">Social Media</h3>
            </div>
            <div className="flex ml-6 space-x-3">
              {contact.social.facebook && (
                <a 
                  href={contact.social.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              
              {contact.social.instagram && (
                <a 
                  href={contact.social.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-pink-600"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              
              {contact.social.linkedin && (
                <a 
                  href={contact.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-700"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              
              {contact.social.twitter && (
                <a 
                  href={contact.social.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-400"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        )}
        
        <div className="pt-4">
          <Button className="w-full bg-bcircle-blue hover:bg-bcircle-blue/90 shadow-sm">
            <Phone className="h-4 w-4 mr-2" /> 
            Call Now
          </Button>
          
          <Button className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            WhatsApp
          </Button>
          
          <Button variant="outline" className="w-full mt-2 border-bcircle-blue text-bcircle-blue hover:bg-bcircle-blue/10 shadow-sm">
            <Mail className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BusinessContact;
