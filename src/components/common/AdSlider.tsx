
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AdSliderProps {
  slides: {
    id: number;
    imageUrl: string;
    alt: string;
    targetUrl: string;
  }[];
  size?: 'large' | 'medium';
  autoplaySpeed?: number;
}

const AdSlider: React.FC<AdSliderProps> = ({ 
  slides, 
  size = 'medium',
  autoplaySpeed = 5000 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Handle navigation between slides
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-rotate slides
  useEffect(() => {
    if (autoplaySpeed <= 0) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, autoplaySpeed);
    
    return () => clearInterval(timer);
  }, [currentSlide, autoplaySpeed]);

  // Define height based on size prop
  const height = size === 'large' ? 'h-[400px] sm:h-[500px]' : 'h-[200px] sm:h-[300px]';

  return (
    <div className={`relative w-full ${height} overflow-hidden rounded-lg shadow-md`}>
      {/* Slides */}
      <div className="h-full w-full">
        {slides.map((slide, index) => (
          <a 
            key={slide.id}
            href={slide.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img 
              src={slide.imageUrl} 
              alt={slide.alt} 
              className="w-full h-full object-cover object-center"
            />
          </a>
        ))}
      </div>

      {/* Navigation Controls */}
      <button 
        className="absolute top-1/2 left-2 z-20 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button 
        className="absolute top-1/2 right-2 z-20 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdSlider;
