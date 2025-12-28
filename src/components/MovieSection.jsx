import React from "react";
import { Star } from "lucide-react";

const MovieSection = ({ title, data }) => {
  return (
    <div className="px-8 md:px-16 py-8">
      <h2 className="text-xl text-white font-bold mb-6 border-l-4 border-green-500 pl-3">
        {title}
      </h2>

      {/* Scrollable Container */}
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {data.map((movie, index) => (
          <div
            key={index}
            className="min-w-[180px] md:min-w-[220px] cursor-pointer group"
          >
            {/* Poster Image */}
            <div className="relative overflow-hidden rounded-xl mb-3 h-[280px] md:h-[320px]">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition"></div>
            </div>

            {/* Movie Info */}
            <h3 className="text-white font-medium truncate group-hover:text-green-400 transition">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-400 text-xs mt-1">
              <div className="flex items-center text-yellow-500 gap-1">
                <Star className="w-3 h-3 fill-current" />
                <span>{movie.rating}</span>
              </div>
              <span>•</span>
              <span>{movie.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSection;
