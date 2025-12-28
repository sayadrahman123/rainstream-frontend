import React from "react";
import { Play, Plus, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { addToWatchlist } from "../services/watchlistService"; // <--- 1. IMPORT

const AwardsSection = ({ movies, onPlay }) => {
  if (!movies || movies.length === 0) return null;

  const awardMovie =
    movies.find((m) => m.rating >= 8.5 && m.genre?.includes("Drama")) ||
    movies[0];

  const fastMovies = movies
    .filter((m) => m.genre?.includes("Action") && m.id !== awardMovie.id)
    .slice(0, 4);

  const liveMovies = movies
    .filter(
      (m) =>
        (m.genre?.includes("Adventure") || m.genre?.includes("Sci-Fi")) &&
        m.id !== awardMovie.id
    )
    .slice(0, 4);

  // 2. HANDLER FUNCTION
  const handleAddToWatchlist = async (e, movie) => {
    e.stopPropagation();
    try {
      await addToWatchlist(movie.id);
      alert(`"${movie.title}" added to your Watchlist!`);
    } catch (error) {
      alert("Please login to use the Watchlist.");
    }
  };

  return (
    <div className="px-8 md:px-16 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Award Movie */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">Movies On Awards</h3>
            <div className="flex gap-2">
              <button className="p-1 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            className="relative rounded-2xl overflow-hidden h-[400px] group w-full cursor-pointer"
            onClick={() => onPlay(awardMovie)}
          >
            <img
              src={awardMovie.backdropUrl || awardMovie.posterUrl}
              alt={awardMovie.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] via-black/40 to-transparent"></div>

            <div className="absolute bottom-0 left-0 p-8 w-full">
              <span className="bg-white/20 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-md border border-white/10 mb-3 inline-block">
                Best Picture Nominee
              </span>
              <h3 className="text-3xl font-bold text-white mb-2">
                {awardMovie.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-gray-300 mb-4">
                <div className="flex items-center text-yellow-500 gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{awardMovie.rating || "N/A"}</span>
                </div>
                <span>
                  •{" "}
                  {awardMovie.duration
                    ? `${Math.round(awardMovie.duration / 60)}m`
                    : "2h"}{" "}
                  • {awardMovie.year} • {awardMovie.genre}
                </span>
              </div>

              <p className="text-gray-400 text-xs line-clamp-2 mb-6 max-w-lg">
                {awardMovie.description}
              </p>

              <div className="flex gap-4">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-full font-medium text-xs flex items-center gap-2 transition">
                  <Play className="w-4 h-4 fill-current" /> Play Now
                </button>

                {/* 3. ATTACH HANDLER HERE */}
                <button
                  onClick={(e) => handleAddToWatchlist(e, awardMovie)}
                  className="bg-transparent hover:bg-white/10 text-white px-6 py-2.5 rounded-full font-medium text-xs flex items-center gap-2 border border-gray-500 transition"
                >
                  <Plus className="w-4 h-4" /> Add Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Fast (Action) */}
        <div className="lg:col-span-1">
          <SectionHeader title="Fast & Furious" />
          <div className="flex flex-col gap-4">
            {fastMovies.map((movie) => (
              <SmallListCard key={movie.id} movie={movie} onPlay={onPlay} />
            ))}
          </div>
        </div>

        {/* Column 4: Live (Sci-Fi) */}
        <div className="lg:col-span-1">
          <SectionHeader title="Sci-Fi & Live" hasRedDot />
          <div className="flex flex-col gap-4">
            {liveMovies.map((movie) => (
              <SmallListCard key={movie.id} movie={movie} onPlay={onPlay} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helpers ---
const SectionHeader = ({ title, hasRedDot }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-1">
      <h3 className="text-white font-bold text-lg">{title}</h3>
      {hasRedDot && (
        <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1"></div>
      )}
    </div>
  </div>
);

const SmallListCard = ({ movie, onPlay }) => (
  <div
    onClick={() => onPlay(movie)}
    className="flex gap-3 items-center group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition"
  >
    <img
      src={movie.posterUrl}
      alt={movie.title}
      className="w-12 h-16 rounded-md object-cover border border-gray-800"
    />
    <div className="flex flex-col justify-center">
      <span className="text-[9px] border border-gray-600 px-1 rounded text-gray-400 w-fit mb-1">
        HD
      </span>
      <h4 className="text-white font-medium text-sm group-hover:text-green-400 transition line-clamp-1">
        {movie.title}
      </h4>
      <div className="flex items-center gap-2 text-gray-500 text-[10px] mt-0.5">
        <Star className="w-2.5 h-2.5 text-yellow-500 fill-current" />
        <span>{movie.rating}</span>
        <span>•</span>
        <span>Movie</span>
      </div>
    </div>
  </div>
);

export default AwardsSection;
