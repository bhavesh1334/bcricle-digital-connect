import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdSlider from '@/components/common/AdSlider';
import CategoryCard from '@/components/common/CategoryCard';
import { categoryService } from '@/services/categoryService';
import type { CategoryWithCount } from '@/services/categoryService';

interface CategoryGroup {
  groupName: string;
  categories: CategoryWithCount[];
}

const ITEMS_PER_PAGE = 12; // Number of items to show per page

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

const Categories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch categories
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

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Group paginated categories
  const paginatedGroups = paginatedCategories.reduce<CategoryGroup[]>((groups, category) => {
    const firstLetter = category.name[0].toUpperCase();
    const existingGroup = groups.find(g => g.groupName === firstLetter);
    
    if (existingGroup) {
      existingGroup.categories.push(category);
    } else {
      groups.push({
        groupName: firstLetter,
        categories: [category]
      });
    }
    
    return groups;
  }, []).sort((a, b) => a.groupName.localeCompare(b.groupName));

  if (error) {
    return (
      <MainLayout>
        <div className="py-16 text-center text-red-600">
          <p>{error}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Categories Hero */}
        <section className="bg-bcircle-blue text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 animate-fade-in">
              Business Categories
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-white/80 animate-slide-up">
              Explore businesses across Chhattisgarh by category. Find exactly what you're looking for.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-10 relative animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5" />
              <Input 
                type="search" 
                placeholder="Search categories..." 
                className="pl-10 pr-4 w-full bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Ad Slider */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <AdSlider slides={adSlides} size="medium" />
          </div>
        </section>

        {/* Categories List */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
                  <CategoryCardSkeleton key={index} />
                ))}
              </div>
            ) : paginatedCategories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginatedCategories.map((category) => (
                  <CategoryCard
                    key={category.id} 
                    {...category}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-4">No categories found</h2>
                <p className="text-muted-foreground mb-6">Try adjusting your search term or browse all categories.</p>
                <Button onClick={() => setSearchTerm('')} className="bg-bcircle-blue hover:bg-bcircle-blue/90">
                  Show All Categories
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default Categories;
