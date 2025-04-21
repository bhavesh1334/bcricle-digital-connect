
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import AdSlider from '@/components/common/AdSlider';

const Contact = () => {
  // Mock data for ad slider
  const adSlides = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7',
      alt: 'Business Conference 2023',
      targetUrl: '#ad1'
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      alt: 'Digital Marketing Services',
      targetUrl: '#ad2'
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
      alt: 'Premium Office Space for Rent',
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
      {/* Contact Hero */}
      <section className="bg-bcircle-blue text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 animate-fade-in">
            Contact Us
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white/80 animate-slide-up">
            Have questions about BCIRCLE? We're here to help you connect with Chhattisgarh's business community.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-montserrat font-bold text-2xl mb-6 text-bcircle-blue">
                Get In Touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-bcircle-blue/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-bcircle-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Visit Us</h3>
                    <p className="text-muted-foreground mt-1">
                      BCIRCLE Office<br />
                      Civil Lines, Raipur<br />
                      Chhattisgarh 492001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-bcircle-blue/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-bcircle-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Us</h3>
                    <p className="text-muted-foreground mt-1">
                      <a href="mailto:info@bcircle.in" className="hover:text-bcircle-blue">info@bcircle.in</a><br />
                      <a href="mailto:support@bcircle.in" className="hover:text-bcircle-blue">support@bcircle.in</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-bcircle-blue/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-bcircle-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Call Us</h3>
                    <p className="text-muted-foreground mt-1">
                      <a href="tel:+917000123456" className="hover:text-bcircle-blue">+91 7000 123 456</a><br />
                      <span className="text-sm">(Monday to Saturday, 9am to 6pm)</span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="mt-10">
                <h3 className="font-semibold text-lg mb-4">Find Us On Map</h3>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  {/* Placeholder for map - in a real implementation, you'd use Google Maps API */}
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Interactive Map Will Be Displayed Here
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg border border-border shadow-sm">
              <h2 className="font-montserrat font-bold text-2xl mb-6 text-bcircle-blue">
                Send Us a Message
              </h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                    <Input id="name" type="text" placeholder="John Doe" required />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                  <Input id="phone" type="tel" placeholder="+91 98765 43210" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input id="subject" type="text" placeholder="How can we help you?" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Your Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Write your message here..." 
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" className="bg-bcircle-blue hover:bg-bcircle-blue/90 w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
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

      {/* WhatsApp Support */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto bg-green-50 p-8 rounded-lg border border-green-200">
            <h2 className="font-montserrat font-bold text-2xl mb-4 text-green-600">
              Need Quick Support?
            </h2>
            
            <p className="text-green-700 mb-6">
              Connect with our support team directly on WhatsApp for faster assistance.
            </p>
            
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <a href="https://wa.me/917000123456?text=Hello%20BCIRCLE%2C%20I%20need%20assistance%20with%20" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
