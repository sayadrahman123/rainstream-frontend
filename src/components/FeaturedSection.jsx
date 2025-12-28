import React from "react";
import { Play, Plus, Star, Check } from "lucide-react"; // Imported 'Check' for feedback
import { addToWatchlist } from "../services/watchlistService"; // <--- 1. IMPORT

const FeaturedSection = ({ movies, onPlay }) => {
  if (!movies || movies.length === 0) return null;

  // Filter Logic
  let featuredList = movies.filter(
    (m) => m.featured === true || m.isFeatured === true
  );
  if (featuredList.length === 0) {
    featuredList = [...movies]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 4);
  }

  const mainMovie = featuredList[0];
  const sideMovies = featuredList.slice(1, 4);

  // 2. HANDLER FUNCTION
  const handleAddToWatchlist = async (e, movie) => {
    e.stopPropagation(); // Stop the click from playing the movie
    try {
      await addToWatchlist(movie.id);
      alert(`"${movie.title}" added to your Watchlist!`);
      // In a real app, you'd change the icon state here
    } catch (error) {
      alert("Please login to use the Watchlist.");
    }
  };

  return (
    <div className="px-8 md:px-16 py-12">
      <div className="mb-8">
        <h2 className="text-2xl text-white font-bold mb-2">
          Featured in RainStream
        </h2>
        <p className="text-gray-400 text-sm">Best featured for you today</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Highlight */}
        <div
          className="lg:col-span-2 relative rounded-2xl overflow-hidden h-[400px] md:h-[500px] group cursor-pointer"
          onClick={() => onPlay(mainMovie)}
        >
          <img
            src={mainMovie.backdropUrl || mainMovie.posterUrl}
            alt={mainMovie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] via-black/50 to-transparent"></div>

          <div className="absolute bottom-0 left-0 p-8 w-full">
            <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-md border border-white/10 mb-4 inline-block">
              Trending #{mainMovie.id}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {mainMovie.title}
            </h3>

            <div className="flex items-center gap-3 text-sm text-gray-300 mb-4">
              <div className="flex items-center text-yellow-500 gap-1">
                <Star className="w-4 h-4 fill-current" />
                <span>{mainMovie.rating || "N/A"}</span>
              </div>
              <span>
                • {mainMovie.year || "2023"} • {mainMovie.genre || "Movie"}
              </span>
            </div>

            <p className="text-gray-300 text-sm md:text-base mb-6 max-w-xl line-clamp-2">
              {mainMovie.description}
            </p>

            <div className="flex items-center gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 text-sm transition">
                <Play className="w-4 h-4 fill-current" /> Play Now
              </button>

              {/* 3. ATTACH HANDLER HERE */}
              <button
                onClick={(e) => handleAddToWatchlist(e, mainMovie)}
                className="bg-gray-800/80 hover:bg-gray-700 text-white px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 border border-gray-600 text-sm transition"
              >
                <Plus className="w-4 h-4" /> Add Watchlist
              </button>
            </div>
          </div>
        </div>

        {/* Side List */}
        <div className="flex flex-col gap-4">
          {sideMovies.map((movie) => (
            <SideCard key={movie.id} movie={movie} onPlay={onPlay} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SideCard = ({ movie, onPlay }) => (
  <div
    onClick={() => onPlay(movie)}
    className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition cursor-pointer group"
  >
    <div className="w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden border border-gray-800">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
      />
    </div>
    <div className="flex flex-col justify-center">
      <h4 className="text-white font-semibold text-lg group-hover:text-green-400 transition mb-2 line-clamp-2">
        {movie.title}
      </h4>
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <Star className="w-3 h-3 text-yellow-500 fill-current" />
        <span>{movie.rating || "N/A"}</span>
      </div>
      <span className="text-gray-500 text-xs mt-1 line-clamp-1">
        {movie.genre || "Movie"}
      </span>
    </div>
  </div>
);

export default FeaturedSection;
