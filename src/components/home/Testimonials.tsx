
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    business: 'Devendra Nagar Pharmacy',
    text: 'Since joining BCIRCLE, my pharmacy has seen a 30% increase in new customers. The direct contact feature has made it so easy for people to reach us for urgent medication queries.',
    avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
    rating: 5
  },
  {
    id: 2,
    name: 'Rajesh Verma',
    business: 'DigitalEdge Solutions',
    text: 'As a tech company in Raipur, finding local clients was always challenging until we found BCIRCLE. The platform connects us directly with businesses needing our services.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5
  },
  {
    id: 3,
    name: 'Anjali Patel',
    business: 'Interiors By Design',
    text: 'BCIRCLE has transformed how we market our interior design services. The categorization is perfect, and we\'ve connected with real clients who found us through the platform.',
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
    rating: 4
  },
  {
    id: 4,
    name: 'Vivek Tiwari',
    business: 'Tiwari Chartered Accountants',
    text: 'The verified business badge has added credibility to our accounting practice. Clients trust us more, and our listing generates consistent leads every month.',
    avatar: 'https://randomuser.me/api/portraits/men/17.jpg',
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('');

  const nextTestimonial = () => {
    setDirection('right');
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setDirection('left');
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Generate rating stars
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <svg 
        key={index} 
        className={`h-5 w-5 ${index < rating ? 'text-bcircle-orange' : 'text-gray-300'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-16 bg-bcircle-blue text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">
            What Our Members Say
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Hear from businesses that have grown their network and customer base using BCIRCLE.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Cards */}
          <div className="relative h-[320px] sm:h-[280px] overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute top-0 left-0 w-full h-full transform transition-transform duration-500 ease-in-out bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 ${
                  index === activeIndex 
                    ? 'translate-x-0 opacity-100 z-10' 
                    : direction === 'right' 
                      ? 'translate-x-full opacity-0 z-0' 
                      : '-translate-x-full opacity-0 z-0'
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-6 h-full">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="text-center sm:text-left">
                      <div className="flex justify-center sm:justify-start">
                        {renderStars(testimonial.rating)}
                      </div>
                      <h3 className="font-montserrat font-semibold text-lg mt-2">{testimonial.name}</h3>
                      <p className="text-white/80 text-sm">{testimonial.business}</p>
                    </div>
                  </div>
                  
                  <div className="flex-grow flex items-center">
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 text-white/20 h-8 w-8" />
                      <p className="text-white/90 italic pl-6">{testimonial.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 'right' : 'left');
                  setActiveIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-white' : 'bg-white/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
