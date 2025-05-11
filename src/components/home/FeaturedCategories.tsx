
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Category Card component
interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  slug: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, title, count, slug }) => {
  return (
    <Link 
      to={`/businesses`}
      className="flex flex-col items-center p-6 bg-white rounded-lg border border-border hover-lift card-hover group"
    >
      <div className="w-16 h-16 rounded-full bg-bcircle-blue/10 flex items-center justify-center text-bcircle-blue mb-4 group-hover:bg-bcircle-blue group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="font-montserrat font-semibold text-lg mb-1 text-center group-hover:text-bcircle-blue transition-colors">{title}</h3>
      <p className="text-sm text-muted-foreground text-center">{count} Businesses</p>
    </Link>
  );
};

// Main component
const FeaturedCategories = () => {
  const categories = [
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>,
      title: 'Web Development & IT',
      count: 84,
      slug: 'web-development'
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>,
      title: 'Accounting Services',
      count: 67,
      slug: 'accounting'
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>,
      title: 'Digital Marketing',
      count: 56,
      slug: 'digital-marketing'
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>,
      title: 'Real Estate & Builders',
      count: 102,
      slug: 'real-estate'
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>,
      title: 'Healthcare Services',
      count: 78,
      slug: 'healthcare'
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>,
      title: 'Interior Design',
      count: 41,
      slug: 'interior-design'
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>,
      title: 'Financial Services',
      count: 59,
      slug: 'financial-services'
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
            </svg>,
      title: 'Event Management',
      count: 36,
      slug: 'event-management'
    },
  ];

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index}
              icon={category.icon}
              title={category.title}
              count={category.count}
              slug={category.slug}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/businesses" className="inline-flex items-center text-bcircle-blue hover:text-bcircle-orange transition-colors font-medium">
            View All Categories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
