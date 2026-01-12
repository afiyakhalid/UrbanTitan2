import { type RatingBreakdownItem } from "@/lib/types";
import { Star } from "lucide-react";

export function ProductRatings({
  rating,
  reviewCount,
  ratingBreakdown,
}: {
  rating: number;
  reviewCount: number;
  ratingBreakdown: RatingBreakdownItem[];
}) {
  return (
    <div className="mt-12 p-4 border-t border-gray-200">
      <h3 className="text-2xl font-normal mb-4">Ratings</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Summary */}
        <div className="text-center">
          <p className="text-5xl font-semibold">
            {Number(rating).toFixed(1)}
            <span className="text-xl">/5.0</span>
          </p>

          <p className="text-gray-500 mt-2">From {reviewCount} customers</p>
        </div>

        {/* Rating Bars */}
        <div className="md:col-span-2 space-y-2">
          {ratingBreakdown.map((item) => {
            const percent = (item.count / reviewCount) * 100;

            return (
              <div
                key={item.stars}
                className="flex items-center text-sm text-gray-600"
              >
                <span className="w-10 flex items-center gap-1 text-black">
                  {item.stars}{" "}
                  <Star className="w-4 h-4 inline-flex text-yellow-500 fill-yellow-500" />
                </span>

                <div className="w-full bg-gray-200 h-2 rounded mx-2">
                  <div
                    className="h-2 rounded bg-green-500"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

                <span>{item.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
