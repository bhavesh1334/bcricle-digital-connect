
import React, { useState } from 'react';
import { Image, X } from 'lucide-react';
import { GalleryImage } from '@/data/businessData';

interface BusinessGalleryProps {
  images: GalleryImage[];
}

const BusinessGallery: React.FC<BusinessGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
  };
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center mb-6">
        <Image className="h-5 w-5 text-bcircle-blue mr-2" />
        <h2 className="text-2xl font-montserrat font-semibold text-gray-800">Photo Gallery</h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="aspect-square rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 group"
            onClick={() => openLightbox(image)}
          >
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all z-10"></div>
              <img 
                src={image.imageUrl} 
                alt={image.caption} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full bg-white rounded-lg shadow-2xl overflow-hidden">
            <button 
              className="absolute top-4 right-4 z-10 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-colors"
              onClick={closeLightbox}
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="aspect-video w-full bg-gray-100">
              <img 
                src={selectedImage.imageUrl} 
                alt={selectedImage.caption} 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="p-6 bg-white">
              <p className="text-gray-800 font-medium">{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessGallery;
