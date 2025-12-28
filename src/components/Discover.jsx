// import React, { useState, useEffect } from "react";
// import { Search, Loader } from "lucide-react";
// import { getAllMovies, searchMovies } from "../services/movieService";

// // Import Components
// import HeroAutoSlider from "./HeroAutoSlider";
// import BrandRow from "./BrandRow";
// import MovieSlider from "./MovieSlider";
// import RankedSlider from "./RankedSlider";
// import FeaturedSection from "./FeaturedSection";
// import AwardsSection from "./AwardsSection";

// const Discover = ({ onPlay, initialQuery }) => {
//   const [allMovies, setAllMovies] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);

//   // Helper
//   const mapMovieData = (data) => {
//     return data.map((movie) => ({
//       ...movie,
//       image: movie.posterUrl,
//       cover: movie.backdropUrl,
//     }));
//   };

//   // 1. Fetch Default Data
//   useEffect(() => {
//     const fetchDefault = async () => {
//       try {
//         const data = await getAllMovies();
//         setAllMovies(mapMovieData(data));
//       } catch (error) {
//         console.error("Failed to load discover movies", error);
//       } finally {
//         setInitialLoading(false);
//       }
//     };
//     fetchDefault();
//   }, []);

//   // 2. Handle Search
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(async () => {
//       if (!initialQuery || initialQuery.trim().length === 0) {
//         setSearchResults([]);
//         return;
//       }

//       setLoading(true);
//       try {
//         const data = await searchMovies(initialQuery);
//         setSearchResults(mapMovieData(data));
//       } catch (error) {
//         console.error("Search failed", error);
//       } finally {
//         setLoading(false);
//       }
//     }, 500);

//     return () => clearTimeout(delayDebounceFn);
//   }, [initialQuery]);

//   if (initialLoading)
//     return (
//       <div className="h-screen bg-[#0b0c0f] flex items-center justify-center text-white">
//         Loading...
//       </div>
//     );

//   return (
//     // FIX: Removed 'pt-24' and 'px-...' from the main container
//     <div className="bg-[#0b0c0f] min-h-screen text-white pb-20">
//       {/* --- CONTENT SWITCHER --- */}
//       {initialQuery && initialQuery.length > 0 ? (
//         /* SEARCH RESULTS VIEW */
//         // FIX: Added padding here so results are not hidden behind navbar
//         <div className="animate-fade-in pt-28 px-4 md:px-12">
//           <h2 className="text-2xl font-bold mb-6">
//             Results for "<span className="text-green-500">{initialQuery}</span>"
//           </h2>

//           {loading ? (
//             <div className="flex justify-center py-20">
//               <Loader className="animate-spin text-green-500" />
//             </div>
//           ) : searchResults.length > 0 ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
//               {searchResults.map((movie) => (
//                 <div
//                   key={movie.id}
//                   className="group relative cursor-pointer"
//                   onClick={() => onPlay(movie)}
//                 >
//                   <div className="aspect-[2/3] rounded-xl overflow-hidden mb-3">
//                     <img
//                       src={movie.image}
//                       alt={movie.title}
//                       className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
//                     />
//                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
//                       <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
//                         <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
//                       </div>
//                     </div>
//                   </div>
//                   <h3 className="font-semibold text-gray-200 truncate">
//                     {movie.title}
//                   </h3>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-20 text-gray-500">
//               <Search className="w-16 h-16 mx-auto mb-4 opacity-20" />
//               <p className="text-xl">No movies found</p>
//             </div>
//           )}
//         </div>
//       ) : (
//         /* DEFAULT DISCOVER VIEW */
//         // FIX: Removed '-mt-12'. Hero slider is now at the top.
//         <div>
//           <HeroAutoSlider
//             movies={allMovies.filter(
//               (m) => m.featured || m.isFeatured === true
//             )}
//             onPlay={onPlay}
//           />
//           <div className="mt-8 px-4 md:px-12">
//             <BrandRow />

//             <MovieSlider
//               title="New Arrivals"
//               data={allMovies.slice(0, 10).reverse()}
//               onPlay={onPlay}
//             />

//             {/* --- PASSING DATA HERE --- */}
//             <FeaturedSection movies={allMovies} onPlay={onPlay} />

//             <AwardsSection
//               movies={allMovies} // Pass all movies, let the component filter by Genre
//               onPlay={onPlay}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Discover;

import React, { useState, useEffect } from "react";
import { Search, Loader } from "lucide-react";
// 1. Import Router Hooks
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllMovies, searchMovies } from "../services/movieService";

// Import Components
import HeroAutoSlider from "./HeroAutoSlider";
import BrandRow from "./BrandRow";
import MovieSlider from "./MovieSlider";
import FeaturedSection from "./FeaturedSection";
import AwardsSection from "./AwardsSection";
import Footer from "./Footer";

const Discover = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 2. Read query from URL (?q=...)
  const initialQuery = searchParams.get("q") || "";

  const [allMovies, setAllMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // 3. Navigation Handler
  const handlePlay = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  const mapMovieData = (data) => {
    return data.map((movie) => ({
      ...movie,
      image: movie.posterUrl,
      cover: movie.backdropUrl,
    }));
  };

  // Fetch Default Data
  useEffect(() => {
    const fetchDefault = async () => {
      try {
        const data = await getAllMovies();
        setAllMovies(mapMovieData(data));
      } catch (error) {
        console.error("Failed to load discover movies", error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchDefault();
  }, []);

  // Handle Search when URL params change
  useEffect(() => {
    const doSearch = async () => {
      if (!initialQuery || initialQuery.trim().length === 0) {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      try {
        const data = await searchMovies(initialQuery);
        setSearchResults(mapMovieData(data));
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setLoading(false);
      }
    };

    // Simple debounce check
    const timeoutId = setTimeout(doSearch, 500);
    return () => clearTimeout(timeoutId);
  }, [initialQuery]);

  if (initialLoading)
    return (
      <div className="h-screen bg-[#0b0c0f] flex items-center justify-center text-white">
        Loading...
      </div>
    );

  return (
    <div className="bg-[#0b0c0f] min-h-screen text-white pb-20">
      {/* SEARCH RESULTS VIEW */}
      {initialQuery ? (
        <div className="animate-fade-in pt-28 px-4 md:px-12">
          <h2 className="text-2xl font-bold mb-6">
            Results for "<span className="text-green-500">{initialQuery}</span>"
          </h2>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader className="animate-spin text-green-500" />
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {searchResults.map((movie) => (
                <div
                  key={movie.id}
                  className="group relative cursor-pointer"
                  onClick={() => handlePlay(movie)}
                >
                  <div className="aspect-[2/3] rounded-xl overflow-hidden mb-3">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-200 truncate">
                    {movie.title}
                  </h3>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-xl">No movies found</p>
            </div>
          )}
        </div>
      ) : (
        /* DEFAULT VIEW */
        <div>
          <HeroAutoSlider
            movies={allMovies.filter(
              (m) => m.featured || m.isFeatured === true
            )}
            onPlay={handlePlay}
          />
          <div className="mt-8 px-4 md:px-12">
            <BrandRow />
            <MovieSlider
              title="New Arrivals"
              data={allMovies.slice(0, 10).reverse()}
              onPlay={handlePlay}
            />

            <FeaturedSection movies={allMovies} onPlay={handlePlay} />

            <AwardsSection movies={allMovies} onPlay={handlePlay} />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Discover;
