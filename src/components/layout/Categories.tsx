
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdSlider from '@/components/common/AdSlider';

// Category types for demonstration
const categoryGroups = [
  {
    groupName: 'Professional Services',
    categories: [
      { name: 'Chartered Accountant', count: 42, slug: 'chartered-accountant' },
      { name: 'Accounting Services', count: 31, slug: 'accounting-services' },
      { name: 'Legal Services', count: 28, slug: 'legal-services' },
      { name: 'Financial Services', count: 56, slug: 'financial-services' },
      { name: 'Insurance', count: 23, slug: 'insurance' },
      { name: 'Business Mentors', count: 15, slug: 'business-mentors' }
    ]
  },
  {
    groupName: 'Technology & Digital',
    categories: [
      { name: 'Web Development & IT', count: 84, slug: 'web-development-it' },
      { name: 'Digital Marketing', count: 62, slug: 'digital-marketing' },
      { name: 'Software Development', count: 37, slug: 'software-development' },
      { name: 'App Development', count: 29, slug: 'app-development' },
      { name: 'CCTV & Security', count: 33, slug: 'cctv-security' },
      { name: 'Home Automation', count: 18, slug: 'home-automation' }
    ]
  },
  {
    groupName: 'Construction & Real Estate',
    categories: [
      { name: 'Civil Contractor', count: 48, slug: 'civil-contractor' },
      { name: 'Architect', count: 37, slug: 'architect' },
      { name: 'Interior Designer', count: 51, slug: 'interior-designer' },
      { name: 'Real Estate & Builders', count: 89, slug: 'real-estate-builders' },
      { name: 'Modular Kitchen', count: 26, slug: 'modular-kitchen' },
      { name: 'Tiles and Marble', count: 31, slug: 'tiles-marble' }
    ]
  },
  {
    groupName: 'Healthcare',
    categories: [
      { name: 'Doctors', count: 74, slug: 'doctors' },
      { name: 'Dentists', count: 43, slug: 'dentists' },
      { name: 'Medical Store', count: 67, slug: 'medical-store' },
      { name: 'Diagnostic Services', count: 29, slug: 'diagnostic-services' },
      { name: 'Physiotherapist', count: 16, slug: 'physiotherapist' },
      { name: 'Health and Nutrition', count: 32, slug: 'health-nutrition' }
    ]
  }
];

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter categories based on search term
  const filteredCategoryGroups = searchTerm 
    ? categoryGroups.map(group => ({
        ...group,
        categories: group.categories.filter(category => 
          category.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(group => group.categories.length > 0)
    : categoryGroups;

  // Mock data for ad slider
  const adSlides = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
      alt: 'Premium Office Space for Rent',
      targetUrl: '#ad1'
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7',
      alt: 'Business Conference 2023',
      targetUrl: '#ad2'
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      alt: 'Digital Marketing Services',
      targetUrl: '#ad3'
    },
    {
      id: 4,
      imageUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6',
      alt: 'Financial Services',
      targetUrl: '#ad4'
    },
    {
      id: 5,
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
      alt: 'IT Consulting',
      targetUrl: '#ad5'
    }
  ];

  return (
    <MainLayout>
      {/* Categories Hero */}
      <section className="bg-bcircle-blue text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 animate-fade-in">
            Business Categories
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white/80 animate-slide-up">
            Explore businesses across Chhattisgarh by category. Find exactly what you're looking for.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-10 relative animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5" />
            <Input 
              type="search" 
              placeholder="Search categories..." 
              className="pl-10 pr-4 w-full bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Ad Slider */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <AdSlider slides={adSlides} size="medium" />
        </div>
      </section>

      {/* Categories List */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredCategoryGroups.length > 0 ? (
            filteredCategoryGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-12">
                <h2 className="font-montserrat font-semibold text-2xl mb-6 text-bcircle-blue pb-2 border-b border-bcircle-blue/20">
                  {group.groupName}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {group.categories.map((category, categoryIndex) => (
                    <Link 
                      key={categoryIndex} 
                      to={`/categories/${category.slug}`}
                      className="bg-white p-4 rounded-lg border border-border hover-lift flex justify-between items-center"
                    >
                      <span className="font-medium text-foreground">{category.name}</span>
                      <span className="text-sm text-muted-foreground bg-bcircle-blue/10 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-4">No categories found</h2>
              <p className="text-muted-foreground mb-6">Try adjusting your search term or browse all categories.</p>
              <Button onClick={() => setSearchTerm('')} className="bg-bcircle-blue hover:bg-bcircle-blue/90">
                Show All Categories
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-12 bg-bcircle-orange text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-montserrat font-bold text-2xl md:text-3xl mb-4">
              Can't Find Your Business Category?
            </h2>
            <p className="text-white/90 mb-6">
              Don't worry! We're constantly expanding our categories. Contact us to suggest a new category or register your business anyway.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-bcircle-orange hover:bg-white/90">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/register">Register Your Business</Link>
              </Button>
            </div>
          </div>
        </div>
      </section> */}
    </MainLayout>
  );
};

export default Categories;
