
import React, { useState } from 'react';
import { Calendar, Info, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Business } from '@/data/businessData';

interface BusinessInfoProps {
  business: Business;
}

const BusinessInfo: React.FC<BusinessInfoProps> = ({ business }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center mb-6">
        <Info className="h-5 w-5 text-bcircle-blue mr-2" />
        <h2 className="text-2xl font-montserrat font-semibold text-gray-800">About {business.name}</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <p className={`text-gray-700 leading-relaxed ${showFullDescription ? '' : 'line-clamp-3'}`}>
            {business.longDescription}
          </p>
          
          {business.longDescription && business.longDescription.length > 250 && (
            <p 
              className="text-sm cursor-pointer text-bcircle-blue hover:text-bcircle-blue/80 font-semibold p-0 h-auto mt-2"
              onClick={toggleDescription}
            >
              {showFullDescription ? 'Show Less' : 'Read More'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;
