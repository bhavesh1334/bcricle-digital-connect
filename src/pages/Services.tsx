
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Building, ShoppingBag, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Sample services data
const serviceCategories = [
  {
    id: 1,
    title: "Business Consulting",
    description: "Expert guidance to grow your business",
    services: [
      {
        id: 101,
        name: "Strategic Planning",
        description: "Comprehensive business strategy development to achieve growth objectives",
        duration: "4-6 weeks",
        pricing: "Starting from ₹50,000",
        features: ["Market analysis", "Competitive positioning", "Growth roadmap", "Implementation plan"]
      },
      {
        id: 102,
        name: "Financial Advisory",
        description: "Professional financial guidance to optimize business performance",
        duration: "2-3 weeks",
        pricing: "Starting from ₹30,000",
        features: ["Financial health assessment", "Budget planning", "Investment strategy", "Tax optimization"]
      }
    ]
  },
  {
    id: 2,
    title: "Digital Marketing",
    description: "Drive growth through digital channels",
    services: [
      {
        id: 201,
        name: "Social Media Marketing",
        description: "Comprehensive social media management and advertising",
        duration: "Ongoing monthly service",
        pricing: "₹15,000 - ₹45,000 per month",
        features: ["Content creation", "Community management", "Paid campaigns", "Performance reporting"]
      },
      {
        id: 202,
        name: "SEO Optimization",
        description: "Improve your website's search engine ranking and visibility",
        duration: "3-6 months for results",
        pricing: "Starting from ₹25,000 per month",
        features: ["Keyword research", "On-page optimization", "Link building", "Technical SEO"]
      }
    ]
  }
];

const ServiceCard = ({ service }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">{service.name}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{service.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">{service.pricing}</span>
          </div> */}
          <Separator />
          <div>
            <h4 className="text-sm font-medium mb-2">What's included:</h4>
            <ul className="text-sm space-y-1">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-bcircle-blue" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CategorySection = ({ category }) => {
  return (
    <section className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingBag className="h-6 w-6 text-bcircle-blue" />
        <h2 className="text-2xl font-semibold">{category.title}</h2>
      </div>
      <p className="text-gray-600 mb-8">{category.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {category.services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <MainLayout>
      <div className="bg-gray-50 py-12">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-montserrat font-bold text-bcircle-blue mb-4">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of business services designed to help you succeed
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            {serviceCategories.map((category) => (
              <React.Fragment key={category.id}>
                <CategorySection category={category} />
                {category.id < serviceCategories.length && <Separator className="my-8" />}
              </React.Fragment>
            ))}
            
            <div className="mt-12 text-center">
              <Badge variant="outline" className="mb-4 px-3 py-1 text-sm bg-blue-50 text-bcircle-blue border-blue-200">
                <Building className="h-4 w-4 mr-1" />
                Business Support
              </Badge>
              <h2 className="text-2xl font-semibold mb-4">Need a custom service?</h2>
              <p className="text-gray-600 max-w-lg mx-auto mb-6">
                We understand that every business is unique. Contact us to discuss custom solutions tailored to your specific needs.
              </p>
              <a href="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-bcircle-blue text-white hover:bg-bcircle-blue/90 h-10 px-4 py-2">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Services;
