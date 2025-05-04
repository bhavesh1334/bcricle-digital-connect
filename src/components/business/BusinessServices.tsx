
import React from 'react';
import { BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Service } from '@/data/businessData';

interface BusinessServicesProps {
  services: Service[];
}

const BusinessServices: React.FC<BusinessServicesProps> = ({ services }) => {
  return (
    <div className="bg-white rounded-md p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <BookOpen className="h-5 w-5 text-bcircle-blue mr-2" />
        <h2 className="text-xl font-montserrat font-semibold">Services Offered</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <Card key={service.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-0">
              {service.imageUrl && (
                <div className="h-36 overflow-hidden">
                  <img 
                    src={service.imageUrl} 
                    alt={service.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-base mb-2">{service.name}</CardTitle>
              <p className="text-sm text-gray-600">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BusinessServices;
