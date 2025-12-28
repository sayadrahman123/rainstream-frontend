import React, { useState, useEffect } from "react";
import { ChevronDown, Loader } from "lucide-react";
import { getUpcomingMovies } from "../services/movieService";

const ReleaseList = () => {
  const [groupedMovies, setGroupedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const processData = (movies) => {
    const groups = {};
    movies.forEach((movie) => {
      if (!movie.releaseDate) return;

      const dateObj = new Date(movie.releaseDate);
      const monthName = dateObj
        .toLocaleString("default", { month: "long" })
        .toUpperCase();

      if (!groups[monthName]) {
        groups[monthName] = [];
      }

      groups[monthName].push({
        id: movie.id,
        date: dateObj.getDate().toString().padStart(2, "0"),
        title: movie.title,
        desc: movie.genre || "Upcoming Release",
        image: movie.posterUrl || movie.backdropUrl, // Fallback if poster missing
      });
    });

    return Object.keys(groups).map((month) => ({
      month,
      items: groups[month],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUpcomingMovies();
        setGroupedMovies(processData(data));
      } catch (error) {
        console.error("Failed to fetch upcoming movies", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader className="animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="px-8 md:px-16 pb-20 relative z-10 -mt-20">
      {" "}
      {/* Added negative margin to pull up over hero */}
      {/* Filters Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-12 border-b border-gray-800 pb-6 bg-[#0b0c0f]/80 backdrop-blur-md p-4 rounded-xl">
        <h2 className="text-xl text-white font-bold tracking-wide">
          UPCOMING RELEASES
        </h2>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button className="flex items-center gap-2 bg-[#1a1b1f] hover:bg-[#25262b] text-white text-xs px-4 py-2 rounded-lg border border-gray-800 transition">
            Worldwide <ChevronDown className="w-3 h-3" />
          </button>
          <button className="flex items-center gap-2 bg-[#1a1b1f] hover:bg-[#25262b] text-white text-xs px-4 py-2 rounded-lg border border-gray-800 transition">
            2025 <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>
      {/* Monthly Lists */}
      {groupedMovies.length > 0 ? (
        groupedMovies.map((monthGroup, index) => (
          <div key={index} className="mb-16 animate-fade-in">
            <h3 className="text-gray-400 font-bold text-sm mb-8 tracking-wider border-l-4 border-green-500 pl-4">
              {monthGroup.month}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8">
              {monthGroup.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-6 group cursor-pointer hover:bg-white/5 p-4 rounded-xl transition"
                >
                  {/* Date Bubble */}
                  <div className="w-12 h-12 flex-shrink-0 bg-white group-hover:bg-green-500 transition-colors duration-300 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-black font-extrabold text-lg">
                      {item.date}
                    </span>
                  </div>
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-700 group-hover:border-green-500 transition-colors shadow-md">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Info */}
                  <div className="flex flex-col">
                    <h4 className="text-white font-bold text-base group-hover:text-green-400 transition">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-10">
          No upcoming releases found.
        </div>
      )}
    </div>
  );
};

export default ReleaseList;
