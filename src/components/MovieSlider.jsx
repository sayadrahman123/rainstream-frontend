import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const MovieSlider = ({ title, data, onPlay }) => {
  const sliderRef = useRef(null);

  const slideLeft = () => {
    sliderRef.current.scrollLeft -= 500;
  };

  const slideRight = () => {
    sliderRef.current.scrollLeft += 500;
  };

  return (
    <div className="px-8 md:px-16 py-8 group relative">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>

      {/* Navigation Buttons */}
      <button
        onClick={slideLeft}
        className="absolute left-4 top-1/2 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1/2"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={slideRight}
        className="absolute right-4 top-1/2 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1/2"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slider Container - FIXED SCROLLBAR HERE */}
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {data.map((movie) => (
          <div
            key={movie.id}
            onClick={() => {
              console.log("Clicked movie:", movie.title); // Debug log
              if (onPlay) onPlay(movie);
            }}
            className="flex-none w-[200px] cursor-pointer transition-transform duration-300 hover:scale-105 group/card relative"
          >
            {/* Image Container */}
            <div className="rounded-xl overflow-hidden aspect-[2/3] relative">
              <img
                src={movie.image || movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                  <Play className="w-5 h-5 fill-white text-white ml-1" />
                </div>
              </div>
            </div>

            {/* Title & Info */}
            <div className="mt-3">
              <h3 className="text-white font-medium truncate group-hover/card:text-green-400 transition-colors">
                {movie.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-400 mt-1">
                <span>{movie.genre ? movie.genre.split(",")[0] : "Movie"}</span>
                <span className="text-yellow-500">
                  ★ {movie.rating || "N/A"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
