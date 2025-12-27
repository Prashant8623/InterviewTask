import React, { useState } from "react";

const GiftCard = ({ gif }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Use different image properties that are more reliable
  const staticUrl =
    gif.images?.fixed_height_still?.url || gif.images?.original_still?.url;
  const animatedUrl =
    gif.images?.fixed_height?.url || gif.images?.original?.url;

  return (
    <>
      <div
        className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow cursor-pointer bg-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={isHovered ? animatedUrl : staticUrl}
          alt={gif.title || "GIF"}
          className="w-full h-64 object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.src = gif.images?.original?.url || "";
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <p className="text-white text-sm font-medium truncate">
            {gif.title || "Untitled"}
          </p>
        </div>
      </div>
    </>
  );
};

export default GiftCard;
