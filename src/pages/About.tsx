
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AdSlider from '@/components/common/AdSlider';

const About = () => {
  // Mock data for ad slider
  const adSlides = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      alt: 'Digital Marketing Services',
      targetUrl: '#ad1'
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
      alt: 'Premium Office Space for Rent',
      targetUrl: '#ad2'
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7',
      alt: 'Business Conference 2023',
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
      {/* About Hero */}
      <section className="bg-bcircle-blue text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 animate-fade-in">
            About CBN
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-white/80 animate-slide-up">
            The digital backbone of Chhattisgarh's business community
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-bcircle-blue/5 p-8 rounded-lg border border-bcircle-blue/20">
                <h2 className="font-montserrat font-semibold text-2xl mb-4 text-bcircle-blue">Our Vision</h2>
                <p className="text-muted-foreground">
                  "To become the digital backbone of Chhattisgarh's business community — one connection at a time."
                </p>
              </div>
              <div className="bg-bcircle-orange/5 p-8 rounded-lg border border-bcircle-orange/20">
                <h2 className="font-montserrat font-semibold text-2xl mb-4 text-bcircle-orange">Our Mission</h2>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Empower local businesses to be seen, found, and grow online</li>
                  <li>• Connect professionals and freelancers to real local opportunities</li>
                  <li>• Simplify B2B networking with smart listings, leads, and connections</li>
                  <li>• Make Raipur the starting point of a business revolution across the state</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Slider */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <AdSlider slides={adSlides} size="medium" />
        </div>
      </section>

      {/* The Idea Behind CBN */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-montserrat font-bold text-3xl text-center mb-12 text-bcircle-blue">
              The Idea Behind CBN
            </h2>
            
            <div className="space-y-8">
              <p className="text-muted-foreground">
                CBN was born from a simple observation: while Chhattisgarh has a vibrant and diverse business community, 
                many local businesses lacked the digital presence needed to thrive in today's economy. Traditional business 
                directories were outdated, and national platforms often overlooked the unique needs of our local business ecosystem.
              </p>
              
              <p className="text-muted-foreground">
                We created CBN to bridge this gap – providing a digital platform specifically designed for Chhattisgarh businesses, 
                starting with Raipur. Our focus is on meaningful connections rather than just listings, enabling direct communication 
                between businesses and customers through calls, WhatsApp, and email.
              </p>

              <p className="text-muted-foreground">
                As we grow, our vision extends beyond Raipur to create a statewide network of businesses, professionals, and 
                service providers – all connected through a single platform that understands and serves the local business landscape.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl text-center mb-12 text-bcircle-blue">
            What Makes Us Different
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-border shadow-sm hover-lift">
              <div className="h-12 w-12 bg-bcircle-blue/10 rounded-full flex items-center justify-center text-bcircle-blue mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-semibold text-xl mb-2">Truly Local Focus</h3>
              <p className="text-muted-foreground">
                Built by Chhattisgarh entrepreneurs specifically for local businesses and their unique needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-border shadow-sm hover-lift">
              <div className="h-12 w-12 bg-bcircle-blue/10 rounded-full flex items-center justify-center text-bcircle-blue mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-semibold text-xl mb-2">Direct Contact Model</h3>
              <p className="text-muted-foreground">
                No hidden lead fees or middlemen. Connect directly with businesses through calls, chat, or email.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-border shadow-sm hover-lift">
              <div className="h-12 w-12 bg-bcircle-blue/10 rounded-full flex items-center justify-center text-bcircle-blue mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-montserrat font-semibold text-xl mb-2">Simple & Effective</h3>
              <p className="text-muted-foreground">
                Clean, easy-to-use interface designed to help businesses connect without complexity or technical barriers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-bcircle-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">
            Join the CBN Community Today
          </h2>
          
          <p className="text-lg max-w-2xl mx-auto mb-8 text-white/80">
            Be part of Chhattisgarh's growing digital business network. Register your business now.
          </p>
          
          <Button asChild size="lg" className="bg-bcircle-orange hover:bg-bcircle-orange/90 text-white font-medium">
            <Link to="/register">Register Your Business</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
