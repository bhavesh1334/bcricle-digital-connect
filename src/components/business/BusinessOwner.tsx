
import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { BusinessOwner as BusinessOwnerType } from '@/data/businessData';

interface BusinessOwnerProps {
  owner: BusinessOwnerType;
}

const BusinessOwner: React.FC<BusinessOwnerProps> = ({ owner }) => {
  return (
    <div className="bg-white rounded-md p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <User className="h-5 w-5 text-bcircle-blue mr-2" />
        <h2 className="text-xl font-montserrat font-semibold">Meet the Owner</h2>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={owner.imageUrl} alt={owner.name} />
          <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <h3 className="text-lg font-medium mb-1">{owner.name}</h3>
        <p className="text-sm text-gray-500 mb-4">{owner.position}</p>
        
        <p className="text-gray-700 mb-6">{owner.bio}</p>
        
        {owner.contact && (
          <div className="w-full space-y-2">
            {owner.contact.email && (
              <a 
                href={`mailto:${owner.contact.email}`} 
                className="flex items-center justify-center text-sm py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded-md text-bcircle-blue transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email {owner.name}
              </a>
            )}
            
            {owner.contact.phone && (
              <a 
                href={`tel:${owner.contact.phone}`} 
                className="flex items-center justify-center text-sm py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded-md text-bcircle-blue transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call {owner.name}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessOwner;
