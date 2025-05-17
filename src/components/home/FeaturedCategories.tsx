import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categoryService } from '@/services/categoryService';
import type { CategoryWithCount } from '@/services/categoryService';

// Category Card component
interface CategoryCardProps {
  icon: string;
  name: string;
  business_count: number;
  id: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, name, business_count, id }) => {
  return (
    <Link 
      to={`/categories/${id}`}
      className="flex flex-col items-center p-6 bg-white rounded-lg border border-border hover-lift card-hover group"
    >
      <div className="w-16 h-16 rounded-full bg-bcircle-blue/10 flex items-center justify-center text-bcircle-blue mb-4 group-hover:bg-bcircle-blue group-hover:text-white transition-colors">
        <img src={icon} alt={name} className="w-8 h-8" />
      </div>
      <h3 className="font-montserrat font-semibold text-lg mb-1 text-center group-hover:text-bcircle-blue transition-colors">{name}</h3>
      <p className="text-sm text-muted-foreground text-center">{business_count > 1 ? `${business_count} Businesses`: `${business_count} Business`}</p>
    </Link>
  );
};

// Skeleton Card component
const CategoryCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg border border-border animate-pulse">
      <div className="w-16 h-16 rounded-full bg-gray-200 mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};

// Main component
const FeaturedCategories = () => {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategoriesWithCount();
        setCategories(data);
      } catch (err) {
        setError('Failed to load categories');
        console.error('Error loading categories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return (
      <div className="py-16 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 text-bcircle-blue">
            Explore Business Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through Chhattisgarh's most popular business categories and find the services you need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {isLoading ? (
            <>
              {[...Array(9)].map((_, index) => (
                <CategoryCardSkeleton key={index} />
              ))}
            </>
          ) : (
            categories.slice(0, 9).map((category) => (
              <CategoryCard 
                key={category.id}
                icon={category.icon}
                name={category.name}
                business_count={category.business_count}
                id={category.id}
              />
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <Link to="/categories" className="inline-flex items-center text-bcircle-blue hover:text-bcircle-orange transition-colors font-medium">
            View All Categories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
