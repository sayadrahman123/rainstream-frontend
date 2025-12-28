import React from "react";
import { Play, Plus, ChevronLeft, ChevronRight, Star } from "lucide-react";

const BottomGrid = () => {
  return (
    <div className="px-8 md:px-16 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* === COLUMN 1 & 2: Movies On Awards (Takes 50% width) === */}
        <div className="lg:col-span-2">
          <SectionHeader title="Movies On Awards" />

          <div className="relative rounded-xl overflow-hidden h-[400px] group">
            <img
              src="https://image.tmdb.org/t/p/original/aMpyrCizvSdc0UIMbl71quOVZMH.jpg" // Gundala Placeholder
              alt="Gundala"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] via-black/40 to-transparent"></div>

            <div className="absolute bottom-0 left-0 p-6 w-full">
              <span className="bg-white/20 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded border border-white/10 mb-3 inline-block">
                Best Pictures
              </span>
              <h3 className="text-3xl font-bold text-white mb-2">Gundala</h3>

              <div className="flex items-center gap-3 text-xs text-gray-300 mb-3">
                <div className="flex items-center text-yellow-500 gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span>4.6</span>
                </div>
                <span>• 2h 4m • 2022 • Superhero</span>
              </div>

              <p className="text-gray-400 text-xs line-clamp-2 mb-4">
                When international arms dealer and criminal mastermind Elena
                Federova orchestrates seven simultaneous New York City bank
                heists...
              </p>

              <div className="flex gap-3">
                <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-medium text-xs flex items-center gap-2 transition">
                  <Play className="w-3 h-3 fill-current" /> Play Now
                </button>
                <button className="bg-transparent hover:bg-white/10 text-white px-5 py-2 rounded-full font-medium text-xs flex items-center gap-2 border border-gray-500 transition">
                  <Plus className="w-3 h-3" /> Add Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* === COLUMN 3: Fast === */}
        <div className="lg:col-span-1">
          <SectionHeader title="Fast" />
          <div className="flex flex-col gap-4">
            <SmallListCard
              title="Oppenheimer"
              rating="4.9"
              image="https://image.tmdb.org/t/p/w200/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
            />
            <SmallListCard
              title="The End Movie"
              rating="4.8"
              image="https://image.tmdb.org/t/p/w200/r2J02Z2OpLYct205oej9oQAeSjA.jpg"
            />
            <SmallListCard
              title="The Flash"
              rating="4.6"
              image="https://image.tmdb.org/t/p/w200/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg"
            />
            <SmallListCard
              title="Fall"
              rating="4.4"
              image="https://image.tmdb.org/t/p/w200/9f5sIJEgvUpFv0ozfA6TurG4j22.jpg"
            />
          </div>
        </div>

        {/* === COLUMN 4: Live === */}
        <div className="lg:col-span-1">
          <SectionHeader title="Live" hasRedDot />
          <div className="flex flex-col gap-4">
            <SmallListCard
              title="Sonic 2; The..."
              rating="4.9"
              image="https://image.tmdb.org/t/p/w200/6DrHO1jr3qVrViUO8s08QCTSNmE.jpg"
            />
            <SmallListCard
              title="Pathaan"
              rating="4.8"
              image="https://image.tmdb.org/t/p/w200/m1b9cq7BEGL8oPp2iO1CVrERQTJ.jpg"
            />
            <SmallListCard
              title="Black Adam"
              rating="4.6"
              image="https://image.tmdb.org/t/p/w200/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg"
            />
            <SmallListCard
              title="Indemnity"
              rating="4.4"
              image="https://image.tmdb.org/t/p/w200/tVj5dn15xgLkDqvP0E9h3537W0W.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper: Header with Navigation Arrows
const SectionHeader = ({ title, hasRedDot }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-1">
      <h3 className="text-white font-bold text-lg">{title}</h3>
      {hasRedDot && (
        <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1"></div>
      )}
    </div>
    <div className="flex gap-2">
      <button className="p-1 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition">
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button className="p-1 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

// Helper: Small List Item
const SmallListCard = ({ title, rating, image }) => (
  <div className="flex gap-3 items-center group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition">
    <img
      src={image}
      alt={title}
      className="w-12 h-12 rounded-lg object-cover"
    />
    <div>
      <span className="text-[9px] border border-gray-600 px-1 rounded text-gray-400">
        PG-13
      </span>
      <h4 className="text-white font-medium text-sm mt-0.5 group-hover:text-green-400 transition">
        {title}
      </h4>
      <div className="flex items-center gap-2 text-gray-500 text-[10px]">
        <Star className="w-2.5 h-2.5 text-yellow-500 fill-current" />
        <span>{rating} | Movie</span>
      </div>
    </div>
  </div>
);

export default BottomGrid;
