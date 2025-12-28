import React from "react";
import { Star } from "lucide-react";

const RankedSection = ({ title, data }) => {
  return (
    <div className="px-8 md:px-16 py-8">
      <h2 className="text-xl text-white font-bold mb-8">{title}</h2>

      <div className="flex flex-col md:flex-row justify-between gap-6">
        {data.slice(0, 4).map((movie, index) => (
          <div
            key={index}
            className="flex items-center gap-4 group cursor-pointer flex-1"
          >
            {/* Big Ranking Number */}
            <span className="text-6xl font-bold text-white/20 group-hover:text-white transition duration-500">
              {index + 1}
            </span>

            <div className="flex gap-3">
              {/* Small Poster */}
              <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center">
                <span className="text-[10px] border border-gray-600 px-1 rounded text-gray-400 w-fit mb-1">
                  PG-13
                </span>
                <h3 className="text-white font-semibold text-sm line-clamp-1 group-hover:text-green-400 transition">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
                  <div className="flex items-center text-yellow-500 gap-0.5">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{movie.rating}</span>
                  </div>
                  <span>• Movie</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankedSection;
