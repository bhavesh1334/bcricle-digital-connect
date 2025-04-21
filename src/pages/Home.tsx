
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import FeaturedBusinesses from '@/components/home/FeaturedBusinesses';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';
import AdSlider from '@/components/common/AdSlider';

const Home = () => {
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
    }
  ];

  return (
    <MainLayout>
      <HeroSection />
      
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <AdSlider slides={adSlides} size="large" />
        </div>
      </div>
      
      <FeaturedCategories />
      <FeaturedBusinesses />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </MainLayout>
  );
};

export default Home;
