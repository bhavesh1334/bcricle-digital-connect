
import React from 'react';
import { BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
          <Card key={service.id} className="overflow-hidden transition-all hover:shadow-lg border border-gray-100">
            <CardHeader className="p-0">
              {service.imageUrl && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.imageUrl} 
                    alt={service.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
            </CardHeader>
            <CardContent className="p-5">
              <CardTitle className="text-lg mb-2 text-bcircle-blue">{service.name}</CardTitle>
              <p className="text-gray-600">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BusinessServices;
