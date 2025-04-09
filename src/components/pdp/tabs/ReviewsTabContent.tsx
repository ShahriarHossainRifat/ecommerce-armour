// src/components/pdp/tabs/ReviewsTabContent.tsx
import React from "react";
import { FiStar } from "react-icons/fi";

// Placeholder types - define based on your actual review data structure
interface Review {
  id: string | number;
  author: string;
  date: string; // Or Date object
  rating: number;
  text: string;
  imageUrl?: string | null; // User pic
  images?: string[] | null; // Images attached to review
}

interface ReviewsTabContentProps {
  productId: string | number;
  overallRating: number;
  totalReviews: number;
  ratingDistribution: {
    // Example structure
    excellent: number;
    good: number;
    average: number;
    belowAverage: number;
    poor: number;
  };
  reviews: Review[];
}

const RatingBar: React.FC<{
  label: string;
  percentage: number;
  count: number;
}> = ({ label, percentage, count }) => (
  <div className="flex items-center gap-4">
    <span className="w-28 text-right text-base font-medium text-black">
      {label}
    </span>
    <div className="flex-grow h-[5px] bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-brand-warning rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    <span className="w-8 text-right text-base font-medium text-black opacity-40">
      {count}
    </span>
  </div>
);

const ReviewItem: React.FC<{ review: Review }> = ({ review }) => (
  <div className="flex gap-4 py-6 border-b border-gray-100 last:border-b-0">
    <img
      src={
        review.imageUrl ||
        `https://via.placeholder.com/56x56/cccccc/969696?text=${review.author[0]}`
      }
      alt={review.author}
      className="w-14 h-14 rounded-full object-cover flex-shrink-0"
    />
    <div className="flex-grow space-y-2">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <h4 className="text-base font-semibold text-black">{review.author}</h4>
        <span className="text-sm text-black opacity-50">{review.date}</span>
      </div>
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`w-4 h-4 ${
              i < review.rating
                ? "text-brand-warning fill-current"
                : "text-gray-300 fill-current"
            }`}
          />
        ))}
      </div>
      <p className="text-base text-brand-gray-dark leading-relaxed">
        {review.text}
      </p>
      {/* Display review images if available */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 pt-2">
          {review.images.map((imgSrc, idx) => (
            <img
              key={idx}
              src={imgSrc}
              alt={`Review image ${idx + 1}`}
              className="w-20 h-20 object-cover rounded-md"
            />
          ))}
        </div>
      )}
    </div>
  </div>
);

const ReviewsTabContent: React.FC<ReviewsTabContentProps> = ({
  overallRating,
  totalReviews,
  ratingDistribution,
  reviews = [],
}) => {
  // Calculate percentages
  const calcPercent = (count: number) =>
    totalReviews > 0 ? (count / totalReviews) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Overall Rating Summary */}
      <div>
        <h3 className="text-xl font-medium text-black mb-6">
          Reviews ({totalReviews})
        </h3>
        <div className="flex flex-col md:flex-row items-start gap-8 lg:gap-12">
          {/* Average Rating Block */}
          <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl text-center">
            <span className="text-5xl font-medium text-black mb-2">
              {overallRating.toFixed(1)}
            </span>
            <span className="text-base text-black opacity-50 mb-3">
              of {totalReviews} reviews
            </span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.round(overallRating)
                      ? "text-brand-warning fill-current"
                      : "text-gray-300 fill-current"
                  }`}
                />
              ))}
            </div>
          </div>
          {/* Rating Distribution Bars */}
          <div className="flex-grow space-y-4">
            <RatingBar
              label="Excellent"
              percentage={calcPercent(ratingDistribution.excellent)}
              count={ratingDistribution.excellent}
            />
            <RatingBar
              label="Good"
              percentage={calcPercent(ratingDistribution.good)}
              count={ratingDistribution.good}
            />
            <RatingBar
              label="Average"
              percentage={calcPercent(ratingDistribution.average)}
              count={ratingDistribution.average}
            />
            <RatingBar
              label="Below Average"
              percentage={calcPercent(ratingDistribution.belowAverage)}
              count={ratingDistribution.belowAverage}
            />
            <RatingBar
              label="Poor"
              percentage={calcPercent(ratingDistribution.poor)}
              count={ratingDistribution.poor}
            />
          </div>
        </div>
      </div>

      {/* Leave Review Input */}
      {/* TODO: Expand this into a full review form with rating input etc. */}
      <div className="relative">
        <textarea
          rows={3}
          placeholder="Leave Comment"
          className="w-full border border-brand-gray-dark rounded-lg p-4 text-base focus:ring-brand-primary focus:border-brand-primary resize-none"
        />
        {/* <Button variant="dark" size="sm" className="absolute bottom-3 right-3">Submit</Button> */}
      </div>

      {/* Review List */}
      <div className="space-y-6">
        <h4 className="text-lg font-medium text-black">Customer Reviews</h4>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))
        ) : (
          <p className="text-brand-gray-dark">No reviews yet.</p>
        )}
      </div>
      {/* TODO: Add Load More button if there are many reviews */}
    </div>
  );
};

export default ReviewsTabContent;
