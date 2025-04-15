// src/components/pdp/tabs/ReviewsTabContent.tsx
import React from "react";
// *** ENSURE Review TYPE IS IMPORTED CORRECTLY ***
import { Review } from "../../../types/product"; // Adjust path if needed
import { FiStar } from "react-icons/fi";

// Props received from ProductTabs
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
  reviews: Review[]; // Use the reviews array passed down
}

// RatingBar component (can be moved to UI folder)
const RatingBar: React.FC<{
  label: string;
  percentage: number;
  count: number;
}> = ({ label, percentage, count }) => (
  <div className="flex items-center gap-2 sm:gap-4">
    <span className="w-20 sm:w-28 text-right text-sm sm:text-base font-medium text-black flex-shrink-0">
      {label}
    </span>
    <div className="flex-grow h-[5px] bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-brand-warning rounded-full"
        style={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
      ></div>{" "}
      {/* Ensure percentage is valid */}
    </div>
    <span className="w-8 text-right text-sm sm:text-base font-medium text-black opacity-40">
      {count}
    </span>
  </div>
);

// ReviewItem component (can be moved to UI or reviews folder)
const ReviewItem: React.FC<{ review: Review }> = ({ review }) => (
  <div className="flex flex-col sm:flex-row gap-4 py-6 border-b border-gray-100 last:border-b-0">
    {/* Avatar */}
    <div className="flex-shrink-0 flex flex-col items-center sm:w-20">
      <img
        src={
          review.imageUrl ||
          `https://via.placeholder.com/56x56/cccccc/808080?text=${review.author.charAt(
            0
          )}`
        } // Fallback to initial
        alt={review.author}
        className="w-14 h-14 rounded-full object-cover"
      />
      <span className="text-xs text-gray-500 mt-1 text-center break-words">
        {review.author}
      </span>
    </div>
    {/* Content */}
    <div className="flex-grow space-y-2">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        {/* Rating */}
        <div
          className="flex items-center gap-0.5"
          title={`${review.rating} out of 5 stars`}
        >
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
        {/* Date */}
        <span className="text-sm text-black opacity-50 mt-1 sm:mt-0">
          {review.date}
        </span>
      </div>
      {/* Text */}
      <p className="text-base text-brand-gray-dark leading-relaxed">
        {review.text}
      </p>
      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 pt-2 flex-wrap">
          {review.images.map((imgSrc, idx) => (
            <img
              key={idx}
              src={imgSrc}
              alt={`Review image ${idx + 1}`}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border"
              loading="lazy"
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
  reviews = [], // Use the reviews array passed via props, default to empty
}) => {
  // Calculate percentages for distribution bars
  const calcPercent = (count: number) =>
    totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;

  return (
    <div className="space-y-8 md:space-y-10">
      {/* Overall Rating Summary */}
      <div>
        <h3 className="text-xl font-medium text-black mb-6">
          Reviews ({totalReviews})
        </h3>
        <div className="flex flex-col md:flex-row items-start gap-6 lg:gap-12">
          {/* Average Rating Block */}
          <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl text-center w-full md:w-auto flex-shrink-0">
            <span className="text-5xl font-medium text-black mb-1">
              {overallRating.toFixed(1)}
            </span>
            <div className="flex items-center gap-0.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(overallRating)
                      ? "text-brand-warning fill-current"
                      : "text-gray-300 fill-current"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-black opacity-50">
              Based on {totalReviews} reviews
            </span>
          </div>
          {/* Rating Distribution Bars */}
          <div className="flex-grow space-y-3 w-full">
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

      {/* Leave Review Input (Placeholder Form) */}
      <div className="pt-4">
        <h4 className="text-lg font-medium text-black mb-3">Leave a Review</h4>
        <textarea
          rows={4}
          placeholder="Share your thoughts about this product..."
          className="w-full border border-brand-gray-dark rounded-lg p-3 text-base focus:ring-brand-primary focus:border-brand-primary resize-vertical"
        />
        {/* TODO: Add rating input (stars) and submit logic */}
        {/* <Button variant="dark" size="md" className="mt-3">Submit Review</Button> */}
      </div>

      {/* Review List */}
      <div>
        <h4 className="text-lg font-medium text-black mb-2">
          Customer Reviews
        </h4>
        {reviews.length > 0 ? (
          <div className="space-y-0 divide-y divide-gray-100">
            {" "}
            {/* Use divide for subtle separators */}
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-brand-gray-dark py-6 text-center">
            No reviews yet for this product.
          </p>
        )}
      </div>
      {/* TODO: Add Load More Reviews button if applicable */}
    </div>
  );
};

export default ReviewsTabContent;
