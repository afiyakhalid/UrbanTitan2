import { Star } from "lucide-react";

export function RatingStars({ rating }: { rating: number }) {
  // Always round to 1 decimal
  const roundedRating = parseFloat(rating.toFixed(1));

  const fullStars = Math.floor(roundedRating);
  const hasHalf = roundedRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {/* Full Stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className="w-4 h-4 fill-yellow-500 text-yellow-500"
        />
      ))}

      {/* Half Star */}
      {hasHalf && <Star className="w-4 h-4 text-yellow-500" />}

      {/* Empty Stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
}
