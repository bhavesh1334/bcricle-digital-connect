
import React from 'react';
import { MessageSquare, Star } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Review } from '@/data/businessData';

interface BusinessReviewsProps {
  reviews: Review[];
}

const BusinessReviews: React.FC<BusinessReviewsProps> = ({ reviews }) => {
  // Generate stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-bcircle-orange text-bcircle-orange" />);
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="relative">
          <Star className="h-4 w-4 text-bcircle-orange" />
          <Star className="absolute top-0 left-0 h-4 w-4 fill-bcircle-orange text-bcircle-orange overflow-hidden" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </span>
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-md p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <MessageSquare className="h-5 w-5 text-bcircle-blue mr-2" />
          <h2 className="text-xl font-montserrat font-semibold">Reviews</h2>
        </div>
        <Button variant="outline" size="sm" className="text-bcircle-blue">Write a Review</Button>
      </div>
      
      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
              <div className="flex items-start">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={review.userImage} alt={review.userName} />
                  <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center mb-1">
                    <h3 className="text-base font-medium mr-2">{review.userName}</h3>
                    <span className="text-xs text-gray-500">{formatDate(review.date)}</span>
                  </div>
                  
                  <div className="flex mb-3">
                    {renderStars(review.rating)}
                  </div>
                  
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {reviews.length > 3 && (
        <div className="mt-6 text-center">
          <Button variant="outline" size="sm" className="text-bcircle-blue">View All Reviews</Button>
        </div>
      )}
    </div>
  );
};

export default BusinessReviews;
