
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
    <div className="bg-white rounded-md p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <Image className="h-5 w-5 text-bcircle-blue mr-2" />
        <h2 className="text-xl font-montserrat font-semibold">Photo Gallery</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="aspect-square rounded overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            onClick={() => openLightbox(image)}
          >
            <img 
              src={image.imageUrl} 
              alt={image.caption} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>
      
      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-white rounded-md shadow-xl overflow-hidden">
            <button 
              className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full"
              onClick={closeLightbox}
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="aspect-video w-full">
              <img 
                src={selectedImage.imageUrl} 
                alt={selectedImage.caption} 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="p-4 bg-white text-center">
              <p className="text-gray-700">{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessGallery;
