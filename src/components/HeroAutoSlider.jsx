import React, { useState, useEffect } from "react";
import { Play, Plus, Heart } from "lucide-react"; // <--- 1. Import Heart
import { addToWatchlist } from "../services/watchlistService";
import { likeMovie } from "../services/likeService"; // <--- 2. Import Like Service

const HeroAutoSlider = ({ movies, onPlay }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadingId, setLoadingId] = useState(null); // Track action loading state

  // Safe check
  if (!movies || movies.length === 0) {
    return (
      <div className="w-full h-[85vh] bg-[#0b0c0f] flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [movies.length]);

  // --- Watchlist Handler ---
  const handleAddWatchlist = async (movie) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      return;
    }
    setLoadingId(`watch-${movie.id}`);
    try {
      await addToWatchlist(movie.id);
      alert(`${movie.title} added to Watchlist!`);
    } catch (error) {
      console.error(error);
      alert("Failed to add to Watchlist.");
    } finally {
      setLoadingId(null);
    }
  };

  // --- Like Handler (NEW) ---
  const handleLike = async (movie) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      return;
    }
    setLoadingId(`like-${movie.id}`);
    try {
      await likeMovie(movie.id);
      alert(`You liked ${movie.title}!`);
      // Optional: Reload page or update state to see it in the list immediately
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to like movie.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="relative w-full h-[85vh] overflow-hidden group">
      {/* Background Images */}
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={movie.backdropUrl || movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] via-[#0b0c0f]/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c0f] via-[#0b0c0f]/60 to-transparent"></div>
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 pt-20">
        <div className="max-w-2xl relative z-10">
          <span className="bg-black/30 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/10 mb-6 inline-block">
            Featured
          </span>

          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`transition-all duration-700 absolute top-0 left-0 w-full ${
                index === currentSlide
                  ? "opacity-100 translate-y-0 relative"
                  : "opacity-0 translate-y-8 absolute pointer-events-none"
              }`}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                {movie.title}
              </h1>

              <div className="flex items-center gap-3 text-sm text-gray-300 mb-6">
                <span>{movie.duration}</span>
                <span>•</span>
                <span>{movie.releaseDate?.split("-")[0]}</span>
                <span>•</span>
                <span>{movie.genre}</span>
              </div>

              <p className="text-gray-300 text-sm md:text-base mb-8 line-clamp-3 leading-relaxed">
                {movie.description}
              </p>

              <div className="flex gap-4">
                {/* Play Button */}
                <button
                  onClick={() => onPlay(movie)}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-full font-semibold flex items-center gap-2 transition"
                >
                  <Play className="w-5 h-5 fill-current" /> Watch Trailer
                </button>

                {/* Watchlist Button */}
                <button
                  onClick={() => handleAddWatchlist(movie)}
                  disabled={loadingId === `watch-${movie.id}`}
                  className="bg-transparent hover:bg-white/10 text-white px-6 py-3.5 rounded-full font-semibold flex items-center gap-2 border border-gray-600 transition disabled:opacity-50"
                >
                  {loadingId === `watch-${movie.id}` ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                  List
                </button>

                {/* --- LIKE BUTTON --- */}
                <button
                  onClick={() => handleLike(movie)}
                  disabled={loadingId === `like-${movie.id}`}
                  className="bg-transparent hover:bg-white/10 text-white px-4 py-3.5 rounded-full font-semibold flex items-center gap-2 border border-gray-600 transition disabled:opacity-50"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      loadingId === `like-${movie.id}` ? "animate-pulse" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 right-16 flex gap-3 z-20">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-green-500"
                : "w-2 bg-gray-600 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroAutoSlider;
