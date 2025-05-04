
import React, { useState } from 'react';
import { Calendar, Info } from 'lucide-react';
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
    <div className="bg-white rounded-md p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <Info className="h-5 w-5 text-bcircle-blue mr-2" />
        <h2 className="text-xl font-montserrat font-semibold">About {business.name}</h2>
      </div>
      
      <div className="space-y-4">
        <p className={`text-gray-700 ${showFullDescription ? '' : 'line-clamp-3'}`}>
          {business.longDescription}
        </p>
        
        {business.longDescription && business.longDescription.length > 250 && (
          <Button 
            variant="ghost" 
            className="text-sm text-bcircle-blue hover:text-bcircle-blue/80 px-0"
            onClick={toggleDescription}
          >
            {showFullDescription ? 'Show Less' : 'Read More'}
          </Button>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="text-sm font-medium text-bcircle-blue mb-2 flex items-center">
              <Calendar className="h-4 w-4 mr-1" /> Business Hours
            </h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Monday:</span>
                <span>{business.hours.monday}</span>
              </div>
              <div className="flex justify-between">
                <span>Tuesday:</span>
                <span>{business.hours.tuesday}</span>
              </div>
              <div className="flex justify-between">
                <span>Wednesday:</span>
                <span>{business.hours.wednesday}</span>
              </div>
              <div className="flex justify-between">
                <span>Thursday:</span>
                <span>{business.hours.thursday}</span>
              </div>
              <div className="flex justify-between">
                <span>Friday:</span>
                <span>{business.hours.friday}</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>{business.hours.saturday}</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>{business.hours.sunday}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="text-sm font-medium text-bcircle-blue mb-2">Business Information</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Established:</span>
                <span>{business.establishedYear}</span>
              </div>
              {business.attributes && Object.entries(business.attributes).map(([key, value]) => (
                <div className="flex justify-between" key={key}>
                  <span>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;
