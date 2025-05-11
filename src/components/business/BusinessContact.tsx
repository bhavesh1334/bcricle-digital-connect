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
  const fullAddress = `${contact.address || ''}, ${contact.city}, ${contact.state} ${contact.zip}`.trim();
  const encodedAddress = encodeURIComponent(fullAddress);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  
  // Format phone number for WhatsApp
  const formatPhoneForWhatsApp = (phone: string) => {
    return phone.replace(/[^0-9]/g, '');
  };

  // Format website URL for display
  const formatWebsiteUrl = (url: string) => {
    const cleanUrl = url.replace(/^https?:\/\//i, '');
    return cleanUrl.charAt(0).toUpperCase() + cleanUrl.slice(1);
  };
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-montserrat font-semibold text-gray-800 mb-6 capitalize">Contact Information</h2>
      
      <div className="space-y-6">
        {fullAddress && (
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
            <div className="flex items-center mb-3">
              <MapPin className="h-5 w-5 text-bcircle-blue mr-2 flex-shrink-0" />
              <h3 className="text-lg font-medium capitalize">Address</h3>
            </div>
            <p className="text-gray-700 ml-7 mb-2 capitalize">{fullAddress}</p>
            <a 
              href={googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-7 text-bcircle-blue hover:underline font-medium text-sm inline-flex items-center capitalize"
            >
              View on google maps
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
        
        <div className="space-y-4">
          {contact.phone && (
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-bcircle-blue mr-3" />
              <a 
                href={`tel:${contact.phone}`} 
                className="text-gray-700 hover:text-bcircle-blue transition-colors"
              >
                {contact.phone}
              </a>
            </div>
          )}
          
          {contact.email && (
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-bcircle-blue mr-3" />
              <a 
                href={`mailto:${contact.email}`} 
                className="text-gray-700 hover:text-bcircle-blue transition-colors"
              >
                {contact.email}
              </a>
            </div>
          )}
          
          {contact.website && (
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-bcircle-blue mr-3" />
              <a 
                href={contact.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-bcircle-blue transition-colors capitalize"
              >
                {contact.website.replace(/^https?:\/\//i, '')}
              </a>
            </div>
          )}
        </div>
        
        {contact.social && Object.keys(contact.social).length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-4 capitalize">Connect with us</h3>
            <div className="flex gap-3">
              {contact.social.facebook && (
                <a 
                  href={contact.social.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-full transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              
              {contact.social.instagram && (
                <a 
                  href={contact.social.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-full transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              
              {contact.social.linkedin && (
                <a 
                  href={contact.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-full transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              
              {contact.social.twitter && (
                <a 
                  href={contact.social.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-full transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        )}
        
        <div className="pt-4 space-y-3">
          {contact.phone && (
            <Button 
              className="w-full bg-bcircle-blue hover:bg-bcircle-blue/90 text-white shadow-md py-6 capitalize"
              onClick={() => window.location.href = `tel:${contact.phone}`}
            >
              <Phone className="h-4 w-4 mr-2" /> 
              Call now
            </Button>
          )}
          
          {contact.phone && (
            <Button 
              className="w-full bg-green-500 hover:bg-green-600 text-white shadow-md py-6 capitalize"
              onClick={() => window.open(`https://wa.me/${formatPhoneForWhatsApp(contact.phone)}`, '_blank')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              WhatsApp
            </Button>
          )}
          
          {contact.email && (
            <Button 
              variant="outline" 
              className="w-full border-2 border-bcircle-blue text-bcircle-blue hover:bg-bcircle-blue hover:text-white shadow-md py-6 transition-colors capitalize"
              onClick={() => window.location.href = `mailto:${contact.email}`}
            >
              <Mail className="h-4 w-4 mr-2" />
              Send email
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessContact;
