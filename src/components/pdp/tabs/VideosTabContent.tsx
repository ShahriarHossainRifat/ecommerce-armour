// src/components/pdp/tabs/VideosTabContent.tsx
import React from "react";
import { FiPlay } from "react-icons/fi";

interface VideosTabContentProps {
  videoUrl?: string | null;
  thumbnailUrl?: string; // Optional thumbnail
  description?: string | null; // << CORRECTED: Make prop optional/nullable
}

const VideosTabContent: React.FC<VideosTabContentProps> = ({
  videoUrl,
  thumbnailUrl,
  description,
}) => {
  const hasVideo = !!videoUrl;

  // Safely handle optional description - only create display text if description exists
  const displayDescription = description
    ? `${description.substring(0, 200)}${description.length > 200 ? "..." : ""}` // Show excerpt if description exists
    : null; // Otherwise, it's null, and we won't render the paragraph

  return (
    <div className="space-y-6">
      {/* Conditionally render the description paragraph */}
      {displayDescription && (
        <p className="text-base text-brand-gray-dark leading-relaxed">
          {displayDescription}
        </p>
      )}

      {/* Video Player Area */}
      {hasVideo ? (
        <div className="aspect-video w-full max-w-3xl mx-auto bg-black rounded-lg relative overflow-hidden group cursor-pointer">
          {/* Simple placeholder - replace with actual video embed */}
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt="Video Thumbnail"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-t from-black/50 to-black/10 flex items-center justify-center">
              <span className="text-white text-xl">Video Placeholder</span>
            </div>
          )}
          {/* Play button overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
            <FiPlay className="w-16 h-16 text-white opacity-80" />
          </div>
          {/* TODO: Add onClick handler to open video player */}
        </div>
      ) : (
        <p className="text-center text-brand-gray-dark py-10">
          No video available for this product.
        </p>
      )}
    </div>
  );
};

export default VideosTabContent;
