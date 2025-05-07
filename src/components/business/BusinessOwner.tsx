import React, { useState } from 'react';
import { User, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { BusinessOwner as BusinessOwnerType } from '@/data/businessData';

interface BusinessOwnerProps {
  owner: BusinessOwnerType;
}

const BusinessOwner: React.FC<BusinessOwnerProps> = ({ owner }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg p-5 shadow-md">
      <div className="flex items-center mb-4">
        <User className="h-4 w-4 text-bcircle-blue mr-2" />
        <h2 className="text-lg font-montserrat font-semibold text-gray-800">Meet the Owner</h2>
      </div>
      
      <div className="flex items-start gap-4">
        <Avatar className="h-20 w-20 border-2 border-white shadow-md">
          <AvatarImage className='' src={owner.imageUrl} alt={owner.name} />
          <AvatarFallback className="bg-bcircle-blue text-white text-xl">{owner.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-bcircle-blue">{owner.name}</h3>
          <p className="text-xs bg-bcircle-blue/10 text-bcircle-blue px-2 py-0.5 rounded-full inline-block mb-2">{owner.position}</p>
          
          <div className="relative  mb-4">
            <p className={`text-sm text-gray-600 leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''}`}>
              {owner.bio}
            </p>
            {owner.bio.length > 120 && (
              <span
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-bcircle-blue cursor-pointer text-sm font-medium flex items-center gap-1 hover:text-bcircle-blue/80 transition-colors"
              >
                {isExpanded ? (
                  <>
                    Show less 
                  </>
                ) : (
                  <>
                    Show more
                  </>
                )}
              </span>
            )}
          </div>
          
          {owner.contact && (
            <div className="flex flex-wrap gap-2">
              {owner.contact.email && (
                <a 
                  href={`mailto:${owner.contact.email}`} 
                  className="flex items-center gap-1.5 py-1.5 px-3 bg-white border border-bcircle-blue/20 hover:border-bcircle-blue/30 rounded-md text-bcircle-blue hover:bg-bcircle-blue/5 transition-all text-sm"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email</span>
                </a>
              )}
              
              {owner.contact.phone && (
                <a 
                  href={`tel:${owner.contact.phone}`} 
                  className="flex items-center gap-1.5 py-1.5 px-3 bg-white border border-bcircle-blue/20 hover:border-bcircle-blue/30 rounded-md text-bcircle-blue hover:bg-bcircle-blue/5 transition-all text-sm"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessOwner;
