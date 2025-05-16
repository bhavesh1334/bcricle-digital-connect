import React from 'react';
import { Link } from 'react-router-dom';
import type { CategoryWithCount } from '@/services/categoryService';

interface CategoryCardProps extends CategoryWithCount {}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  icon,
  business_count
}) => {
  return (
    <Link 
      to={`/categories/${id}`}
      className="relative rounded-2xl overflow-hidden shadow-xl group h-[300px] bg-black"
    >
      {/* Background Image */}
      <img
        src={icon || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'}
        alt={name}
        className="w-full h-full object-cover absolute inset-0 z-0"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
      {/* Glassy Content Overlay */}
      <div className="absolute left-0 right-0 bottom-0 z-20">
        <div className="backdrop-blur-md bg-white/10 rounded-2xl p-5 pt-8 shadow-lg">
          {/* Category Name */}
          <h3 className="font-montserrat capitalize font-bold text-2xl text-white mb-1 leading-tight">
            {name}
          </h3>
          {/* Business Count */}
          <div className="flex items-center justify-between mt-2">
            <span className="backdrop-blur bg-white/20 text-white px-4 py-2 rounded-full text-sm shadow-sm">
              {business_count} Businesses
            </span>
            <span className="rounded-full px-6 py-1.5 bg-white text-black font-semibold shadow hover:bg-white/30 transition-all backdrop-blur">
              View
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard; 