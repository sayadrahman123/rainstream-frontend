import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <--- 1. Import Hook
import { getAllMovies } from "../services/movieService";
import { getWatchlist } from "../services/watchlistService";
import { getLikedMovies } from "../services/likeService";
import { getContinueWatching } from "../services/progressService";

// Import Components
import HeroAutoSlider from "../components/HeroAutoSlider";
import BrandRow from "../components/BrandRow";
import ContinueWatching from "../components/ContinueWatching";
import RankedSlider from "../components/RankedSlider";
import MovieSlider from "../components/MovieSlider";
import GenreExplorer from "../components/GenreExplorer";
import FeaturedSection from "../components/FeaturedSection";
import AwardsSection from "../components/AwardsSection";
import Footer from "../components/Footer";

// Helper: Shuffle Array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 2. Removed props (onPlay, onSearch) as they are no longer passed by App.jsx
const Home = ({ isLoggedIn }) => {
  const navigate = useNavigate(); // <--- 3. Initialize Hook

  const [movies, setMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [continueWatchingList, setContinueWatchingList] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- NAVIGATION HANDLERS ---
  const handlePlay = (movie) => {
    // Navigate to the Details Page
    navigate(`/movie/${movie.id}`);
  };

  const handleGenreClick = (genre) => {
    // Navigate to Discover (You can enhance Discover to read this query param later)
    navigate(`/discover`);
  };
  // ---------------------------

  const mapMovieData = (data) => {
    return data.map((movie) => ({
      ...movie,
      image: movie.posterUrl,
      cover: movie.backdropUrl,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const promises = [getAllMovies()];

        if (isLoggedIn) {
          promises.push(getWatchlist());
          promises.push(getLikedMovies());
          promises.push(getContinueWatching());
        }

        const results = await Promise.all(promises);

        const allMovies = mapMovieData(results[0]);
        setMovies(allMovies);

        let featured = allMovies.filter(
          (m) => m.isFeatured === true || m.featured === true
        );
        if (featured.length === 0) {
          featured = allMovies.slice(0, 5);
        }
        setFeaturedMovies(shuffleArray(featured));

        if (isLoggedIn) {
          if (results[1]) setWatchlist(mapMovieData(results[1]));
          if (results[2]) setLikedMovies(mapMovieData(results[2]));

          if (results[3]) {
            const continueList = results[3].map((item) => {
              const percentage =
                (item.progressSeconds / item.totalDurationSeconds) * 100;
              const timeLestSeconds =
                item.totalDurationSeconds - item.progressSeconds;
              const minutesLeft = Math.ceil(timeLestSeconds / 60);

              return {
                id: item.movie.id,
                title: item.movie.title,
                image: item.movie.backdropUrl || item.movie.posterUrl,
                progress: `${percentage}%`,
                timeLeft: `${minutesLeft}m left`,
                videoUrl: item.movie.videoUrl,
                originalMovie: {
                  ...item.movie,
                  startTime: item.progressSeconds,
                },
              };
            });
            setContinueWatchingList(continueList);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-[#0b0c0f]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p>Loading your stream...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroAutoSlider movies={featuredMovies} onPlay={handlePlay} />

      <BrandRow />

      {isLoggedIn ? (
        <>
          <ContinueWatching data={continueWatchingList} onPlay={handlePlay} />

          <RankedSlider
            title="Popular of the week"
            data={movies.slice(0, 5)}
            onPlay={handlePlay}
          />

          <MovieSlider
            title="Just Released"
            data={movies}
            onPlay={handlePlay}
          />

          {watchlist.length > 0 && (
            <MovieSlider
              title="Your Watchlist"
              data={watchlist}
              onPlay={handlePlay}
            />
          )}

          {likedMovies.length > 0 && (
            <MovieSlider
              title="Your Likes"
              data={likedMovies}
              onPlay={handlePlay}
            />
          )}

          <GenreExplorer onGenreClick={handleGenreClick} />
        </>
      ) : (
        <>
          <MovieSlider
            title="Just Released"
            data={movies}
            onPlay={handlePlay}
          />

          <RankedSlider
            title="Popular of the week"
            data={movies}
            onPlay={handlePlay}
          />

          {/* Pass data to FeaturedSection so it isn't empty */}
          <FeaturedSection movies={movies} onPlay={handlePlay} />

          <MovieSlider title="Movies" data={movies} onPlay={handlePlay} />

          {/* Pass data to AwardsSection */}
          <AwardsSection movies={movies} onPlay={handlePlay} />
        </>
      )}
      <Footer />
    </>
  );
};

export default Home;
