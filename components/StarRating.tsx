"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviews?: number;
  size?: "sm" | "md";
}

export default function StarRating({ rating, reviews, size = "md" }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i + 1 <= Math.floor(rating);
    const partial = !filled && i < rating;
    return { filled, partial };
  });

  const sz = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {stars.map((s, i) => (
          <Star
            key={i}
            className={`${sz} ${s.filled ? "fill-yellow-400 text-yellow-400" : s.partial ? "fill-yellow-400/50 text-yellow-400" : "text-gray-600"}`}
          />
        ))}
      </div>
      <span className={`font-semibold text-white ${size === "sm" ? "text-xs" : "text-sm"}`}>
        {rating.toFixed(1)}
      </span>
      {reviews !== undefined && (
        <span className={`text-gray-400 ${size === "sm" ? "text-xs" : "text-sm"}`}>
          ({reviews.toLocaleString()})
        </span>
      )}
    </div>
  );
}
