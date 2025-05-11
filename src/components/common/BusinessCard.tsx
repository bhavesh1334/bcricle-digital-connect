import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle } from 'lucide-react';

export interface Business {
  id: string;
  name: string;
  category: string;
  address: string | null;
  cover_image: string | null;
  logo_url: string | null;
  description: string;
  verified: boolean | null;
  whatsapp: string;
}

interface BusinessCardProps extends Business {}

const BusinessCard: React.FC<BusinessCardProps> = ({
  id,
  name,
  category,
  address,
  cover_image,
  logo_url,
  description,
  verified
}) => {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl group h-[400px] bg-black">
      {/* Background Image */}
      <img
        src={cover_image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'}
        alt={name}
        className="w-full h-full object-cover absolute inset-0 z-0"
      />
      {/* Gradient Overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
      {/* Glassy Content Overlay at bottom */}
      <div className="absolute left-0 right-0 bottom-0 z-20">
        <div className="backdrop-blur-md bg-white/10 rounded-2xl p-5 pt-8 shadow-lg">
          {/* Business Name & Description */}
          <h3 className="font-montserrat capitalize font-bold text-2xl text-white mb-1 leading-tight">
            {name}
          </h3>
          <p className="text-white/90 capitalize text-sm mb-3 line-clamp-2">
            {description}
          </p>
          {/* Address */}
          <div className="flex items-center text-white/80 text-sm mb-4">
            <MapPin className="h-4 w-4 mr-1 text-white/80" />
            <span className="truncate capitalize">{address}</span>
          </div>
          {/* Bottom Row: Category pill & View button */}
          <div className="flex items-center justify-between mt-2">
            <span className="backdrop-blur capitalize bg-white/20 text-white px-4 py-2 rounded-full text-sm shadow-sm">
              {category}
            </span>
            <Link to={`/business/${id}`}>
              <button className="rounded-full px-6 py-1.5 bg-white text-black font-semibold shadow hover:bg-white/30 transition-all backdrop-blur">
                View
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Logo and Verified badge at top left */}
      <div className="absolute top-5 left-5 z-30 flex items-center gap-2">
        {logo_url && (
          <div className="w-12 h-12 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white flex items-center justify-center">
            <img
              src={logo_url}
              alt={`${name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {verified && (
          <span className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full shadow text-bcircle-blue text-xs font-semibold ml-2">
            <CheckCircle className="h-5 w-5 text-bcircle-blue" /> <p>Verified</p>
          </span>
        )}
      </div>
    </div>
  );
};

export default BusinessCard; 