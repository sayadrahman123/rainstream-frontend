import React from "react";
import { Play, Plus, ChevronLeft, ChevronRight } from "lucide-react";

// Updated list with genres that match your DB better
const genres = [
  {
    name: "Action",
    image: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
  },
  {
    name: "Drama",
    image: "https://image.tmdb.org/t/p/w500/qA5kPYZA7FkVvqcEfJRoOy4kpHg.jpg",
  },
  {
    name: "Sci-Fi",
    image: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
  },
  {
    name: "Thriller",
    image: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyho4nmw5Ts.jpg",
  },
  {
    name: "Comedy",
    image: "https://image.tmdb.org/t/p/w500/kb844l4XhB3HlE68x8uJgY4k8q.jpg",
  },
  {
    name: "Fantasy",
    image: "https://image.tmdb.org/t/p/w500/cJRyKnidfbxwoJMTP.jpg",
  },
];

const GenreExplorer = ({ onGenreClick }) => {
  // <--- 1. Accept Prop
  return (
    <div className="px-8 md:px-16 py-12">
      <div className="relative w-full rounded-3xl overflow-hidden h-[500px] md:h-[600px] group">
        {/* Background Image */}
        <img
          src="https://image.tmdb.org/t/p/original/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg"
          alt="Genre Highlight"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c0f] via-[#0b0c0f]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] via-transparent to-transparent"></div>

        {/* Hero Content inside Genre Card */}
        <div className="absolute top-0 left-0 h-full flex flex-col justify-center px-12 max-w-2xl pt-10">
          <div className="mb-4">
            <span className="bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs border border-white/20">
              Explore by genre
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Guardians of the Galaxy <br /> Vol. 3
          </h2>

          <div className="flex items-center gap-3 text-sm text-gray-300 mb-8">
            <span className="text-yellow-500 font-bold">★ 4.6</span>
            <span>•</span>
            <span>2023</span>
            <span>•</span>
            <span>Sci-Fi • Action</span>
          </div>

          <div className="flex gap-4 mb-12">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition">
              <Play className="w-5 h-5 fill-current" /> Play Now
            </button>
            <button className="bg-transparent hover:bg-white/10 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 border border-gray-600 transition">
              <Plus className="w-5 h-5" /> Add Watchlist
            </button>
          </div>
        </div>

        {/* Genre Tabs */}
        <div className="absolute bottom-8 left-0 w-full px-8 md:px-12 flex gap-4 overflow-x-auto scrollbar-hide items-end">
          <div className="flex gap-2 mr-4 pb-4">
            {/* Decorative arrows (non-functional for now) */}
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {genres.map((genre) => (
            <div
              key={genre.name}
              onClick={() => onGenreClick && onGenreClick(genre.name)} // <--- 2. Add Click Handler
              className="relative w-40 h-24 rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-105 opacity-70 hover:opacity-100 ring-0 hover:ring-2 hover:ring-green-500"
            >
              <img
                src={genre.image}
                alt={genre.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {genre.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenreExplorer;
