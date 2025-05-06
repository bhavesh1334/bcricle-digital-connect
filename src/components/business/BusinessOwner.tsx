
import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { BusinessOwner as BusinessOwnerType } from '@/data/businessData';

interface BusinessOwnerProps {
  owner: BusinessOwnerType;
}

const BusinessOwner: React.FC<BusinessOwnerProps> = ({ owner }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center mb-6">
        <User className="h-5 w-5 text-bcircle-blue mr-2" />
        <h2 className="text-2xl font-montserrat font-semibold text-gray-800">Meet the Owner</h2>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-32 w-32 border-4 border-white shadow-lg mb-4">
          <AvatarImage src={owner.imageUrl} alt={owner.name} />
          <AvatarFallback className="bg-bcircle-blue text-white text-2xl">{owner.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <h3 className="text-xl font-bold mb-1 text-bcircle-blue">{owner.name}</h3>
        <p className="text-sm bg-bcircle-blue/10 text-bcircle-blue px-3 py-1 rounded-full mb-4">{owner.position}</p>
        
        <p className="text-gray-700 leading-relaxed mb-6">{owner.bio}</p>
        
        {owner.contact && (
          <div className="w-full space-y-3">
            {owner.contact.email && (
              <a 
                href={`mailto:${owner.contact.email}`} 
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-bcircle-blue/20 hover:border-bcircle-blue/30 rounded-lg text-bcircle-blue hover:bg-bcircle-blue/5 transition-all shadow-sm"
              >
                <Mail className="h-4 w-4" />
                <span>Email {owner.name}</span>
              </a>
            )}
            
            {owner.contact.phone && (
              <a 
                href={`tel:${owner.contact.phone}`} 
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-bcircle-blue/20 hover:border-bcircle-blue/30 rounded-lg text-bcircle-blue hover:bg-bcircle-blue/5 transition-all shadow-sm"
              >
                <Phone className="h-4 w-4" />
                <span>Call {owner.name}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessOwner;
