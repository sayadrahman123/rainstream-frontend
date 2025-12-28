import React from "react";

const ReleaseHero = () => {
  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      {/* Background Collage */}
      <div className="absolute inset-0 grid grid-cols-4 opacity-60">
        <img
          src="https://image.tmdb.org/t/p/original/mDFGOzrN0c7X65F0tK9M113E390.jpg"
          className="h-full w-full object-cover"
          alt="Backdrop"
        />
        <img
          src="https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg"
          className="h-full w-full object-cover"
          alt="Backdrop"
        />
        <img
          src="https://image.tmdb.org/t/p/original/h8gHn0OzRogZlqZfbPaR8Wf62dB.jpg"
          className="h-full w-full object-cover"
          alt="Backdrop"
        />
        <img
          src="https://image.tmdb.org/t/p/original/z7noaCJ4KtmhwHw7QBGzt0csRsG.jpg"
          className="h-full w-full object-cover"
          alt="Backdrop"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] via-[#0b0c0f]/80 to-[#0b0c0f]/40"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 pt-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight max-w-4xl">
          Schedule Release All <br /> Movie Around The World
        </h1>
        <p className="text-gray-400 text-sm max-w-xl">
          Get up to date to movie schedule release all around the world
        </p>
      </div>
    </div>
  );
};

export default ReleaseHero;
