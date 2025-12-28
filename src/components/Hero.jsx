import React from "react";
import { Play, Plus } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative h-[85vh] w-full text-white">
      {/* Background Image - Using a placeholder for Star Wars */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=2574&auto=format&fit=crop')",
        }}
      >
        {/* Gradient Overlay to make text readable and blend bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] via-black/40 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c0f] via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-4xl pt-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
          Star Wars: <br /> The Force Awakens
        </h1>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
          <span className="border border-gray-600 px-2 py-0.5 rounded text-xs">
            PG-13
          </span>
          <span>2h 15min</span>
          <span>•</span>
          <span>Action, Fantasy</span>
          <span>•</span>
          <span>2015</span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm md:text-base mb-8 max-w-2xl line-clamp-3">
          As a new threat to the galaxy rises, Rey, a desert scavenger, and
          Finn, an ex-stormtrooper, must join forces with Han Solo and Chewbacca
          to search for the one hope of restoring peace.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition">
            <Play className="w-5 h-5 fill-current" /> Watch Trailer
          </button>
          <button className="bg-gray-800/80 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 border border-gray-600 transition">
            <Plus className="w-5 h-5" /> Add Watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
