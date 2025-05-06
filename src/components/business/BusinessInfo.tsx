
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
            <Button 
              variant="ghost" 
              className="text-sm text-bcircle-blue hover:text-bcircle-blue/80 p-0 h-auto mt-2"
              onClick={toggleDescription}
            >
              {showFullDescription ? 'Show Less' : 'Read More'}
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
            <h3 className="text-lg font-medium text-bcircle-blue mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" /> Business Hours
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
                <span className="font-medium">Monday:</span>
                <span className="text-gray-600">{business.hours.monday}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
                <span className="font-medium">Tuesday:</span>
                <span className="text-gray-600">{business.hours.tuesday}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
                <span className="font-medium">Wednesday:</span>
                <span className="text-gray-600">{business.hours.wednesday}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
                <span className="font-medium">Thursday:</span>
                <span className="text-gray-600">{business.hours.thursday}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
                <span className="font-medium">Friday:</span>
                <span className="text-gray-600">{business.hours.friday}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
                <span className="font-medium">Saturday:</span>
                <span className="text-gray-600">{business.hours.saturday}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium">Sunday:</span>
                <span className="text-gray-600">{business.hours.sunday}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
            <h3 className="text-lg font-medium text-bcircle-blue mb-4 flex items-center">
              <BadgeCheck className="h-5 w-5 mr-2" /> Business Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
                <span className="font-medium">Established:</span>
                <span className="text-gray-600">{business.establishedYear}</span>
              </div>
              {business.attributes && Object.entries(business.attributes).map(([key, value]) => (
                <div className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0" key={key}>
                  <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</span>
                  <span className="text-gray-600">{value}</span>
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
