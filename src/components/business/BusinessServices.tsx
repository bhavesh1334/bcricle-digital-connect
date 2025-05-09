
import React from 'react';
import { BookOpen } from 'lucide-react';
import { Service } from '@/data/businessData';

interface BusinessServicesProps {
  services: Service[];
}

const BusinessServices: React.FC<BusinessServicesProps> = ({ services }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center mb-6">
        <BookOpen className="h-5 w-5 text-bcircle-blue mr-2" />
        <h2 className="text-2xl font-montserrat font-semibold text-gray-800">Services Offered</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div key={service.id} className="rounded-xl overflow-hidden transition-all hover:shadow-lg border border-gray-100 group">
            {service.imageUrl && (
              <div className="h-48 overflow-hidden relative">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10"></div>
                
                <img 
                  src={service.imageUrl} 
                  alt={service.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Content overlay on the image */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-lg mb-1 text-white font-medium">{service.name}</h3>
                </div>
              </div>
            )}
            <div className="p-5 bg-white">
              <p className="text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessServices;
