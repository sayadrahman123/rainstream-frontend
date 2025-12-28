import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const RankedSlider = ({ title, data, onPlay }) => {
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
        className="absolute left-4 top-1/2 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={slideRight}
        className="absolute right-4 top-1/2 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="flex gap-8 overflow-x-auto scroll-smooth pb-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {data.map((movie, index) => (
          <div
            key={movie.id}
            onClick={() => onPlay && onPlay(movie)}
            className="relative flex-none w-[280px] h-[180px] cursor-pointer group transition-transform duration-300 hover:scale-105"
          >
            {/* Big Number - Smaller & Centered Vertically */}
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[80px] font-bold text-[#1a1c21] leading-none z-0 stroke-text select-none">
              {index + 1}
            </span>
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[80px] font-bold text-transparent stroke-white stroke-2 leading-none z-10 opacity-30 select-none">
              {index + 1}
            </span>

            {/* Movie Image Card */}
            <div className="absolute right-0 top-0 w-[200px] h-[180px] rounded-xl overflow-hidden z-20 shadow-lg bg-[#1a1c21]">
              <img
                src={movie.cover || movie.backdropUrl || movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full">
                  <Play className="w-6 h-6 fill-white text-white ml-1" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankedSlider;
